var $image;
var options
$(function () {
    // 1.实现基本裁剪效果
    // 1.1 获取裁剪区域的 DOM 元素
    $image = $('#image')
    // 1.2 配置选项
    options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 2.为上传 按钮添加点击事件 模拟点击文件按钮
    $('#btnChangeImg').on('click', function () {
        $('#file').click();
    })

    // 3.为文件框添加onchange事件  注意：只有选中文件发生改变才触发
    $('#file').on('change', changeImg);
    // 4.为确定按钮绑定 点击事件，上传图片
    $('#btnUpload').on('click', uploadImg);

})
// 1.文件框的onchannge事件的函数---------------------------------------------
// 触发时机 a.文件选择框 选择的文件发生改变
//     b.由选中了文件 到 没选中文件（取消）也会触发
function changeImg(e) {
    // (1)判断是否选择了要上传的图片
    var list = e.target.files;    //含有length属性，若选择了文件则length: 1，否则length:0
    // console.log(list);
    if (list.length == 0) {
        layui.layer.msg('请选择要上传的图片');
    }
    // 如果选中了图片
    // (2).拿到用户选择的文件
    var file = e.target.files[0];
    // console.log(file);
    // (3).(为图片创建一个虚拟的路径)根据选择的文件，创建一个对应的 URL 地址：
    var newImgURL = URL.createObjectURL(file);
    // (4).(设置裁剪区)先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域：
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
}
// 2.点击确定按钮，上传头像处理函数----------------------------------------------------
function uploadImg() {
    // (1).将裁剪后的图片，输出为 base64 格式的字符串
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // (2)发起请求到接口
    $.ajax({
        url: '/my/update/avatar',
        method: 'post',
        data: { avatar: dataURL },
        success: function (res) {
            layui.layer.msg(res.message);
            if (res.status === 0) {
                window.top.getUserInfo();
            }
        }
    })
}
