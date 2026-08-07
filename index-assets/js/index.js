// ======================= Vue 逻辑 =======================
const APP_HOME_URL = getBaseUrl();

function getBaseUrl() {
    // 优先使用 origin + pathname
    let base = window.location.origin + window.location.pathname;
    // 如果 pathname 以 /index.html 结尾，去掉它
    if (base.endsWith('/index.html')) {
        base = base.replace('/index.html', '/');
    }
    // 确保以 / 结尾
    if (!base.endsWith('/')) {
        base = base + '/';
    }
    return base;
}

function formatDate(dateStr) {
  if (!dateStr) return "待定";
  if (/^\d{4}-\d{1,2}$/.test(dateStr)) {
    const [year, month] = dateStr.split("-");
    return `${year}年 ${parseInt(month)}月`;
  }
  if (/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateStr)) {
    const parts = dateStr.split("-");
    return `${parts[0]}年 ${parseInt(parts[1])}月 ${parseInt(parts[2])}日`;
  }
  return dateStr;
}

function getProjectTypeClass(categoryType) {
  const typeMap = {
    fullstack: "fullstack",
    frontend: "frontend",
    app: "app",
    miniprogram: "miniprogram",
    game: "game",
  };
  return typeMap[categoryType] || "frontend";
}

function getProjectLink(project) {
  if (project.link_online && project.link_online.trim() !== "") {
    return project.link_online;
  }
  // console.log(APP_HOME_URL)
  return APP_HOME_URL + project.link_local || "#";
}

// 默认展示行数
const DEFAULT_ROWS = 3;

new Vue({
  el: "#vue-app",
  data: {
    categories: [],
    totalProjects: 0,
    // 初始为 true，页面一加载就显示骨架屏
    loading: true,
    // 每个分类是否展开
    expandedCategories: {},
    // 每个分类的当前列数（由 ResizeObserver 检测）
    columnCounts: {},
    // 是否显示回到顶部按钮
    showScrollTop: false,
    // 二维码浮层相关
    qrVisible: false,
    qrLabel: '',
    qrStyle: {},
    // 是否 PC（支持 hover 的设备）
    isPc: true,
  },
  mounted() {
    // 检测是否为 PC 设备（支持 hover）
    this.isPc = window.matchMedia('(hover: hover)').matches;

    document.getElementById('first-waiting').style.display = 'none';

    // 模拟一个最小加载时长，让骨架屏可见
    setTimeout(() => {
      if (typeof worksData !== "undefined" && worksData.categories) {
        this.categories = worksData.categories;
        let count = 0;
        this.categories.forEach((cat) => {
          if (cat.projects && cat.projects.length) {
            count += cat.projects.length;
          }
        });
        this.totalProjects = count;
      }
      this.loading = false;
      // 数据渲染完成后，挂载 ResizeObserver 检测每列网格列数
      this.$nextTick(() => {
        this.observeGrids();

        document.getElementById('stats-bar-counter').style.display = 'block';

        // 处理 URL hash 锚点跳转
        this.handleHashNavigation();
      });
    }, 400);

    // 监听滚动事件，控制回到顶部按钮显示
    this._scrollHandler = () => {
      this.showScrollTop = window.scrollY > 300;
    };
    window.addEventListener('scroll', this._scrollHandler, { passive: true });
  },
  beforeDestroy() {
    // 清理 observer
    if (this._gridObservers) {
      this._gridObservers.forEach((obs) => obs.disconnect());
    }
    // 清理滚动监听
    if (this._scrollHandler) {
      window.removeEventListener('scroll', this._scrollHandler);
    }
  },
  methods: {
    formatDate,
    getProjectTypeClass,
    getProjectLink,
    /**
     * 为每个分类的 works-grid 绑定 ResizeObserver，检测列数
     */
    observeGrids() {
      if (this._gridObservers) {
        this._gridObservers.forEach((obs) => obs.disconnect());
      }
      this._gridObservers = [];
      this.categories.forEach((cat, catIdx) => {
        const refKey = "grid_" + catIdx;
        const els = this.$refs[refKey];
        const el = els && els[0];
        if (!el) return;
        // 初始读一次列数
        this.$set(this.columnCounts, catIdx, this.detectColumns(el));
        const obs = new ResizeObserver(() => {
          const cols = this.detectColumns(el);
          this.$set(this.columnCounts, catIdx, cols);
        });
        obs.observe(el);
        this._gridObservers.push(obs);
      });
    },
    /**
     * 通过 getComputedStyle 读取网格列数
     */
    detectColumns(gridEl) {
      const cols = getComputedStyle(gridEl)
        .getPropertyValue("grid-template-columns")
        .split(" ")
        .filter(Boolean).length;
      return cols > 0 ? cols : 3;
    },
    /**
     * 默认展示的项目数（收起状态）：渲染 4 排，让第 4 排被渐变遮罩盖住形成"露出"效果
     * 展开状态：渲染全部
     */
    getVisibleCount(catIdx) {
      if (this.isExpanded(catIdx)) return Infinity;
      const cols = this.columnCounts[catIdx] || 3;
      // 多渲染一排（DEFAULT_ROWS + 1），第 4 排作为渐变遮罩的"底衬"
      return cols * (DEFAULT_ROWS + 1);
    },
    /**
     * 用于 v-for 的数据源：展开返回全部，否则原样返回（由 v-if 控制显示）
     */
    getVisibleProjects(category, catIdx) {
      if (!category || !category.projects) return [];
      if (this.isExpanded(catIdx)) return category.projects;
      return category.projects;
    },
    /**
     * 是否需要渐变遮罩层：项目数 > 3 排才显示
     */
    needsFade(catIdx) {
      const cat = this.categories[catIdx];
      if (!cat || !cat.projects) return false;
      return cat.projects.length > this.getDefaultRowCount(catIdx);
    },
    /**
     * 默认行数对应的项目数（3 排 × 列数）
     */
    getDefaultRowCount(catIdx) {
      const cols = this.columnCounts[catIdx] || 3;
      return cols * DEFAULT_ROWS;
    },
    /**
     * 判断某分类是否展开
     */
    isExpanded(catIdx) {
      return !!this.expandedCategories[catIdx];
    },
    /**
     * 切换展开/收起，无论展开还是收起都平滑滚动到分类顶部，
     * 避免内容突变后用户迷失位置。
     */
    toggleExpand(catIdx) {
      const wasExpanded = this.isExpanded(catIdx);
      this.$set(this.expandedCategories, catIdx, !wasExpanded);
      this.$nextTick(() => {
        const refKey = "grid_" + catIdx;
        const els = this.$refs[refKey];
        const el = els && els[0];
        if (el) {
          const section = el.closest(".category-section");
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    },
    /**
     * 平滑滚动到页面顶部
     */
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    /**
     * 处理 URL hash 锚点导航（如 #fullstack）
     */
    handleHashNavigation() {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1); // 去掉 #
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          // 延迟一下确保 DOM 完全渲染
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    },
    /**
     * 处理预览点击事件
     * @param {Object} preview - 预览配置对象
     */
    handlePreviewClick(preview) {
      if (!preview) return;

      switch (preview.type) {
        case "link":
          // 直接跳转
          if (preview.href) {
            window.open(preview.href, "_blank");
          }
          break;
        case "tips":
          // tips 类型已经在模板里渲染了文本，这里不需要额外动作
          // 但如果你希望点击 tips 也有反馈（比如 alert），可以加
          // alert(preview.text);
          break;
        case "pictures":
          // 打开弹窗，初始化 Swiper
          this.openImageModal(preview.pictures);
          break;
        default:
          break;
      }
    },

    /**
     * 打开图片轮播弹窗
     * @param {Array} pictures - 图片数组 [{ image: 'path.jpg', text: '描述' }]
     */
    openImageModal(pictures) {
      if (!pictures || pictures.length === 0) return;

      // 获取弹窗元素
      const modal = document.getElementById("imageModal");
      const swiperWrapper = document.getElementById("modalSwiperWrapper");
      const modalCaption = document.getElementById("modalCaption");

      if (!modal || !swiperWrapper) return;

      // 清空并重新填充轮播内容
      swiperWrapper.innerHTML = "";
      pictures.forEach((pic, idx) => {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        // 注意：这里假设图片路径是相对于项目根目录的，你可以根据需要调整
        // 如果你的截图放在某个文件夹下，需要拼接路径
        const imgPath = pic.image; // 如果只是文件名，可能需要加前缀，比如 'works/screenshots/' + pic.image
        if(pic.portrait) {
          slide.innerHTML = `<img src="${imgPath}" alt="${pic.text}" onerror="this.src='https://placehold.co/800x400?text=图片加载失败'" class="is-v">`;
        } else {
          slide.innerHTML = `<img src="${imgPath}" alt="${pic.text}" onerror="this.src='https://placehold.co/800x400?text=图片加载失败'">`;
        }
        
        swiperWrapper.appendChild(slide);
      });

      // 显示弹窗
      modal.style.display = "flex";

      // 等待 DOM 更新后初始化 Swiper
      this.$nextTick(() => {
        // 如果已经存在 Swiper 实例，先销毁
        if (window.mySwiper) {
          window.mySwiper.destroy(true, true);
        }
        window.mySwiper = new Swiper(".mySwiper", {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          loop: false,
          keyboard: {
            enabled: true,
          },
        });

        // 更新图片描述（可以简单显示当前图片的描述，这里简化处理，在底部显示序号）
        const updateCaption = (swiper) => {
          const activeIndex = swiper.activeIndex;
          const pic = pictures[activeIndex];
          if (modalCaption && pic) {
            modalCaption.textContent = `${activeIndex + 1} / ${pictures.length} · ${pic.text}`;
          }
        };
        window.mySwiper.on("slideChange", function () {
          updateCaption(window.mySwiper);
        });
        updateCaption(window.mySwiper);
      });

      // 绑定关闭事件（如果已经绑定过，先移除再绑定，避免重复）
      const closeModal = () => {
        modal.style.display = "none";
        if (window.mySwiper) {
          window.mySwiper.destroy(true, true);
          window.mySwiper = null;
        }
      };
      const closeBtn = modal.querySelector(".modal-close");
      const overlay = modal.querySelector(".modal-overlay");
      if (closeBtn) {
        closeBtn.removeEventListener("click", closeModal);
        closeBtn.addEventListener("click", closeModal);
      }
      if (overlay) {
        overlay.removeEventListener("click", closeModal);
        overlay.addEventListener("click", closeModal);
      }
    },

    /**
     * 鼠标移入链接时，显示二维码浮层
     * @param {String} url - 要生成二维码的链接，为空则不显示
     * @param {Event} event - 鼠标事件
     */
    handleQRHover(url, event) {
      if (!this.isPc || !url || url === '#') return;

      // 清除之前的隐藏定时器
      if (this._qrHideTimer) {
        clearTimeout(this._qrHideTimer);
        this._qrHideTimer = null;
      }

      // 计算浮层位置（显示在触发元素上方居中）
      const rect = event.currentTarget.getBoundingClientRect();
      const popoverWidth = 180;
      const popoverHeight = 200;

      let left = rect.left + rect.width / 2 - popoverWidth / 2;
      let top = rect.top - popoverHeight - 8;

      // 边界修正：防止超出视口左右
      if (left < 8) left = 8;
      if (left + popoverWidth > window.innerWidth - 8) {
        left = window.innerWidth - popoverWidth - 8;
      }
      // 如果上方空间不够，显示在下方
      if (top < 8) {
        top = rect.bottom + 8;
      }

      this.qrStyle = {
        left: left + 'px',
        top: top + 'px',
      };

      // 根据链接类型设置标签
      this.qrLabel = url;

      // 显示浮层
      this.qrVisible = true;

      // 等 DOM 更新 + 浏览器布局完成后再生成二维码
      this.$nextTick(() => {
        setTimeout(() => {
          const inner = this.$refs.qrInner;
          if (!inner) return;
          inner.innerHTML = '';
          new QRCode(inner, {
            text: url,
            width: 140,
            height: 140,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.M,
          });
        }, 0);
      });
    },

    /**
     * 鼠标移出链接时，延迟隐藏二维码浮层
     */
    handleQRLeave() {
      if (this._qrHideTimer) {
        clearTimeout(this._qrHideTimer);
      }
      this._qrHideTimer = setTimeout(() => {
        this.qrVisible = false;
        this._qrHideTimer = null;
      }, 200);
    },

    /**
     * 鼠标移入二维码浮层自身时，取消隐藏
     */
    handleQRPopoverEnter() {
      if (this._qrHideTimer) {
        clearTimeout(this._qrHideTimer);
        this._qrHideTimer = null;
      }
    },

    /**
     * 鼠标移出二维码浮层时，立即隐藏
     */
    handleQRPopoverLeave() {
      this.qrVisible = false;
      if (this._qrHideTimer) {
        clearTimeout(this._qrHideTimer);
        this._qrHideTimer = null;
      }
    },
  },
});
