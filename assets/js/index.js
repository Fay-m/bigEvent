$(function () {
    // 1.请求用户信息
    getUserInfo();
    // 2.点击退出按钮事件
    $('#outbtn').on('click', dropOut)
})
// 1.请求用户信息函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderUserInfo(res.data);
        }
    })
}
// 1.1.渲染用户信息
function renderUserInfo(data) {
    // a.显示用户昵称或用户名
    var uname = data.nickname || data.username;
    $('.welcome').html('欢迎你 ' + uname);
    // b.显示用户头像
    var unameFir = uname[0].toUpperCase();
    if (data.user_pic == null) {
        $('.avatar').hide();
        $('.textAvatar').html(unameFir).show();
    } else {
        $('.avatar').attr('src', data.user_pic).show();
        $('.textAvatar').hide();
    }
}
// 2.退出函数
function dropOut() {
    layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/login.html';
        layer.close(index);
    });
}