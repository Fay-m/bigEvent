$(function () {
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (newpwd) {
            if (newpwd === $('[name=oldPwd]').val().trim()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (confirmpwd) {
            if (confirmpwd !== $('[name=newPwd]').val().trim()) {
                return '两次密码不一致'
            }
        }
    })
    // 提交表单验证事件
    $('#formChangePwd').on('submit', changePwd)

})
function changePwd(e) {
    e.preventDefault();
    var dataStr = $('#formChangePwd').serialize();
    console.log(dataStr);
    $.ajax({
        url: '/my/updatepwd',
        method: 'post',
        data: dataStr,
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            } else {
                layui.layer.msg(res.message, function () {
                    localStorage.removeItem('token');
                    window.top.location.href = '../login.html';
                })
            }

        }
    })
}