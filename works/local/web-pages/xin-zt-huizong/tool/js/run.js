/*
datademo = [
    {
        label: '',
        src: '',
        id: '',
        tips: [
            {
                text: '',
                imgs: [],
                css: 'top: 10px;left: 10px;'
            }
        ]
    }
];
*/

function readImage2Base64(files) {
    return new Promise((resolve) => {
        //判断浏览器是否支持filereader
        if(typeof FileReader == 'undefined') {
            window.alert('抱歉，你的浏览器不支持 FileReader');
            resolve(false);
        }
        const file = files[0];
        //判断获取的是否为图片文件
        if(!/image\/\w+/.test(file.type))
        {
            window.alert("文件必须为图像文件");
            resolve(false);
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            const base64 = this.result;
            resolve(base64);
        }
    });
}

function readFile2Text(files) {
    return new Promise((resolve) => {
        //判断浏览器是否支持filereader
        if(typeof FileReader == 'undefined') {
            window.alert('抱歉，你的浏览器不支持 FileReader');
            resolve(false);
        }
        const file = files[0];
        
        let reader = new FileReader();
        //将文件以文本形式读入页面
        reader.readAsText(file, "utf8");
        reader.onload = function () {
            let fileText = this.result;
            // console.log(fileText)
            resolve(fileText);
        }
    });
}

// 生成json文件 并下载
function jsonDownload(content, name){
    // 下载保存json文件
    var eleLink = document.createElement("a");
    eleLink.download = name + '.json';
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var data = JSON.stringify(content, undefined, 4);
    var blob = new Blob([data], { type: "text/json" });
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

// 生成html文件 并下载
function htmlDownload(content, name){
    // 下载保存json文件
    var eleLink = document.createElement("a");
    eleLink.download = name + '.html';
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var data = content;
    var blob = new Blob([data], { type: "text/html" });
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

// 下载专题压缩包
function ztZipDownload(name){
    // 下载保存json文件
    var eleLink = document.createElement("a");
    eleLink.download = name;
    eleLink.style.display = "none";
    eleLink.href = name;
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}

function fetchXXL(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // console.log(data)
                resolve(data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

function waitIframeLoad(iframe) {
    return new Promise((resolve, reject) => {
        iframe.onload = function() {
            resolve(true);
        }
        iframe.onerror = function() {
            resolve(false);
        }
    });
}

function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return `${year}-${month}-${day}`;
}


function uuid() {
    var date = new Date().getTime();
    var uuid = date + Math.random().toString(36).substr(2);
    console.log(date, uuid)
    return uuid;
}


function getHTML(ele) {
    let wrap = document.createElement('div');
    // appendChild是剪切效果，会将原来的元素直接剪切走，因此需要克隆一份
    let eleClone = ele.cloneNode(true);
    wrap.appendChild(eleClone);
    return wrap.innerHTML;
}

// 用于记录注释偏移
let tipOffset = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    originPosX: 0,
    originPosY: 0
}

Vue.component('vuedraggable', window.vuedraggable);
let app = new Vue({
    el: '#app',
    data: {
        ztComponents: window.ztComponents,
        ztImages: window.ztImages,
        ztZip: window.ztZip,
        showTips: true,
        ztData: [],
        currentComp: -1,
        currentTip: -1,
        showSortWrap: false,
        showIframeLoading: false,
        iframeLoaded: false,
        showDownHTML: false
    },
    created() {

    },
    mounted() {
        setTimeout(() => {
            document.getElementById('mounted').style.display = 'none';
        }, 500);
    },
    computed: {
        activeTip() {
            return `${this.currentComp}-${this.currentTip}`;
        },
        activeTipObj() {
            let empty = {
                text: '',
                imgs: []
            };
            let obj = {};
            console.log(this.currentComp, this.currentTip)
            if(this.currentComp == -1 || this.currentTip == -1) {
                obj = empty;
            } else {
                obj = this.ztData[this.currentComp] ? this.ztData[this.currentComp].tips[this.currentTip] : empty;
            }
            // console.log(obj == undefined)
            if(!obj || obj == undefined) {
                obj = empty;
            }
            // console.log(obj)
            return obj;
        }
    },
    methods: {
        selectLeftComp(index) {
            let comp = JSON.parse(JSON.stringify(this.ztImages[index]));
            comp.id = uuid();
            comp.tips = [];
            this.ztData.push(comp);
            console.log(this.ztData)
        },
        deleteComp(index) {
            let sure = window.confirm('确定要删除该板块吗？');
            if(sure) {
                this.ztData.splice(index, 1);
            }
        },
        addTips(index) {
            const emptyTip = {
                text: '',
                imgs: [],
                css: 'top: 0px;left: 0px;'
            }
            // 先插入空值
            this.ztData[index].tips.push(emptyTip);
            // 再取出整体值 再对焦点项重新赋值
            var itemVal = this.ztData[index];
            // 解决视图不更新的问题
            this.$set(this.ztData, index, itemVal);
        },
        allowedDrop(event) {
             // 阻止默认行为，变成可放置的 否则拖拽时候会出现禁止标志
            event.preventDefault();
        },
        resetTipOffset() {
            tipOffset = {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 0,
                originPosX: 0,
                originPosY: 0
            }
        },
        tipDragstart(index, tindex, event) {
            this.currentComp = index;
            this.currentTip = tindex;

            // console.log('拖拽开始');
            // console.log(index, tindex, event);
            let drag = event.target;
            // console.log(drag)
            // console.log('drag.offsetLeft',drag.offsetLeft);  
            // console.log('drag.offsetTop',drag.offsetTop);	

            tipOffset.originPosX = drag.offsetLeft;                        
            tipOffset.originPosY = drag.offsetTop;

            // console.log('offsetX:',window.event.offsetX);  
            // console.log('offsetY:',window.event.offsetY);

            tipOffset.x1 = window.event.offsetX;                       
            tipOffset.y1 = window.event.offsetY;

            this.selectedTip(index, tindex);
        },
        tipDragend(index, tindex, $event) {
            // console.log('拖拽结束');
            // console.log('offsetX:',window.event.offsetX);
            // console.log('offsetY:',window.event.offsetY);

            tipOffset.x2 = window.event.offsetX;                           
            tipOffset.y2 = window.event.offsetY;

            let left = tipOffset.originPosX + tipOffset.x2 - tipOffset.x1;
            let top = tipOffset.originPosY + tipOffset.y2 - tipOffset.y1;
            
            
            this.ztData[index].tips[tindex].css = `top: ${top}px;left:${left}px;`;
            
            let itemVal = this.ztData[index];
            this.$set(this.ztData, index, itemVal);

            this.selectedTip(index, tindex);
            this.resetTipOffset();
        },
        deleteTip(index, tindex) {
            this.ztData[index].tips.splice(tindex, 1);
            let itemVal = this.ztData[index];
            this.$set(this.ztData, index, itemVal);
        },
        selectedTip(index, tindex) {
            this.currentComp = index;
            this.currentTip = tindex;
        },
        async uploadImages(event) {
            // console.log(this.currentComp, this.currentTip, this.currentComp == -1 || this.currentTip == -1)
            if(this.currentComp == -1 || this.currentTip == -1) {
                window.alert('请先选择专题组件并添加一个注释');
                return;
            } 
            const base64 = await readImage2Base64(event.target.files);
            const index = this.currentComp;
            const tindex = this.currentTip;
            this.ztData[index].tips[tindex].imgs.push(base64);
            console.log(this.ztData[index].tips[tindex].imgs)
            let itemVal = this.ztData[index];
            this.$set(this.ztData, index, itemVal);
            console.log(this.activeTipObj, this.activeTipObj.imgs)
        }, 
        async uploadJson(event) {
            if(this.ztData.length > 0) {
                const sure = window.confirm('当前已经添加版块内容，是否用新的内容替换？');
                if(!sure) {
                    return;
                }
            }
            const jsonStr = await readFile2Text(event.target.files);
            const json = JSON.parse(jsonStr);
            this.ztData = json;
        },
        deleteTipImg(imgIndex) {
            const index = this.currentComp;
            const tindex = this.currentTip;
            this.ztData[index].tips[tindex].imgs.splice(imgIndex, 1);
            let itemVal = this.ztData[index];
            this.$set(this.ztData, index, itemVal);
        },
        inputTipText(event) { 
            if(this.currentComp == -1 || this.currentTip == -1) {
                window.alert('请先选择专题组件并添加一个注释');
                return;
            }
            const index = this.currentComp;
            const tindex = this.currentTip;
            this.ztData[index].tips[tindex].text = event.target.value;
            let itemVal = this.ztData[index];
            this.$set(this.ztData, index, itemVal);
        },
        saveData() {
            if(this.ztData.length <= 0) {
                window.alert('请先添加板块内容进行编辑后，再保存');
                return;
            }
            const filename = '信网汇总专题-' + getToday();
            const fname = window.prompt('请输入导出的数据文件的文件名', filename);
            console.log(fname)
            if(fname == null) {
                return;
            }
            if(!fname || fname == '') {
                window.alert('文件名不能为空！请重新操作！');
                return;
            }
             const ztData = JSON.parse(JSON.stringify(this.ztData));
            jsonDownload(ztData, fname);
        },
        toggleSort() {
            if(this.ztData.length <= 0) {
                window.alert('当前专题数据为空，请先添加内容板块后再排序');
                return;
            }
            this.showSortWrap = !this.showSortWrap;
        },
        toggleTips() {
            this.showTips = !this.showTips;
            console.log(this.showTips)
        },
        sortStart() {},
        sortEnd() {},
        async createZThtml() {
            if(this.showIframeLoading) {
                return;
            }
            if(this.ztData.length <= 0) {
                window.alert('请先编辑内容板块再生成专题文件');
                return;
            }
            this.showIframeLoading = true;
            let iframe = document.getElementById('zt-components');
            let self = this;
            // console.log(iframe, !iframe)
            if(!iframe) {
                iframe = document.createElement('iframe');
                iframe.className = 'zt-components';
                iframe.id = 'zt-components';
                iframe.src = this.ztComponents;
                document.body.appendChild(iframe);
            }

            let htmlStr = '';

            // 如果Iframe没有加载完 那么等他加载
            if(!this.iframeLoaded) {
                this.iframeLoaded = await waitIframeLoad(iframe);
            }

            const contentWindow = iframe.contentWindow;
            self.ztData.forEach((item, index) => {
                const part = contentWindow.document.querySelector(item.selector); 
                // console.log(part, iframe, contentWindow.document, item.selector)
                const partStr = getHTML(part);

                const partHtml = `
                    <!-- ${index} -->
                    <!-- ${item.label} -->
                    ${partStr}
                    <!-- ${item.label} end -->
                    <!-- ${index} end -->

                `;

                htmlStr += partHtml;
            });
            // console.log(htmlStr)

            const filename = '专题汇总-' + getToday();
            // 自动下载生成的html
            htmlDownload(htmlStr, filename);



            setTimeout(() => {
                self.showIframeLoading = false;
            }, 1000);
        }
    },
    watch: {
        showTips(newval) {
            console.log(newval)
            if(newval) {
                document.body.classList.remove('hide-tips');
            } else {
                document.body.classList.add('hide-tips');
            }
        }
    },
    components: {
        vuedraggable: window.vuedraggable,//当前页面注册组件
    },
});


