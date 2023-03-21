/** ONLINE solution */
var fileList = Array();

(async () => {
    addr = "https://api.github.com/repos/oliviabiz/oliviabiz.github.io/contents/"
    addr = addr + folder;
    console.log("fetching from : " + addr)
    const response = await fetch(addr)
    const data = await response.json()
    for (let file of data) {
        fileList.push("/" + file.path);
    }

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = "/style.css";
    head.appendChild(style);


    console.log(fileList.length, 'items')
    // shuffle list

    function shuffleArray(arr) {
        arr.sort(() => Math.random() - 0.5);
        arr.sort(() => Math.random() - 0.5);
    }

    shuffleArray(fileList);

    // load images
    var image_list = document.querySelector("#image-list")
    imgCount = 0;
    fileList.forEach(file => {
            try {
                var item = document.createElement('li');
                item.innerHTML = `<img src="${file}">`;
                image_list.appendChild(item);
                imgCount = imgCount + 1;
            }
            catch (err) {
                console.log('Error loading', file)
                return;
            }
    });
})();

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // some code..
    console.log("mobile")
}
else{
    console.log("desktop")
}

// Portrait mode only
if(window.innerHeight > window.innerWidth){
    const navbar = document.getElementById("navbar");
    const container = document.querySelector(".container");
    navbar.style.borderBottom = "none !important";


    window.onload = function() {
        document.querySelectorAll(".dropdown").forEach(e => 
            e.addEventListener("click", function() {
                var content = this.children[1];
                content.classList.toggle("visibleDrop");

                if (content.classList.contains("visibleDrop")) {
                    this.style.backgroundColor = "#f9f9f9"  
                    contentHeight = content.offsetHeight;
                    console.log("shift by " + `${contentHeight}px`) 
                    navbar.style.setProperty("padding-bottom", `calc(${contentHeight}px)`, "important")
                    container.style.setProperty("margin-top", `calc(${contentHeight}px + 5vh)`, "important")    
                
                }
                else{
                    this.style.setProperty("background-color", "white", "important")
                    navbar.style.setProperty("padding-bottom", "0px", "important")
                    container.style.setProperty("margin-top", "10vh", "important")
                }

            }));
    };
}