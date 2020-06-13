// 上传图片
$("#file").on("change", function(){
    // 获取管理员选择的文件
    var file = this.files[0];
    // 创建forData对象 实现二进制图像上传
    var formData = new FormData();
    // 将管理员选择的文件追加到formData对象中
    formData.append("image", file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        processData: false,
        contentType: false,
        success: function(response){
            $("#image").val(response[0].image);
        }
    })
});

// 添加轮播图
$("#slidesForm").on("submit", function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/slides",
        data: formData,
        success: function(){
            location.reload();
        }
    });
    return false;
});

// 显示轮播图
$.ajax({
    type: "get",
    url: "/slides",
    success: function(response){
        var html = template("slidesTpl", {
            data: response
        });
        $("#slidesBox").html(html);
    }
});

$("#slidesBox").on("click", ".delete", function(){
    var id = $(this).attr("data-id");
    if(confirm("您确定要删除吗")){
        $.ajax({
            type: "delete",
            url: "/slides/" + id,
            success: function(){
                location.reload();
            }
        })
    }
})