var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'data.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    // console.log(data);

    data = data.split(',');

    for(let i = 0; i < data.length; i++) {
        if(data[i] == 1) {
            let firstPosition = data[i+1];
            let secondPosition = data[i+2];
            let overwritePosition = data[i+3];
            i+= 3;

            //definitely adding
            let result = Number(data[firstPosition]) + Number(data[secondPosition]);
            data[overwritePosition] = result;

        } else if(data[i] == 2) {
            let firstPosition = data[i+1];
            let secondPosition = data[i+2];
            let overwritePosition = data[i+3];
            i+= 3;
            //definitely adding
            let result = Number(data[firstPosition]) * data[secondPosition];
            data[overwritePosition] = result;
        } else if(data[i] == 99) {
            break;
        }
    }

    console.log('Final Result: ' + data.join());
});

function performOpcode(set) {

}