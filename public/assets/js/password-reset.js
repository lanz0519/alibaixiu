// 当修改密码表单提交时
$("#modifyForm").on("submit", function(){
    // 获取输入内容
    var formData = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/users/password",
        data: formData,
        success: function(){
            location.href = "/admin/login.html";
        },
        error: function(err){
            console.log(err);
        }
    });
    return false;
})
