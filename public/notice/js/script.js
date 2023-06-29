const board = document.querySelector('.board');
let count = 0


function createItem(data) {
    count++
    let template = document.querySelector('.template').cloneNode(true);
    template.className = 'item';
    template.id = data.id;
    template.querySelector('.title').innerHTML = data.title;
    template.querySelector('.date').innerHTML = data.date;

    board.prepend(template)
    return true
}

function clickItem(item) {
    location.href = './item/?id=' + item.id;
}

$(document).ready(() => {
    $.ajax({
        url: "https://test.gwansik.dev/notices/",
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                for (i = (data.data).length - 1; i >= 0; i--) {
                    createItem(data.data[i])
                }
            }
        }
    })
})