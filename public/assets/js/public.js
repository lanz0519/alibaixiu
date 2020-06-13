// 处理日期时间格式
function formateDate(date){
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

// 索要随机推荐数据
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function(response){
        var randomTpl = `
        {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value._title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
        {{/each}}
        `;
        var html = template.render(randomTpl, {
            data: response
        });
        $("#randomBox").html(html);
    }
})

// 索要最新评论数据
$.ajax({
    url: "/comments/lasted",
    type: "get",
    success: function(response){
        //console.log(response);
        var commentTpl = `
            {{each data}}
                <li>
                    <a href="javascript:;">
                        <div class="avatar">
                            <img src="{{$value.author.avatar}}" alt="">
                        </div>
                        <div class="txt">
                            <p>
                            <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                            </p>
                            <p>{{$value.content}}</p>
                        </div>
                    </a>
                </li>
            {{/each}}
        `;
        var html = template.render(commentTpl, {
            data: response
        });
        
        $("#commentBox").html(html);
    }
})

// 索要热门推荐
$.ajax({
    type: "get",
    url: "/posts/recommend",
    success: function(response){
        var recommendTpl = `
            {{each data}}
                <li>
                    <a href="detail.html?id={{$value._id}}">
                        <img src="{{$value.thumbnail}}" alt="">
                        <span>{{$value.title}}</span>
                    </a>
                </li>
            {{/each}}
        `;
        var html = template.render(recommendTpl, {
            data: response
        });
        $("#recommendBox").html(html);
    }
})

// 索要文章分类列表
$.ajax({
    type: "get",
    url: "/categories",
    success: function(response){
        var navTpl = `
            {{each data}}
                <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
            {{/each}}
        `;
        var html = template.render(navTpl, {data: response})
        $("#navBox").html(html);
        $("#topNavBox").html(html);
    }
})


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

// 获取搜索表单 添加提交事件
$(".search form").on('submit', function(){
    // 获取用户输入的关键字
    var key = $(this).find('.keys').val();
    // 跳转到搜索结果页面
    location.href = "/search.html?key=" + key;
    return false;
})
