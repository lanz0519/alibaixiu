// 获取文章列表数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function(response){
        var html = template("postsTpl", {
            data: response
        });
        $("#postsBox").html(html);
        var page = template("pageTpl", response);
        $("#page").html(page);
    }
});

// 处理日期时间格式
function formateDate(date){
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

// 分页
function changePage(page){
    $.ajax({
        type: "get",
        url: "/posts",
        data: {
            page
        },
        success: function(response){
            var html = template("postsTpl", {
                data: response
            });
            $("#postsBox").html(html);
            var page = template("pageTpl", response);
            $("#page").html(page);
        }
    });
};

// 向服务器索要分类数据
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response){
        var html = template("categoryTpl", {
            categories: response
        });
        $("#categoryBox").html(html);
    }
});

// 当用户进行文章列表筛选
$("#filterForm").on("submit", function(){
    var formData = $(this).serialize();
    $.ajax({
        type: "get",
        url: "/posts",
        data: formData,
        success: function(response){
            var html = template("postsTpl", {
                data: response
            });
            $("#postsBox").html(html);
            var page = template("pageTpl", response);
            $("#page").html(page);
        }
    });
    return false;
});

// 当点击了删除按钮
$("#postsBox").on("click", ".delete", function(){
    var id = $(this).attr("data-id");
    if(confirm("您确定要进行删除操作吗?")){
        $.ajax({
            type: "DELETE",
            url: "/posts/" + id,
            success: function(){
                location.reload();
            }
        });
    }
})

