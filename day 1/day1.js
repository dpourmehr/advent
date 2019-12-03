var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'data.txt');

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
   data = data.split('\n');

   let totalFuelRequired = 0;

   // part 1
    data.forEach(mass => {
        totalFuelRequired += getFuelRequired(mass);
    });

    console.log('Part 1:' + totalFuelRequired);

    totalFuelRequired = 0;

   // part 2
   data.forEach(mass => {
       while(getFuelRequired(mass) > 0) {
           mass = getFuelRequired(mass);
           totalFuelRequired += mass;
       }
   });

   console.log('Part 2:' + totalFuelRequired);
});

let getFuelRequired = (mass) => {

    if(Math.floor(mass/3) <= 0) {
        return 0;
    }

    let test = mass/3;
    test = Math.floor(test);
    test = test - 2;
    return test;
};