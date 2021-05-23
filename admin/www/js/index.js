var step = 0;
var ul, lis, evt, logout;

init()

function init() {
    // 左侧菜单栏
    ul = $("ul")
    lis = ul.children()
    ul.on("click", clickHandler)

    // 初次默认第一个选中
    evt = new Event("click", {
        "bubbles": true
    })
    lis[0].dispatchEvent(evt)

    // 退出登录
    $("#logout").on('click', clickLogoutHandler)
}

// 菜单栏切换
function clickHandler(e) {
    if (e.target.nodeName !== "LI") return
    let li = $(e.target)
    let index = lis.index(li);
    lis.eq(step).removeClass("li-active")
    lis.eq(index).addClass("li-active")
    $("iframe").attr("src", lis.eq(index).attr("data-src"))
    step = index
}

// 退出登录
function clickLogoutHandler() {
    $.get('/logout', msg => document.write(msg))
}