function now() {
    let dt = new Date()
    let y = dt.getFullYear()
    let m = (dt.getMonth() + 1 + '').padStart(2, '0')
    let d = (dt.getDate() + '').padStart(2, '0')
    let h = (dt.getHours() + '').padStart(2, '0')
    let min = (dt.getMinutes() + '').padStart(2, '0')
    let s = (dt.getSeconds() + '').padStart(2, '0')
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}

init()

function init() {
    $("b").text(now())
    setInterval(() => {
        $("b").text(now())
    }, 1000)
}