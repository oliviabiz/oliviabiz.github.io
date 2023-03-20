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