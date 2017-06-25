window.onload = function() {
    var index = 1;
    runCarousel();  

    function runCarousel() {
    if(index > 3) {
        index = 1;
    } else if(index < 1) {
        index = 1;
    }
    carousel();
    setTimeout(runCarousel, 3000);
    }

    function carousel() {
        console.log(index);
        var images = document.getElementsByClassName("slide-image");
        var sz = images.length;
        for(var i = 0; i < sz; ++i) {
            images[i].style.display = "none";
        }
        images[index - 1].style.display = "block";
        ++index;
    }
    function create(title, author, imgSrc) {
        var container = document.createElement("div");
        var a = document.createElement("a");
        a.setAttribute("href", "detail?title=" + title + "&author=" + author);
        container.setAttribute("class", "manga_container");
        var div = document.createElement("div");
        div.setAttribute("class", "cover");
        div.setAttribute("style", "background-image: url(" + imgSrc + ")");
        var p1 = document.createElement("p");
        p1.setAttribute("class", "author");
        p1.innerHTML = title;
        var p2 = document.createElement("p");
        p2.setAttribute("class", "last_update");
        p2.innerHTML = author;
        container.appendChild(a);
        a.appendChild(div);
        a.appendChild(p1);
        a.appendChild(p2);
        return container;
    }
    function append(container, data) {
        var sz = data.length;
        for(var i = 0; i < sz; ++i) {
            container.appendChild(create(
                data[i].title,
                data[i].author,
                data[i].coverSrc
            ));
        }
    }
    $.ajax({
        url: "/get-mangas",
        type: "post",
        data: {amount: 12, status: "連載"},
        success: function(data) {
            append(document.getElementById("on-going"), data);
            // cal function to display();
            // console.log(data);
            // console.log("success!");
        }
    })
    $.ajax({
        url: "/get-mangas", 
        type: "post",
        data: {amount: 6, tags: "少年熱血"},
        success: function(data) {
            append(document.getElementById("shonen"), data);
        }
    })
    $.ajax({
        url: "/get-mangas",
        type: "post",
        data: {amount: 6, tags: "少女愛情"},
        success: function(data) {
            append(document.getElementById("shojo"), data);
        }
    })
    $.ajax({
        url: "/get-mangas",
        type: "post",
        data: {amount: 6, tags: "恐怖靈異"},
        success: function(data) {
            append(document.getElementById("horror"), data);
        }
    })
    $.ajax({
        url: "/get-mangas",
        type: "post",
        data: {amount: 12, status: "完結"},
        success: function(data) {
            append(document.getElementById("completed"), data);
        }
    })
}