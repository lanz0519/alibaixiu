// 从地址栏中获取文章id
var postId = getUrlParams('id');
// 评论是否经过人工审核
var review;

// 获取文章详细信息
$.ajax({
    type: 'get',
    url: '/posts/' + postId,
    success: function(response){
        var html = template('postTpl', response);
        $('#articleBox').html(html);
    }
});

// 当点赞按钮发生点击
$('#articleBox').on('click', '#like', function(){
    $.ajax({
        type: 'post',
        url: '/posts/fabulous/' + postId,
        success: function(){
            alert('点赞成功!');
        }
    });
});

// 获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response){
        review = response.review;
        // 判断管理员是否开启评论功能
        if(response.comment){
            // 管理员开启了评论功能 渲染评论模板
            var html = template('commentTpl');
            $('#comment').html(html);
        }
    }
});

// 获取评论列表
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response){
        console.log(response);
        
        var html = template('commentListTpl', {
            data: response
        });
        $('#commentList').html(html);
    }
});

// 当评论表单发生提交事件 
$('#comment').on('submit', 'form', function(){
    // 获取用户输入的内容
    var content = $(this).find('textarea').val();
    var state;
    if(review){
        // 经过人工审核
        state = 0;
    }else{
        // 不需要经过人工审核
        state = 1;
    }
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content,
            post: postId,
            state
        },
        success: function(){
            alert('评论成功');
            location.reload();
        },
        error: function(err){
            console.log(err);
        }
    })
    return false;
});