// navigation-plugin.js
/**
 * 页面导航插件 - 独立于主业务逻辑
 * PC端：右侧固定竖排导航
 * 移动端：右下角悬浮按钮 + 底部抽屉菜单
 */

(function() {
    'use strict';

    // ==================== 配置 ====================
    const CONFIG = {
        // 高亮检测的阈值：当区块顶部距离视口顶部小于此值时认为激活
        threshold: 100,
        // 滚动动画时长（毫秒）
        scrollDuration: 500,
        // 导航项文本截断长度
        maxLabelLength: 12,
        // 移动端断点
        mobileBreakpoint: 768,
        // 导航容器ID
        containerId: 'page-navigation-plugin',
        // 移动端抽屉ID
        drawerId: 'nav-drawer-plugin',
        // 遮罩ID
        overlayId: 'nav-overlay-plugin',
        // 悬浮按钮ID
        fabId: 'nav-fab-plugin',
    };

    // ==================== 样式（动态注入） ====================
    const STYLES = `
        /* ============================================================
        PC端：右侧竖排导航
        ============================================================ */
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
        }

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

        .nav-plugin-item:hover {
            background: rgba(255, 255, 255, 0.9);
            border-color: #94a3b8;
            opacity: 1;
            transform: translateX(0px);
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
        }

        .nav-plugin-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #94a3b8;
            flex-shrink: 0;
            transition: all 0.3s ease;
        }

        .nav-plugin-item[data-type="fullstack"] .nav-plugin-dot { background: #6366f1; }
        .nav-plugin-item[data-type="frontend"] .nav-plugin-dot { background: #bcc1c5; }
        .nav-plugin-item[data-type="app"] .nav-plugin-dot { background: #10b981; }
        .nav-plugin-item[data-type="game"] .nav-plugin-dot { background: #f59e0b; }
        .nav-plugin-item[data-type="website"] .nav-plugin-dot { background: #bcc1c5; }

        .nav-plugin-label {
            transition: color 0.3s ease;
            font-size: 13px;
            line-height: 1.4;
            max-width: 140px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .nav-plugin-item.is-active {
            background: rgba(255, 255, 255, 0.95);
            border-color: #6366f1;
            opacity: 1;
            transform: translateX(0px);
            box-shadow: 0 4px 16px rgba(99, 102, 241, 0.18);
            max-width: 150px;
        }

        .nav-plugin-item.is-active .nav-plugin-dot {
            transform: scale(1.3);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .nav-plugin-item.is-active .nav-plugin-label {
            color: #1e293b;
            font-weight: 600;
        }

        .nav-plugin-item.is-active[data-type="fullstack"] { border-color: #6366f1; }
        .nav-plugin-item.is-active[data-type="frontend"] { border-color: #3b82f6; }
        .nav-plugin-item.is-active[data-type="app"] { border-color: #10b981; }
        .nav-plugin-item.is-active[data-type="game"] { border-color: #f59e0b; }
        .nav-plugin-item.is-active[data-type="website"] { border-color: #8b5cf6; }

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

        /* ============================================================
                   移动端：右下角悬浮按钮 + 底部抽屉
                   ============================================================ */
        @media (max-width: ${CONFIG.mobileBreakpoint}px) {
            /* PC端导航隐藏 */
            #${CONFIG.containerId} {
                display: none !important;
            }

            /* ---- 悬浮按钮 ---- */
            #${CONFIG.fabId} {
                position: fixed;
                right: 20px;
                bottom: 30px;
                z-index: 9999;
                width: 56px;
                height: 56px;
                border-radius: 50%;
                background: linear-gradient(135deg, #6366f1, #4f46e5);
                border: none;
                box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }

            #${CONFIG.fabId}:active {
                transform: scale(0.92);
            }

            #${CONFIG.fabId} .fab-icon {
                font-size: 24px;
                line-height: 1;
                color: #fff;
                transition: transform 0.3s ease;
            }

            #${CONFIG.fabId}.is-open .fab-icon {
                transform: rotate(90deg);
            }

            /* ---- 当前区块指示器（悬浮按钮上的小点） ---- */
            #${CONFIG.fabId} .fab-dot-indicator {
                position: absolute;
                top: 4px;
                right: 4px;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                border: 2px solid #fff;
                background: #6366f1;
                transition: background 0.3s ease;
            }

            #${CONFIG.fabId} .fab-dot-indicator[data-type="fullstack"] { background: #6366f1; }
            #${CONFIG.fabId} .fab-dot-indicator[data-type="frontend"] { background: #3b82f6; }
            #${CONFIG.fabId} .fab-dot-indicator[data-type="app"] { background: #10b981; }
            #${CONFIG.fabId} .fab-dot-indicator[data-type="game"] { background: #f59e0b; }
            #${CONFIG.fabId} .fab-dot-indicator[data-type="website"] { background: #8b5cf6; }

            /* ---- 遮罩 ---- */
            #${CONFIG.overlayId} {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.4);
                backdrop-filter: blur(4px);
                -webkit-backdrop-filter: blur(4px);
                z-index: 9998;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.35s ease, visibility 0.35s ease;
            }

            #${CONFIG.overlayId}.is-visible {
                opacity: 1;
                visibility: visible;
            }

            /* ---- 底部抽屉 ---- */
            #${CONFIG.drawerId} {
                position: fixed;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 10000;
                background: #ffffff;
                border-radius: 24px 24px 0 0;
                box-shadow: 0 -8px 40px rgba(0, 0, 0, 0.12);
                transform: translateY(100%);
                transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
                max-height: 70vh;
                display: flex;
                flex-direction: column;
                padding: 16px 0 24px;
                will-change: transform;
            }

            #${CONFIG.drawerId}.is-open {
                transform: translateY(0);
            }

            /* ---- 抽屉手柄 ---- */
            .drawer-handle {
                width: 40px;
                height: 4px;
                border-radius: 4px;
                background: #d1d5db;
                margin: 0 auto 12px;
                flex-shrink: 0;
            }

            /* ---- 抽屉标题 ---- */
            .drawer-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 20px 12px;
                border-bottom: 1px solid #f1f5f9;
                flex-shrink: 0;
            }

            .drawer-title {
                font-size: 16px;
                font-weight: 600;
                color: #0f172a;
                font-family: 'Inter', -apple-system, sans-serif;
            }

            .drawer-close-btn {
                background: #f1f5f9;
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                font-size: 18px;
                color: #64748b;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                touch-action: manipulation;
            }

            .drawer-close-btn:active {
                transform: scale(0.92);
                background: #e2e8f0;
            }

            /* ---- 抽屉导航列表 ---- */
            .drawer-nav-list {
                flex: 1;
                overflow-y: auto;
                padding: 8px 12px 4px;
                -webkit-overflow-scrolling: touch;
            }

            .drawer-nav-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                border-radius: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
            }

            .drawer-nav-item:active {
                transform: scale(0.97);
                background: #f1f5f9;
            }

            .drawer-nav-item .drawer-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                flex-shrink: 0;
                transition: all 0.3s ease;
            }

            .drawer-nav-item[data-type="fullstack"] .drawer-dot { background: #6366f1; }
            .drawer-nav-item[data-type="frontend"] .drawer-dot { background: #3b82f6; }
            .drawer-nav-item[data-type="app"] .drawer-dot { background: #10b981; }
            .drawer-nav-item[data-type="game"] .drawer-dot { background: #f59e0b; }
            .drawer-nav-item[data-type="website"] .drawer-dot { background: #8b5cf6; }

            .drawer-nav-item .drawer-label {
                font-size: 15px;
                font-weight: 500;
                color: #334155;
                font-family: 'Inter', -apple-system, sans-serif;
                flex: 1;
            }

            .drawer-nav-item .drawer-check {
                opacity: 0;
                color: #6366f1;
                font-size: 18px;
                transition: opacity 0.3s ease;
            }

            .drawer-nav-item.is-active {
                background: #eef2ff;
            }

            .drawer-nav-item.is-active .drawer-label {
                color: #4f46e5;
                font-weight: 600;
            }

            .drawer-nav-item.is-active .drawer-check {
                opacity: 1;
            }

            .drawer-nav-item.is-active .drawer-dot {
                transform: scale(1.2);
                box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
            }

            /* ---- 安全区域适配（刘海屏） ---- */
            @supports (padding-bottom: env(safe-area-inset-bottom)) {
                #${CONFIG.drawerId} {
                    padding-bottom: calc(100px + env(safe-area-inset-bottom));
                }
                #${CONFIG.fabId} {
                    bottom: calc(100px + env(safe-area-inset-bottom));
                }
            }
        }

        @media (min-width: ${CONFIG.mobileBreakpoint + 1}px) {
            #${CONFIG.drawerId},
            #${CONFIG.fabId}
            {
                display:none;
            }
        }

        /* ============================================================
                   公共
                   ============================================================ */
        html {
            scroll-behavior: smooth;
        }

        /* 滚动条隐藏（抽屉内） */
        .drawer-nav-list::-webkit-scrollbar {
            width: 3px;
        }
        .drawer-nav-list::-webkit-scrollbar-track {
            background: transparent;
        }
        .drawer-nav-list::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
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
            text = text.replace(/^[^\w\u4e00-\u9fa5]+/, '');
            if (text.length > CONFIG.maxLabelLength) {
                text = text.slice(0, CONFIG.maxLabelLength) + '…';
            }
            return text || section.id || '区块';
        }
        return section.id || '区块';
    }

    function getFullLabel(section) {
        const titleEl = section.querySelector('.category-title');
        if (titleEl) {
            let text = titleEl.textContent.trim();
            text = text.replace(/^[^\w\u4e00-\u9fa5]+/, '');
            return text || section.id || '区块';
        }
        return section.id || '区块';
    }

    // ==================== 主类 ====================
    class PageNavigation {
        constructor() {
            this.sections = [];
            this.navItems = [];
            this.drawerItems = [];
            this.activeId = null;
            this.isScrolling = false;
            this.scrollTimer = null;
            this.container = null;
            this.drawer = null;
            this.overlay = null;
            this.fab = null;
            this._rafId = null;
            this._isInitialized = false;
            this._isDrawerOpen = false;

            this.init();
        }

        init() {
            this._injectStyles();

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this._setup());
            } else {
                if (typeof Vue !== 'undefined') {
                    this._waitForVue();
                } else {
                    this._setup();
                }
            }
        }

        _waitForVue() {
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

            this.sections = Array.from(
                document.querySelectorAll('.category-section[id]')
            ).filter(el => el.id && el.id.trim() !== '');

            if (this.sections.length === 0) {
                setTimeout(() => this._setup(), 500);
                return;
            }

            this._buildPCNavigation();
            this._buildMobileUI();
            this._bindScroll();
            this._updateActive();

            window.addEventListener('resize', this._throttle(() => {
                this._updateActive();
            }, 100));

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

        // ===== 构建 PC 导航 =====
        _buildPCNavigation() {
            const container = document.createElement('div');
            container.id = CONFIG.containerId;
            container.setAttribute('role', 'navigation');
            container.setAttribute('aria-label', '页面导航');

            this.sections.forEach((section) => {
                const type = getCategoryType(section);
                const label = getCategoryLabel(section);

                const item = document.createElement('div');
                item.className = 'nav-plugin-item';
                item.setAttribute('data-nav-target', section.id);
                item.setAttribute('data-type', type);
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');

                const dot = document.createElement('span');
                dot.className = 'nav-plugin-dot';
                item.appendChild(dot);

                const textSpan = document.createElement('span');
                textSpan.className = 'nav-plugin-label';
                textSpan.textContent = label;
                item.appendChild(textSpan);

                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this._scrollToSection(section.id);
                });

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

        // ===== 构建移动端 UI =====
        _buildMobileUI() {
            // ---- 遮罩 ----
            const overlay = document.createElement('div');
            overlay.id = CONFIG.overlayId;
            overlay.addEventListener('click', () => this._closeDrawer());
            document.body.appendChild(overlay);
            this.overlay = overlay;

            // ---- 抽屉 ----
            const drawer = document.createElement('div');
            drawer.id = CONFIG.drawerId;
            drawer.setAttribute('role', 'dialog');
            drawer.setAttribute('aria-label', '页面导航菜单');

            // 手柄
            const handle = document.createElement('div');
            handle.className = 'drawer-handle';
            drawer.appendChild(handle);

            // 头部
            const header = document.createElement('div');
            header.className = 'drawer-header';

            const title = document.createElement('span');
            title.className = 'drawer-title';
            title.textContent = '📂 跳转到';
            header.appendChild(title);

            const closeBtn = document.createElement('button');
            closeBtn.className = 'drawer-close-btn';
            closeBtn.innerHTML = '✕';
            closeBtn.setAttribute('aria-label', '关闭导航菜单');
            closeBtn.addEventListener('click', () => this._closeDrawer());
            header.appendChild(closeBtn);

            drawer.appendChild(header);

            // 导航列表
            const list = document.createElement('div');
            list.className = 'drawer-nav-list';

            this.sections.forEach((section) => {
                const type = getCategoryType(section);
                const label = getFullLabel(section);

                const item = document.createElement('div');
                item.className = 'drawer-nav-item';
                item.setAttribute('data-nav-target', section.id);
                item.setAttribute('data-type', type);

                const dot = document.createElement('span');
                dot.className = 'drawer-dot';
                item.appendChild(dot);

                const labelSpan = document.createElement('span');
                labelSpan.className = 'drawer-label';
                labelSpan.textContent = label;
                item.appendChild(labelSpan);

                const check = document.createElement('span');
                check.className = 'drawer-check';
                check.textContent = '✓';
                item.appendChild(check);

                item.addEventListener('click', () => {
                    this._scrollToSection(section.id);
                    this._closeDrawer();
                });

                list.appendChild(item);
                this.drawerItems.push({
                    el: item,
                    sectionId: section.id,
                    type: type,
                });
            });

            drawer.appendChild(list);
            document.body.appendChild(drawer);
            this.drawer = drawer;

            // ---- 悬浮按钮 ----
            const fab = document.createElement('button');
            fab.id = CONFIG.fabId;
            fab.setAttribute('aria-label', '打开导航菜单');

            const icon = document.createElement('span');
            icon.className = 'fab-icon';
            icon.textContent = '☰';
            fab.appendChild(icon);

            // 当前区块指示点
            const indicator = document.createElement('span');
            indicator.className = 'fab-dot-indicator';
            fab.appendChild(indicator);

            fab.addEventListener('click', () => {
                if (this._isDrawerOpen) {
                    this._closeDrawer();
                } else {
                    this._openDrawer();
                }
            });

            document.body.appendChild(fab);
            this.fab = fab;

            // 更新指示点颜色
            this._updateFabIndicator();
        }

        // ===== 打开抽屉 =====
        _openDrawer() {
            if (this._isDrawerOpen) return;
            this._isDrawerOpen = true;
            this.drawer.classList.add('is-open');
            this.overlay.classList.add('is-visible');
            this.fab.classList.add('is-open');
            document.body.style.overflow = 'hidden';
        }

        // ===== 关闭抽屉 =====
        _closeDrawer() {
            if (!this._isDrawerOpen) return;
            this._isDrawerOpen = false;
            this.drawer.classList.remove('is-open');
            this.overlay.classList.remove('is-visible');
            this.fab.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        // ===== 更新悬浮按钮指示点 =====
        _updateFabIndicator() {
            if (!this.fab) return;
            const indicator = this.fab.querySelector('.fab-dot-indicator');
            if (!indicator) return;

            const activeItem = this.navItems.find(item => item.sectionId === this.activeId);
            if (activeItem) {
                indicator.setAttribute('data-type', activeItem.type);
                indicator.style.display = 'block';
            } else {
                indicator.style.display = 'none';
            }
        }

        // ===== 滚动到指定区块 =====
        _scrollToSection(id) {
            const section = document.getElementById(id);
            if (!section) return;

            this.isScrolling = true;

            const targetTop = section.getBoundingClientRect().top + window.pageYOffset - 20;

            window.scrollTo({
                top: targetTop,
                behavior: 'smooth',
            });

            if (history.pushState) {
                history.pushState(null, '', '#' + id);
            }

            this._setActive(id);

            clearTimeout(this.scrollTimer);
            this.scrollTimer = setTimeout(() => {
                this.isScrolling = false;
                this._updateActive();
            }, CONFIG.scrollDuration + 100);
        }

        // ===== 设置激活项 =====
        _setActive(id) {
            this.activeId = id;

            // PC 导航
            this.navItems.forEach((item) => {
                item.el.classList.toggle('is-active', item.sectionId === id);
            });

            // 移动端抽屉
            this.drawerItems.forEach((item) => {
                item.el.classList.toggle('is-active', item.sectionId === id);
            });

            // 更新悬浮按钮指示点
            this._updateFabIndicator();
        }

        // ===== 更新激活状态 =====
        _updateActive() {
            if (this.isScrolling) return;

            let activeId = null;

            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                const rect = section.getBoundingClientRect();
                if (rect.top <= CONFIG.threshold) {
                    activeId = section.id;
                    break;
                }
            }

            if (!activeId && this.sections.length > 0) {
                const first = this.sections[0];
                const rect = first.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    activeId = first.id;
                }
            }

            if (activeId && activeId !== this.activeId) {
                this._setActive(activeId);
                if (history.replaceState && !this.isScrolling) {
                    history.replaceState(null, '', '#' + activeId);
                }
            } else if (!activeId && this.activeId) {
                this._setActive(null);
            }
        }

        // ===== 绑定滚动事件 =====
        _bindScroll() {
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
            this._onScroll = onScroll;
        }

        // ===== 处理 hash 变化 =====
        _handleHashChange() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const section = document.getElementById(hash);
                if (section) {
                    this._setActive(hash);
                }
            }
        }

        // ===== 节流 =====
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
            if (this.container) this.container.remove();
            if (this.drawer) this.drawer.remove();
            if (this.overlay) this.overlay.remove();
            if (this.fab) this.fab.remove();
            document.body.style.overflow = '';
            this._isInitialized = false;
        }
    }

    // ==================== 导出 ====================
    let instance = null;

    function initNavigation() {
        if (!instance) {
            instance = new PageNavigation();
        }
        return instance;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavigation);
    } else {
        setTimeout(initNavigation, 1000);
    }

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