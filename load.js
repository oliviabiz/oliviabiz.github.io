var fileList = Array();

$(document).ready(() => {

    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href = "/style.css";
    head.appendChild(style);

    var dir = folder; // photo location
    var fileextensions = [".jpg", ".JPG", ".png", ".PNG", ".jpeg", ".JPEG"]
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            //List all .png file names in the page
            // });
            fileextensions.forEach((fileextension) =>{
                $(data).find("a:contains(" + fileextension + ")").each(function () {
                    var filename = this.href.replace(window.location.host, "").replace("http://", "");
                    // console.log(filename)
                    fileList.push(filename)
                });
            })
        }
    });
})

// Waits until ajax call is finished
$(document).ajaxStop(function () {
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
        // if (imgCount < 1){
            try {
                var item = document.createElement('li');
                // item.classList.add('display-image-container')
                item.innerHTML = `<img src="${file}">`;
                // console.log(`<img src=${file}>`);
                image_list.appendChild(item);
                imgCount = imgCount + 1;
            }
            catch (err) {
                console.log('Error loading', file)
                return;
            }
        // }
        

    });

    // console.log(image_list)

});


