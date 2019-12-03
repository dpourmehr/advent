var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'data.txt');

let _ = require('lodash');
await fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    // console.log(data);

    data = data.split(',');

    let stop = false;

    let noun = 0;
    let verb = 0;

    let original = _.clone(data);

    let index = 0;

    for(verb; verb < 100; verb++) {
        if(stop) break;

        for(noun; noun < 100; noun++) {

            if(stop) break;

            data[1] = noun;
            data[2] = verb;

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
                    i = data.length + 1;
                }

                index += 1;

            }

            if(data[0] == 19690720) {
                console.log('Noun: ' + noun);
                console.log('Verb: ' + verb);
                stop = true;
                break;
            } else {
                data = _.clone(original);
            }

        }

        noun = stop ? noun : 0;
    }

    console.log('Noun: ' + noun);
    console.log('Verb: ' + verb);
    console.log('Final Result: ' + (100*noun + verb));
});