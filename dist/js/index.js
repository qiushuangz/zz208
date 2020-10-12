$(".select-tit").mousemove(function () {
    $(".select-con").show()
})
$(".select-tit").mouseout(function () {
    $(".select-con").hide()
})
$(".select-con").mousemove(function () {
    $(".select-con").show()
})
$(".select-con").mouseout(function () {
    $(".select-con").hide()
})
$(".select_show").children().eq(0).siblings().hide()
$(".select_show").children().eq(0).show().addClass("show")
$(".select-top").delegate("ul li", "click", function () {
    $(this).addClass("now_click")
    $(this).siblings().removeClass("now_click")
    let li_index = $('.select-top>ul>li').index($(this));
    console.log(li_index);
    $(".select_show").children().eq(li_index).show().addClass("show")
    $(".select_show").children().eq(li_index).siblings().hide().removeClass("show")
})