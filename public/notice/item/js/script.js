// const board = document.querySelector('.board');
const url = new URL(window.location.href);
const urlParams = url.searchParams;

$(document).ready(() => {
    $.ajax({
        url: "https://test.gwansik.dev/notices/" + urlParams.get("id"),
        method: "GET",
        dataType: "json",
        success: function (data) {
            if (data.success) {
                document.querySelector('.topBar > .title').innerHTML = data.data.title;
                document.querySelector('.topBar > .date').innerHTML = data.data.date;
                document.querySelector('.value').innerHTML = data.data.value;
            }
        }
    })
})