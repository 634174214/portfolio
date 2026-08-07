// navigation-plugin.js
/**
 * 页面导航插件 - 独立于主业务逻辑
 * 功能：
 * 1. 自动检测页面中带有 id 的 .category-section 区块
 * 2. 在页面右侧生成固定导航
 * 3. 滚动时自动高亮当前可见区块
 * 4. 点击导航项平滑滚动到对应区块
 */

(function() {
    'use strict';

    // ==================== 配置 ====================
    const CONFIG = {
        // 导航距离顶部的偏移量
        navOffsetTop: 120,
        // 高亮检测的阈值：当区块顶部距离视口顶部小于此值时认为激活
        threshold: 100,
        // 滚动动画时长（毫秒）
        scrollDuration: 500,
        // 导航项文本截断长度
        maxLabelLength: 12,
        // 导航容器ID
        containerId: 'page-navigation-plugin',
        // 导航项的数据属性
        dataAttr: 'data-nav-target',
    };

    // ==================== 样式（动态注入） ====================
    const STYLES = `
        /* ===== 导航容器 ===== */
        #${CONFIG.containerId} {
            position: fixed;
            right: 24px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 9998;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 6px;
            padding: 8px 0;
            pointer-events: none;
            /* 容器本身不阻挡点击，但内部按钮可点 */;
        }

        /* ===== 单个导航项 ===== */
        .nav-plugin-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px 6px 10px;
            border-radius: 30px;
            cursor: pointer;
            pointer-events: auto;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            border: 1px solid rgba(203, 213, 225, 0.4);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
            transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 13px;
            font-weight: 500;
            color: #475569;
            user-select: none;
            white-space: nowrap;
            max-width: 95px;
            overflow: hidden;
            text-overflow: ellipsis;
            opacity: 0.7;
            transform: translateX(8px);
        }

        /* 导航项悬停 */
        .nav-plugin-item:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: #94a3b8;
            opacity: 1;
            transform: translateX(0px);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
        }

        /* ===== 导航指示点（小圆点） ===== */
        .nav-plugin-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #94a3b8;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }

        /* 不同分类的指示点颜色 */
        .nav-plugin-item[data-type="fullstack"] .nav-plugin-dot {
            background: #6366f1;
        }
        .nav-plugin-item[data-type="frontend"] .nav-plugin-dot {
            background: #e6edf4;
        }
        .nav-plugin-item[data-type="app"] .nav-plugin-dot {
            background: #10b981;
        }
        .nav-plugin-item[data-type="game"] .nav-plugin-dot {
            background: #f59e0b;
        }
        .nav-plugin-item[data-type="website"] .nav-plugin-dot {
            background: #e6edf4;
        }

        /* ===== 导航项文本 ===== */
        .nav-plugin-label {
            transition: color 0.3s ease;
            font-size: 13px;
            line-height: 1.4;
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* ===== 激活状态 ===== */
        .nav-plugin-item.is-active {
            background: rgba(255, 255, 255, 0.95);
            border-color: #6366f1;
            opacity: 1;
            transform: translateX(0px);
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.18);
            max-width:150px;
        }

        .nav-plugin-item.is-active .nav-plugin-dot {
            transform: scale(1.3);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .nav-plugin-item.is-active .nav-plugin-label {
            color: #1e293b;
            font-weight: 600;
        }

        /* 各分类激活时的边框颜色 */
        .nav-plugin-item.is-active[data-type="fullstack"] {
            border-color: #6366f1;
        }
        .nav-plugin-item.is-active[data-type="frontend"] {
            border-color: #3b82f6;
        }
        .nav-plugin-item.is-active[data-type="app"] {
            border-color: #10b981;
        }
        .nav-plugin-item.is-active[data-type="game"] {
            border-color: #f59e0b;
        }
        .nav-plugin-item.is-active[data-type="website"] {
            border-color: #8b5cf6;
        }

        /* ===== 响应式：移动端隐藏 ===== */
        @media (max-width: 768px) {
            #${CONFIG.containerId} {
                display: none !important;
            }
        }

        /* ===== 进入动画 ===== */
        .nav-plugin-item {
            opacity: 0;
            transform: translateX(20px) scale(0.95);
            animation: navItemFadeIn 0.4s ease forwards;
        }

        .nav-plugin-item:nth-child(1) { animation-delay: 0.05s; }
        .nav-plugin-item:nth-child(2) { animation-delay: 0.10s; }
        .nav-plugin-item:nth-child(3) { animation-delay: 0.15s; }
        .nav-plugin-item:nth-child(4) { animation-delay: 0.20s; }
        .nav-plugin-item:nth-child(5) { animation-delay: 0.25s; }
        .nav-plugin-item:nth-child(6) { animation-delay: 0.30s; }
        .nav-plugin-item:nth-child(7) { animation-delay: 0.35s; }
        .nav-plugin-item:nth-child(8) { animation-delay: 0.40s; }
        .nav-plugin-item:nth-child(9) { animation-delay: 0.45s; }
        .nav-plugin-item:nth-child(10) { animation-delay: 0.50s; }

        @keyframes navItemFadeIn {
            to {
                opacity: 0.7;
                transform: translateX(8px) scale(1);
            }
        }

        .nav-plugin-item.is-active {
            opacity: 1 !important;
            transform: translateX(0px) scale(1) !important;
        }

        /* ===== 滚动条平滑 ===== */
        html {
            scroll-behavior: smooth;
        }
    `;

    // ==================== 工具函数 ====================
    function getCategoryType(section) {
        return section.id || '';
    }

    function getCategoryLabel(section) {
        const titleEl = section.querySelector('.category-title');
        if (titleEl) {
            let text = titleEl.textContent.trim();
            // 移除 emoji 和特殊字符，保留主要文字
            text = text.replace(/^[^\w\u4e00-\u9fa5]+/, '');
            if (text.length > CONFIG.maxLabelLength) {
                text = text.slice(0, CONFIG.maxLabelLength) + '…';
            }
            return text || section.id || '区块';
        }
        return section.id || '区块';
    }

    // ==================== 主类 ====================
    class PageNavigation {
        constructor() {
            this.sections = [];
            this.navItems = [];
            this.activeId = null;
            this.isScrolling = false;
            this.scrollTimer = null;
            this.container = null;
            this._rafId = null;
            this._isInitialized = false;

            this.init();
        }

        init() {
            // 注入样式
            this._injectStyles();

            // 等待 DOM 渲染完成
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this._setup());
            } else {
                // 如果 Vue 还在渲染，延迟执行
                if (typeof Vue !== 'undefined') {
                    // 等待 Vue 完成渲染
                    this._waitForVue();
                } else {
                    this._setup();
                }
            }
        }

        _waitForVue() {
            // 使用 MutationObserver 监听 .category-section 出现
            const observer = new MutationObserver(() => {
                const sections = document.querySelectorAll('.category-section[id]');
                if (sections.length > 0) {
                    observer.disconnect();
                    this._setup();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });

            // 5秒超时保护
            setTimeout(() => {
                observer.disconnect();
                if (!this._isInitialized) {
                    this._setup();
                }
            }, 5000);
        }

        _setup() {
            if (this._isInitialized) return;
            this._isInitialized = true;

            // 收集所有带有 id 的 .category-section
            this.sections = Array.from(
                document.querySelectorAll('.category-section[id]')
            ).filter(el => el.id && el.id.trim() !== '');

            if (this.sections.length === 0) {
                // 没有找到区块，稍后重试
                setTimeout(() => this._setup(), 500);
                return;
            }

            // 创建导航 DOM
            this._buildNavigation();

            // 绑定滚动事件
            this._bindScroll();

            // 初始激活检测
            this._updateActive();

            // 处理浏览器窗口大小变化
            window.addEventListener('resize', this._throttle(() => {
                this._updateActive();
            }, 100));

            // 处理 URL hash 变化
            window.addEventListener('hashchange', () => {
                this._handleHashChange();
            });
        }

        // ===== 注入样式 =====
        _injectStyles() {
            if (document.getElementById('nav-plugin-styles')) return;
            const styleEl = document.createElement('style');
            styleEl.id = 'nav-plugin-styles';
            styleEl.textContent = STYLES;
            document.head.appendChild(styleEl);
        }

        // ===== 构建导航 =====
        _buildNavigation() {
            // 创建容器
            const container = document.createElement('div');
            container.id = CONFIG.containerId;
            container.setAttribute('role', 'navigation');
            container.setAttribute('aria-label', '页面导航');

            // 为每个区块创建导航项
            this.sections.forEach((section) => {
                const type = getCategoryType(section);
                const label = getCategoryLabel(section);

                const item = document.createElement('div');
                item.className = 'nav-plugin-item';
                item.setAttribute(CONFIG.dataAttr, section.id);
                item.setAttribute('data-type', type);
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.setAttribute('aria-label', `跳转到 ${label}`);

                // 指示点
                const dot = document.createElement('span');
                dot.className = 'nav-plugin-dot';
                item.appendChild(dot);

                // 文本
                const textSpan = document.createElement('span');
                textSpan.className = 'nav-plugin-label';
                textSpan.textContent = label;
                item.appendChild(textSpan);

                // 点击事件
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this._scrollToSection(section.id);
                });

                // 键盘支持
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this._scrollToSection(section.id);
                    }
                });

                container.appendChild(item);
                this.navItems.push({
                    el: item,
                    sectionId: section.id,
                    type: type,
                });
            });

            document.body.appendChild(container);
            this.container = container;
        }

        // ===== 滚动到指定区块 =====
        _scrollToSection(id) {
            const section = document.getElementById(id);
            if (!section) return;

            this.isScrolling = true;

            // 计算目标位置（顶部对齐）
            const targetTop = section.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth',
            });

            // 更新 URL hash（不触发滚动）
            if (history.pushState) {
                history.pushState(null, '', '#' + id);
            }

            // 激活对应导航项
            this._setActive(id);

            // 滚动结束后重置状态
            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                // 再确认一次激活状态
                this._updateActive();
            }, CONFIG.scrollDuration + 100);
        }

        // ===== 设置激活项 =====
        _setActive(id) {
            this.activeId = id;
            this.navItems.forEach((item) => {
                if (item.sectionId === id) {
                    item.el.classList.add('is-active');
                } else {
                    item.el.classList.remove('is-active');
                }
            });
        }

        // ===== 更新激活状态（基于滚动位置） =====
        _updateActive() {
            if (this.isScrolling) return;

            let activeSection = null;
            let activeId = null;

            // 从下往上找第一个进入视口的区块
            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                const rect = section.getBoundingClientRect();
                // 当区块顶部小于 threshold 时认为激活
                if (rect.top <= CONFIG.threshold) {
                    activeSection = section;
                    activeId = section.id;
                    break;
                }
            }

            // 如果没有找到，激活第一个可见的
            if (!activeId && this.sections.length > 0) {
                const first = this.sections[0];
                const rect = first.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    activeId = first.id;
                }
            }

            if (activeId && activeId !== this.activeId) {
                this._setActive(activeId);
                // 更新 URL hash（不触发滚动）
                if (history.replaceState && !this.isScrolling) {
                    history.replaceState(null, '', '#' + activeId);
                }
            } else if (!activeId && this.activeId) {
                // 如果没有任何区块可见，清除激活状态
                this._setActive(null);
            }
        }

        // ===== 绑定滚动事件 =====
        _bindScroll() {
            // 使用 requestAnimationFrame 节流
            let ticking = false;
            const onScroll = () => {
                if (!ticking) {
                    this._rafId = requestAnimationFrame(() => {
                        this._updateActive();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            window.addEventListener('scroll', onScroll, { passive: true });

            // 保存引用以便清理
            this._onScroll = onScroll;
        }

        // ===== 处理 hash 变化 =====
        _handleHashChange() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const section = document.getElementById(hash);
                if (section) {
                    this._setActive(hash);
                    // 不需要滚动，因为 hash 变化可能来自用户点击导航
                }
            }
        }

        // ===== 节流工具 =====
        _throttle(fn, delay) {
            let timer = null;
            return function(...args) {
                if (timer) return;
                timer = setTimeout(() => {
                    fn.apply(this, args);
                    timer = null;
                }, delay);
            };
        }

        // ===== 销毁 =====
        destroy() {
            if (this._rafId) {
                cancelAnimationFrame(this._rafId);
            }
            if (this._onScroll) {
                window.removeEventListener('scroll', this._onScroll);
            }
            if (this.container) {
                this.container.remove();
            }
            this._isInitialized = false;
        }
    }

    // ==================== 导出 ====================
    // 单例模式，确保只初始化一次
    let instance = null;

    function initNavigation() {
        if (!instance) {
            instance = new PageNavigation();
        }
        return instance;
    }

    // 自动初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        // 延迟一点，给 Vue 渲染留时间
        setTimeout(initNavigation, 1000);
    }

    // 暴露给全局，方便调试和手动控制
    window.PageNavigation = {
        init: initNavigation,
        getInstance: () => instance,
        destroy: () => {
            if (instance) {
                instance.destroy();
                instance = null;
            }
        }
    };

})();