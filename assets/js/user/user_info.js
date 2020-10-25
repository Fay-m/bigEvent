$(function () {
    // 1.自定义校验表单的值
    layui.form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return '昵称需要在1~6个字符之间';
            }
        }
    })
    // 2.获取用户信息
    getUserInfo();
    // 3.重置功能
    $('#resetbtn').on('click', function (e) {
        e.preventDefault();
        getUserInfo();
    })
    // 4.为提交修改按钮添加提交事件
    $('#fUserInfo').on('submit', modifyInfo);


})
// 1.获取用户信息函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('用户信息获取失败')
            }
            // 使用layui.form.val()快速给表单赋值
            layui.form.val('infoData', res.data);
        }
    })
}
// 提交修改方法
function modifyInfo(e) {
    e.preventDefault();
    var dataStr = $('#fUserInfo').serialize();
    console.log(dataStr);
    $.ajax({
        url: '/my/userinfo',
        method: 'post',
        data: dataStr,
        success: function (res) {
            if (res.status === 0) {
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        }
    })
}