// 为jq的异步请求新增一个回调函数，每次jq异步请求前，会先执行ajaxPrefilter函数
$.ajaxPrefilter(function (opt) {
    // 1.基地址改造
    opt.url = 'http://ajax.frontend.itheima.net' + opt.url;
    // 2.自动追加token到请求报文
    if (opt.url.indexOf('/my/') > -1) {
        opt.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
})