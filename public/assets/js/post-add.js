$.ajax({
    type: "get",
    url: "/categories",
    success: function(response){
        var html = template("categoryTpx", {
            data: response
        });
        $("#category").html(html);
    }
});

// 给文件选择控件添加改变事件
$("#feature").on("change", function(){
    // 获取管理员选择的文件
    var file = this.files[0];
    // 创建forData对象 实现二进制图像上传
    var formData = new FormData();
    // 将管理员选择的文件追加到formData对象中
    formData.append("cover", file);
    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 不要处理data属性对应的参数值
        processData: false,
        // 不设置参数类型
        contentType: false,
        success: function(response){
            console.log(response);
            $("#thumbnail").val(response[0].cover);
        }
    });
});

// 当添加表单发生提交
$("#addForm").on("submit", function(){
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function(){
            location.href = "/admin/posts.html"
        }
    });
    return false;
});

// 获取浏览器地址栏中的id属性
var id = getUrlParams("id");

// 当前管理员是在进行修改操作
if(id != -1){
    $.ajax({
        type: "get",
        url: "/posts/" + id,
        success: function(response){
            $.ajax({
                type: "get",
                url: "/categories",
                success: function(categories){
                    response.categories = categories;
                    console.log(response)
                    var html = template("modifyTpl", response);
                    $("#parentBox").html(html);
                }
            });
            

        }
    });
};

// 从地址栏中获取参数
function getUrlParams(name){
    var paramsAry = location.search.substr(1).split("&");
    for(var i = 0; i < paramsAry.length; i++){
        var temp = paramsAry[i].split("=");
        if(temp[0] == name)
            return temp[1];
    }
    return -1;
};

// 文章信息修改表单发生提交行为
$("#parentBox").on("submit", "#modifyForm", function(){
    var formData = $(this).serialize();
    var id = $(this).attr("data-id");
    $.ajax({
        type: "put",
        url: "/posts/" + id,
        data: formData,
        success: function(){
            location.href = "/admin/posts.html";
        }
    });
    return false;
})