$(function () {
    // $(".select-con").hide();
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
    $(".select_show").children().eq(0).show().addClass("show")

    $(".select_show").children().eq(0).siblings().hide()

    $(".select-top").delegate("ul li", "click", function () {
        $(this).addClass("now_click")
        $(this).siblings().removeClass("now_click")
        let li_index = $('.select-top>ul>li').index($(this));
        console.log(li_index);
        $(".select_show").children().eq(li_index).show().addClass("show")
        $(".select_show").children().eq(li_index).siblings().hide().removeClass("show")
    })
    $("#user_name").hide();
    $("#del_login").hide()
    if (getCookie("username") && getCookie("password")) {
        $("#user_name").show().text("欢迎您" + getCookie("username"));
        $("#del_login").show();
        $("#qinglogin").hide();
        $("#preg").hide()
    }
    $("#del_login").click(function () {
        removeCookie("username");
        removeCookie("password");
        removeCookie("uid");
        removeCookie("token");
        $(location).attr('href', "");
    })
    if (getCookie("uid")) {
        let uid = getCookie("uid")
        $.get(`http://jx.xuzhixiang.top/ap/api/cart-list.php?id=${uid}`).then(res => {
            // console.log(res.data)
            let car_num = 0
            for (let j = 0; j < res.data.length; j++) {

                car_num += res.data[j].pnum - 0
            }
            // console.log(car_num)
            $("#shop_car").text(car_num)
        })
        // $(".select-con>a") 
    }






})