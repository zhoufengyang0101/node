// 用户表格操作

var checkList, checkAll, initValue, un, nm, ps, ss;
var table, isAll = true;
init();

function init() {
    checkList = $(".checkOne")
    check = $(".checkAll")
    $("table").on("click", clickTableHandler)
    $(".name").on("dblclick", dbClickHandler)
    $(".sex").on("dblclick", dbClickHandler)
}

function clickTableHandler(e) {
    let all = e.target
    switch (all.className) {
        case "checkAll":
            // 全选全不选
            checkList.each(function(index) {
                // this 指向每一项元素  index为下标
                this.checked = all.checked
            });
            break;
        case "checkOne":
            // 只要有不是true isAll = false
            checkList.each(function(i) {
                if (!checkList[i].checked) isAll = false
            })
            check[0].checked = isAll
            isAll = true
            break;
        case "delete":
            layer.confirm('确定要删除该用户吗？', {
                btn: ['确定', '取消'] //按钮
            }, function() {
                deleteUser(all);
            });
            break;
        case "delSelect":
            layer.confirm('确定要删除选中用户吗？', {
                btn: ['确定', '取消'] //按钮
            }, function() {
                deleteSelect();
            });
            break;
        case "adduser":
            $("form").show()
            $("#add").on("click", addUser)
            break;
        case "edit":
            editUser($(all).parents('tr'))
            break;
        default:
            return
    }
}

// 删除请求 get ---> delete
function deleteUser(elem) {
    $(".delete").each(function(i) {
        if (this === elem) {
            // 删除
            id = $($(".id")[i]).text()
            $.get(`/user/delete/${id}`, function(data) {
                if (data.code === 200) {
                    $($(".id")[i]).parents("tr").remove()
                    layer.msg("删除成功！", { icon: 1 })
                } else {
                    layer.msg("删除失败！", { icon: 2 })
                }
            })
        }
    })
}
// 删除多个
function deleteSelect() {
    let userList = [];
    let delList = []
    checkList.each(function(i) {
        if (checkList[i].checked) {
            delList.push($($(".id")[i]).parents("tr"))
            userList.push($($(".id")[i]).text())
        }
    })

    // 删除多个时，转换为了数组
    $.ajax({
        url: '/user/delete/list',
        data: { users: userList },
        type: "POST",
        traditional: true,
        complete: function(msg) {
            console.log(msg.responseJSON)
            if (msg.responseJSON.code === 200) {
                delList.forEach(item => {
                    item.remove()
                        // $($(".id")[item]).parents("tr").remove()
                })
                layer.msg("删除成功！", { icon: 1 })
            } else {
                layer.msg("删除失败！", { icon: 2 })
            }
        }
    })
}

// 双击编辑
function dbClickHandler() {
    initValue = $(this).text()
    let keyName = $(this).prop('class')
    $(this).html(`<input value="${$(this).text()}" id="${keyName}"/>`)
    $(`#${keyName}`).blur(leaveInput)
}

// 离开input框  发送请求
function leaveInput() {
    // 保存当前单元格对象 和修改后的值
    let elem = $(this).parent()
    let val = this.value

    // 获取当前用户id
    id = $(this).parents("tr").find(".id").text()
    $.post("/user/edit", {
        key: this.id,
        value: val,
        id: id
    }, function(msg) {
        if (msg.code === 200) {
            layer.msg("修改成功", { icon: 1 })
            elem.html(val)
        } else {
            layer.msg("修改失败！", { icon: 2 })
            elem.html(initValue)
        }
    })
}

// adduser
function addUser() {
    zfya()
    if (un.length < 3 || ps.length < 3) {
        layer.msg("用户名密码不能小于3位", { icon: 3 })
        return
    }
    $.post("/user/add", {
        un: un,
        ps: ps,
        nm: nm,
        ss: ss
    }, function(msg) {
        if (msg.code === 200) {
            $("form").show()
            layer.msg("添加成功！", { icon: 1 })
            setTimeout(() => {
                window.location.reload()
            }, 500)
        } else if (msg.code === -2) {
            layer.msg("添加失败！用户名已存在！", { icon: 3 })
        } else {
            layer.msg("添加失败！", { icon: 2 })
        }
    })
}

// edit 
function editUser(el) {
    let zfy = el.find("td")
    let id = zfy.eq(1).text()
    $("#username").val(zfy.eq(2).text())
    $("#password").val(zfy.eq(3).text())
    $("#names").val(zfy.eq(4).text())
    $("#sexs").val(zfy.eq(5).text())
    $("form").show()
    $("#add").on("click", function() {
        zfya()
        if (un.length < 3 || ps.length < 3) {
            layer.msg("用户名密码不能小于3位", { icon: 3 })
            return
        }
        $.post("/user/edituser", {
            un: un,
            ps: ps,
            nm: nm,
            ss: ss,
            id: id
        }, function(msg) {
            if (msg.code === 200) {
                layer.msg("修改成功", { icon: 1 })
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else if (msg.code === -2) {
                layer.msg("修改失败！用户名已存在！", { icon: 3 })
            } else {
                layer.msg("修改失败！", { icon: 2 })
                setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        })
    })

}

// 获取表单内容
function zfya() {
    un = $.trim($("#username").val())
    ps = $.trim($("#password").val())
    nm = $.trim($("#names").val())
    ss = $.trim($("#sexs").val())

}