// 退出
$("#logout").on("click", function(){
    var isConfirm = confirm("您确定要退出吗");
    if(isConfirm){
        $.ajax({
            type: "post",
            url: "/logout",
            success: function(){
            location.href = "login.html";
        }
    });
    }else{
        console.log("不退出")
    }
});

// 向服务器索要用户登录信息
$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function(response){
        $(".avatar").attr("src", response.avatar);
        $(".profile .name").html(response.nickName);
    }
});