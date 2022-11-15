/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */

//  function rgbToHsl(r, g, b) {
//     (r /= 255), (g /= 255), (b /= 255);
//     var max = Math.max(r, g, b),
//       min = Math.min(r, g, b);
//     var h,
//       s,
//       l = (max + min) / 2;
  
//     if (max == min) {
//       h = s = 0; // achromatic
//     } else {
//       var d = max - min;
//       s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//       switch (max) {
//         case r:
//           h = (g - b) / d + (g < b ? 6 : 0);
//           break;
//         case g:
//           h = (b - r) / d + 2;
//           break;
//         case b:
//           h = (r - g) / d + 4;
//           break;
//       }
//       h /= 6;
//     }
  
//     return [h, s, l];
//   }

var pixels 
  
  document.getElementById("picField").onchange = function (evt) {
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;
  
    // FileReader support
    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        var img = document.getElementById("outImage");
  
        img.src = fr.result;
        var context = document.getElementById("canvas").getContext("2d");
  
        img.addEventListener("load", function () {
          canvas.width = 400;
          canvas.height = (canvas.width * img.height) / img.width;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
  
          pixels = new Array();
  
          for (var x = 0; x < canvas.width; x++) {
            for (var y = 0; y < canvas.height; y++) {
              var pixel = context.getImageData(x, y, 1, 1).data;
              var hsl = RGBToHSL(pixel[0], pixel[1], pixel[2]);
              pixel["luma"] =
                0.2126 * pixel[0] + 0.7152 * pixel[1] + 0.0722 * pixel[2];
              pixel["hue"] = hsl[0];
              pixel["saturation"] = hsl[1];
              pixel["lightness"] = hsl[2];
              pixels.push(pixel);
            } 
          }

        //   console.log(pixels[0].hue);
        //   console.log(pixels[0].saturation);
        //   console.log(pixels[0].lightness);
        //   console.log(pixels[0][0]);
        //   console.log(pixels[0][1]);
        //   console.log(pixels[0][2]);

        //   console.log(pixels.length);

        console.log(pixels[0][0],pixels[0][1],pixels[0][2]);
       console.log(pixels[0].hue,pixels[0].saturation,pixels[0].lightness);

          console.log(canvas.width);
          console.log(canvas.height);

          for(var x = 0; x < canvas.width; x++)
          {
            for (var y = 0; y < canvas.height; y++)
            {
                if(pixels[x+y].hue>190&&pixels[x+y].hue<280)
                {
                    pixels[x+y].saturation -=30; 
                    pixels[x+y].lightness +=30; 
                    //console.log("found");
                    if(pixels[x+y].saturation<0)
                        pixels[x+y].saturation=0;
                    if(pixels[x+y.lightness]>100)
                        pixels[x+y.lightness]=100;
                }
                var rgb=HSLToRGB(pixels[x+y].hue,pixels[x+y].saturation,pixels[x+y].lightness);
                pixels[x+y][0]=rgb[0];
                pixels[x+y][1]=rgb[1];
                pixels[x+y][2]=rgb[2];                
            }
          }

        //   console.log(pixels[0]);
       console.log(pixels[0][0],pixels[0][1],pixels[0][2]);
       console.log(pixels[0].hue,pixels[0].saturation,pixels[0].lightness);

const canvass = document.getElementById('canvas');
const ctxx = canvass.getContext('2d');
const imageData = ctxx.createImageData(canvass.width,canvass.height);

// Iterate through every pixel
var c=0;
for (let i = 0; i < imageData.data.length; i += 4) {
  // Modify pixel data
  imageData.data[i + 0] = pixels[i][i+0];  // R value
  imageData.data[i + 1] = pixels[i][i+1];    // G value
  imageData.data[i + 2] = pixels[i][i+2];  // B value
  imageData.data[i + 3] = pixels[i][i+3];  // A value
}

// Draw image data to the canvas
ctxx.putImageData(imageData, 0, 0);


        });
      };
      fr.readAsDataURL(files[0]);
    }
    else {
      // fallback -- perhaps submit the input to an iframe and temporarily store
      // them on the server until the user's session ends.
    }
};

const RGBToHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
        ? 2 + (b - r) / s
        : 4 + (r - g) / s
      : 0;
    return [
      60 * h < 0 ? 60 * h + 360 : 60 * h,
      100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
      (100 * (2 * l - s)) / 2,
    ];
  };  
  
  const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  };

  