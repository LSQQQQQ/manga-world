window.onload = function() {
    var href = location.href;
    // href = decodeURI(href);
    var tmp = href.split("?").pop();
    tmp = tmp.split("&");
    var title = tmp[0].split("=").pop();
    var author = tmp[1].split("=").pop();
    title = decodeURI(title);
    author = decodeURI(author);
    console.log(title);
    console.log(author);
    $.ajax({
        url: "/get-manga-infos",
        type: "post",
        data: {title: title, author: author},
        success: function(data) {
            console.log(data);  
            fill(data);
        }
    })

    function fill(data) {
        document.getElementById("title").innerHTML = data.title;
        document.getElementById("author").innerHTML = data.author;
        document.getElementById("status").innerHTML = data.status;
        document.getElementById("last_update").innerHTML = data.last_update.split("T")[0];
        document.getElementById("tags").innerHTML = data.tags;
        document.getElementById("clicks").innerHTML = 0;
        document.getElementById("comments").innerHTML = 0;
        document.getElementById("introduction").innerHTML = data.introduction;
        document.getElementById("cover").setAttribute("style", "background-image: url(" + data.coverSrc + ")");
    }
}