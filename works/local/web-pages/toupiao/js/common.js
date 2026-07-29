// 接口地址
const HOME_URL = 'data/data_home.php';
const DETAIL_URL = 'data/data_detail.php';
const SER_URL = 'data/data_post.php';
const CHECK_USER = 'data/check_user.php';
const CHECK_NONE_JUMP = 'go-login.html';


function getQueryStringArgs() {
    let qs = (window.location.search.length > 0 ? window.location.search.substring(1) : '');
    let args = {};
    let items = qs.length ? qs.split('&') : [];
    let item = null;
    let name = null;
    let value = null;
    for (var i = 0; i < items.length; i++) {
      item = items[i].split('=');
      name = decodeURIComponent(item[0]);
      value = decodeURIComponent(item[1]);
      if (name.length) {
        args[name] = value;
      }
    }
    return args;
}

// 检测用户 可能需要修改 根据本地存放cookie或者jwt进行验证
function checkUser() {
    return new Promise((resolve, reject) => {
        axios.get(CHECK_USER, {
            params: {
                token: 'adasdadadaxasdadasdads'
            }
        })
        .then((res) => {
            // console.log(res.data);
            const response = res.data;
            if(response.code === 0) {
                resolve(response.data);
            } else {
                window.alert(response.msg);
                // 用户不存在 提示并跳转
                window.location.replace(CHECK_NONE_JUMP);
                reject(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    });
}

/*
向服务器发送投票的请求
obj.id 投票专题的id
touid 投票人的id
*/
function postTicket(obj) {
    const sendData = {
        id: obj.tpid,
        touid: obj.touid
    };
    return new Promise((resolve, reject) => {
        axios({
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: Qs.stringify(sendData),
            url: SER_URL
        })
        .then((res) => {
            const response = res.data;
            if(response.code === 0 && response.data.success) {
                resolve(response.data);
            } else {
                window.alert('投票失败');
                reject(false);
            }
          })
        .catch((error) => {
            console.log(error);
        });
    });
}

/**
 我的简易动态弹窗
 obj.msg：提示的语言
 obj.success：投票是成功还是失败
 obj.title: 投票的标题
 */
function myDialog(obj) {
    // console.log(obj)
    var msg = obj.msg || '';
    var success = (obj.success === false) ? false : true;

    var title = success ? '投票成功' : '投票失败';
    var title = obj.title ? obj.title : title;
    var img = success ? 'img/tou-success.png' : 'img/tou-error.png';

    var wId = 'my-dialog';
    var closeId = 'dialog-close';

    // 先检测如果存在一个弹窗则阻止目前操作
    var dialogEl = document.getElementById(wId);
    if(dialogEl) {
        return;
    }

    var tpl = `
        <div class="dialog-inner">
            <div class="dialog-flex">
                <h2 class="dialog-h2">${title}</h2>
            <div class="dialog-img">
                <img src="${img}">
            </div>
            <p class="dialog-msg">${msg}</p>
            <div class="dialog-close" id="${closeId}">×</div>
            </div>
        </div>
    `;
    var wrappEL = document.createElement('section');
    wrappEL.id = wId;
    wrappEL.className = 'dialog in';
    wrappEL.innerHTML = tpl;
    document.body.appendChild(wrappEL);

    close();

    function close() {
        var wrap = document.getElementById(wId);
        var closeBtn = document.getElementById(closeId);
        closeBtn.addEventListener('click', function() {
            wrap.className = 'dialog out';
            setTimeout(() => {
                wrap.remove();
            }, 430);
        });
    }
}