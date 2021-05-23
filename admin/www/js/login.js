var form = $("form")
$("#username").change(inputHandler)
$("#password").change(inputHandler)
$("#login").click(debounce(clickBtnHandler, 2000, true))

function inputHandler() {
    let span = $(this).next("span")
    $.trim($(this).val().length) < 3 ? span.show() : span.hide()
}

function clickBtnHandler() {
    var username = $.trim($("#username").val())
    var password = $.trim($("#password").val())
    $.post('/login', { username, password }, (data) => {
        if (data.code === 200) {
            location.href = data.url
        } else {
            $(".msg").text(data.msg)
        }
    })
}