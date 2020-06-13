// 当表单提交用户信息
$("#userForm").on("submit", function(){
    // 获取到用户在表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    // 向服务器端发送请求
    $.ajax({
        type: "post",
        url: "/users",
        data: formData,
        success: function(response){
            // 刷新页面
            location.reload();
        },
        error: function(){
            alert("用户提交失败");
        }
    });
    // 阻止表单默认提交行为
    return false;
});

// 用户选择头像文件
$("#modifyBox").on("change", "#avatar", function(){
    var formData = new FormData();
    formData.append("avatar", this.files[0]);

    $.ajax({
        type: "post",
        url: "/upload",
        data: formData,
        // 告诉$.ajax方法不要解析请求参数
        processData: false,
        // 告诉$.ajax方法不要设置请求参数的类型（在之前已经设置过了）
        contentType: false,
        success: function(response){
            $("#preview").attr("src", response[0].avatar);
            $("#hiddenAvatar").val(response[0].avatar);
        }
    });
})

// 获取用户列表
$.ajax({
    type: "get",
    url: "/users",
    success: function(response){
        var html = template("userTpl", {
            data: response
        });
        $("#userBox").html(html);
    }
});

// 通过事件委托的方式为编辑按钮添加点击事件
$("#userBox").on("click", ".edit", function(){
    // 获取被点击用户的id值
    var id = $(this).attr("data-id");
    // 根据id获取用户的详细信息
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function(response){
            var html = template("modifyTpl", response);
            $("#modifyBox").html(html);
        }
    });
});

// 为修改表单添加表单提交事件
$("#modifyBox").on("submit", "#modifyForm", function(){
    // 获取表单值
    var formData = $(this).serialize();
    var id = $(this).attr("data-id");
    console.log(formData);
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formData,
        success: function(){
            location.reload();
        }
    });

    // 阻止默认提交事件
    return false;
});

// 当删除按钮被点击
$("#userBox").on("click", ".delete", function(){
    // 确认删除用户
    if(confirm("确定删除用户吗？")){
        var id = $(this).attr("data-id");
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function(){
                location.reload();
            }
        });
    }
});

// 获取全选按钮
var selectAll = $("#selectAll");
// 获取批量删除按钮
var deleteMany = $("#deleteMany");

// 当全选按钮发生改变时
selectAll.on("change", function(){
    // 获取全选按钮当前的状态
    var status = $(this).prop("checked");

    if(status){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }

    // 获取所有用户 并且将用户的选中状态和全选按钮保持一致
    $("#userBox").find("input").prop("checked", status);
});

// 当用户前面的复选框状态发生改变时
$("#userBox").on("change", ".userStatus", function(){
    // 获取到所有用户 过滤出选中的用户
    var inputs = $("#userBox").find("input");
    // 判断选中的用户数量是否和总人数一样
    // 如果一致 则让全选变成选中状态
    // 否则 让全选变成非选中状态
    if(inputs.length == inputs.filter(":checked").length){
        selectAll.prop("checked", true);
    }else{
        selectAll.prop("checked", false);
    }

    // 如果被选中的复选框数量大于0
    if(inputs.filter(":checked").length > 0){
        deleteMany.show();
    }else{
        deleteMany.hide();
    }
});

// 为批量删除按钮添加点击事件
deleteMany.on("click", function(){
    var ids = [];
    var checkedUser = $("#userBox").find("input").filter(":checked");
    // 循环复选框 获取data-id
    checkedUser.each(function(index, element){
        ids.push($(element).attr("data-id"));
    })
    
    if(confirm("确定要批量删除吗？")){
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join("-"),
            success: function(){
                location.reload();
            }
        });
    }
})