var image1 = null;
      var image2 = null;

      function selectImage(index) {
        var input = document.getElementById("fileInput" + index);
        input.click();
        input.onchange = function () {
          var file = input.files[0];
          var reader = new FileReader();
          reader.onload = function () {
            if (index == 1) {
              image1 = reader.result;
            } else {
              image2 = reader.result;
            }
          };
          reader.readAsDataURL(file);
        };
      }

      function generateDifference() {
        if (image1 === null || image2 === null) {
          alert("Please select both images.");
          return;
        }

        var img1 = document.createElement("img");
        img1.src = image1;
        img1.onload = function () {
          var img2 = document.createElement("img");
          img2.src = image2;
          img2.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img1.width;
            canvas.height = img1.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img1, 0, 0);
            ctx.globalCompositeOperation = "difference";
            ctx.drawImage(img2, 0, 0);
            var diffImage = canvas.toDataURL();
            var diffImgElement = document.createElement("img");
            diffImgElement.src = diffImage;
            document.getElementById("differenceImageContainer").innerHTML = "";
            document
              .getElementById("differenceImageContainer")
              .appendChild(diffImgElement);
          };
        };
      }