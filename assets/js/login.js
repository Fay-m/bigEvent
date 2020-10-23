$(function () {
    // 1.点击去登录和去注册显示对应的页面
    $('#linkReg').on('click', function () {
        $('.login').hide();
        $('.register').show();
    })
    $('#linkLogin').on('click', function () {
        $('.register').hide();
        $('.login').show();
    })
    // 2.自定义校验规则
    layui.form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        surepwd: function (value) {
            if (value !== $('.register [name=password]').val()) {
                return '两次密码不一致';
            }
        }
    })
    // 3.注册表单提交事件
    $('#regForm').on('submit', regUser);
    // 4.登录表单提交事件
    $('#loginForm').on('submit', loginUser);

})

// 1.注册表单提交函数
function regUser(e) {
    e.preventDefault();
    // 手动获取表单数据
    var dataStr = {
        username: $('.register [name=username]').val().trim(),
        password: $('.register [name=password]').val().trim()
    }
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: dataStr,
        success: function (res) {
            layui.layer.msg(res.message)
            if (res.status === 0) {
                $('#linkLogin').click();
                $('#regForm')[0].reset();
                $('.login [name=username]').val(dataStr.username);
                $('.login [name=password]').val(dataStr.password);
            }
        }
    })
}
// 2.登录表单提交事件
function loginUser(e) {
    e.preventDefault();
    var dataStr = $('#loginForm').serialize();
    $.ajax({
        url: '/api/login',
        method: 'post',
        data: dataStr,
        success: function (res) {
            if (res.status === 0) {
                layui.layer.msg(res.message, { time: 1000 }, function () {
                    localStorage.setItem('token', res.token);
                    location.href = './index.html';
                })
            }
        }
    })
}