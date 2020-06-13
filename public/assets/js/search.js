// 获取地址栏中的搜索关键字
var key = getUrlParams('key');

console.log(key);

// 搜索结果显示
$.ajax({
    type: "get",
    url: 'posts/search/' + key,
    success: function(response){
        console.log(response);
        var html = template('searchTpl', {
            data: response
        });
        $('#searchBox').html(html);
    }
});