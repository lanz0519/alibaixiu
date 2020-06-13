// 当添加分类表单发生提交行为
$("#addCategory").on("submit", function(){
    var formData = $(this).serialize();
    $.ajax({
        url: "/categories",
        type: "post",
        data: formData,
        success: function(){
            location.reload();
        }
    });
    return false;
})

// 向服务器索要分类列表数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response){
        var html = template("categoryListTpl", {
            data: response
        });
        $("#categoryBox").html(html);
    }
});

// 为编辑按钮添加点击事件
$("#categoryBox").on("click", ".edit", function(){
    var id = $(this).attr("data-id");
    $.ajax({
        type: "get",
        url: "/categories/" + id,
        success: function(response){
            var html = template("modifyCategoryTpl", response);
            $("#formBox").html(html);
        }
    });
});

// 为修改分类表单添加提交事件
$("#formBox").on("submit", "#modifyCategory", function(){
    var formData = $(this).serialize();
    var id = $(this).attr("data-id");
    $.ajax({
        type: "put",
        url: "/categories/" + id,
        data: formData,
        success: function(){
            location.reload();
        }
    });
    return false;
});

// 为删除按钮添加点击事件
$("#categoryBox").on("click", ".delete", function(){
    var id = $(this).attr("data-id");
    if(confirm("您确定要删除分类吗?")){
        $.ajax({
            type: "delete",
            url: "/categories/" + id,
            success: function(){
                location.reload();
            }
        });
    }
})