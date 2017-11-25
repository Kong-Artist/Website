const logFile = './assets/img/photo-log';
const fs = require('fs');

const thumbsPath = '/assets/img/thumbs/';
const fullsPath = '/assets/img/full/';

var htmlString = '<div class="gallery">\n\t';

var fileNames = [];
var captions = [];

// fs.readdir(folder, (err, files) => {
//   files.forEach(file => {
//     if (file.includes('jpg')) {
//       fileNames.push(JSON.stringify(file).replace('"', '').replace('"',''));
//     }
//   });
//   generate();
// });

fs.readFile(logFile, (err, data) => {
  if (err) console.log(err);
  content = data.toString().split(/\r?\n/);
  // Invoke the next step here however you like
  for (var el in content) {
    var tokens = content[el].split(',');
    fileNames.push(tokens[0].trim());
    captions.push(tokens[1].trim());
  }
  generate();
});

function generate() {
  var numOfSlides = Math.ceil(fileNames.length/6);

  for (var i = 0; i < numOfSlides; i++) {
    if (i == 0) {
      htmlString += '<input type="radio" name="slide-btn" id="slide-1" onchange="radioButtonOnChange()" checked />\n\t';
    } else {
      htmlString += '<input type="radio" name="slide-btn" id="slide-' + (i+1) + '" onchange="radioButtonOnChange()"/>\n\t';
    }
  }

  htmlString += '<div class="view">\n\t\t';

  for (var i = 0; i < numOfSlides; i++) {
    htmlString +=  '<div class="slide-view">\n\t\t\t<div class="row">\n\t\t\t\t';
    for (var j = 0; j < 6; j++) {
      if (j + (i * 6) >= fileNames.length) break;

    htmlString += `<div class="col-md-6 col-lg-4">\n\t\t\t\t\t<div class="photo">\n\t\t\t\t\t\t<a href="${fullsPath + fileNames[j + (i*6)]}.jpg" data-lightbox="gallery" data-title="${fileNames[j + (i*6)]}<p>${captions[j + (i*6)]}</p>"><img src="${thumbsPath + fileNames[j + (i*6)]}.jpg" class="hover-shadow"></a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t`;
      if (j != 5 && (j + (i * 6) + 1 < fileNames.length)) {
        htmlString += '\t';
      }
    }
    htmlString += '</div>\n\t\t</div>\n\t';
    if (i != numOfSlides - 1) {
      htmlString += '\t';
    }
  }

  htmlString += '</div>\n\t<div class="nav-dots">\n\t\t';

  for (var i = 0; i < numOfSlides; i++) {
    htmlString += '<label for="slide-' + (i + 1) + '" class="nav-dot" id="slide-dot-' + (i + 1) + '"></label>\n\t';
    if (i != numOfSlides - 1) htmlString += '\t';
  }

  htmlString += '</div>\n</div>';

  fs.writeFile('output', htmlString, function(err) {
      if(err) {
          return console.log(err);
      }

      console.log("The file was saved!");
  }); 
}