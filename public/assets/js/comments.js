$.ajax({
    type: "get",
    url: "/comments",
    success: function(response){
        //console.log(response)
        var html = template("commentsTpl", {
            data: response
        });
        $("#commentsBox").html(html);
        var page = template("pageTpl", {
            page: response
        });
        $("#pageBox").html(page);
    }
});

//创建评论
// $("#addComments").on("click", function(){
//     for(var i = 5; i < 10; i++){
//         $.ajax({
//             type: "post",
//             url: "/comments",
//             data: {
//                 content: "测试内容" + i,
//                 post: "5eb65e4517fdcc113839788a",
//                 state: 1
//             },
//             success: function(response){
//                 console.log(response)
//             },
//             error: function(err){
//                 console.log(err)
//             }
//         })
//     }
//     //location.reload();
// })

function changePage(page){
    $.ajax({
        type: "get",
        url: "/comments",
        data: {
            page: page
        },
        success: function(response){
            //console.log(response)
            var html = template("commentsTpl", {
                data: response
            });
            $("#commentsBox").html(html);
            var page = template("pageTpl", {
                page: response
            });
            $("#pageBox").html(page);
        }
    });
}

// 处理日期时间格式
function formateDate(date){
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

$("#commentsBox").on("click", ".status", function(){
    var status = $(this).attr("data-status");
    var id = $(this).attr("data-id");
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: {
            state: status == 1 ? 0 : 1
        },
        success: function(){
            location.reload();
        }
    });
});

$("#commentsBox").on("click", ".delete", function(){
    var id = $(this).attr("data-id");
    if(confirm("您确定要删除吗?")){
        $.ajax({
            type: "delete",
            url: "/comments/" + id,
            success: function(){
                location.reload();
            }
        });
    }
})