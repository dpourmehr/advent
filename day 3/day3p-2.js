var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'data.txt');


let gridMap = [];

let currentGridCoordinates = [0, 0];

let intersections = [];

async function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    })
}

readFile(filePath).then(res => {

    let lines = res.split('\n');

    let line1 = lines[0].split(',');
    let line2 = lines[1].split(',');

    let totalSteps = 0;
    
    line1.forEach(value => {
        if (value.charAt(0) === 'U') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[1] += 1;

                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'D') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[1] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'R') {
            
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[0] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'L') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[0] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1:' + totalSteps);
            }
        }
        
        
    });

    currentGridCoordinates = [0, 0];
    totalSteps = 0;

    line2.forEach(value => {


        if (value.charAt(0) === 'U') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[1] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'D') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[1] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'R') {
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[0] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2:' + totalSteps);
            }
        }

        if (value.charAt(0) === 'L') {
            // console.log('Left: ' + value.substring(1));
            for (let i = 0; i < value.substring(1); i++) {
                totalSteps += 1;
                currentGridCoordinates[0] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2:' + totalSteps);
            }
        }

    });

    let smallestSteps = null;

    intersections.forEach(coordinate => {
        if (smallestSteps === null) {
            smallestSteps = Number(coordinate.line1Steps) + Number(coordinate.line2Steps);
        }

        if (( Number(coordinate.line1Steps) + Number(coordinate.line2Steps)) < smallestSteps) {
            smallestSteps = ( Number(coordinate.line1Steps) + Number(coordinate.line2Steps));
        }
    });

    console.log('Smallest Distance: ' + smallestSteps);
});

function markLocation(x, y, line) {

    let coordinate = x + ',' + y;

    if (gridMap[coordinate] && line.includes('line2')) {

        gridMap[coordinate].push(line);

        intersections.push({
            distance: Math.abs(Number(x)) + Math.abs(Number(y)),
            x: x,
            y: y,
            line1Steps: gridMap[coordinate][0].split(':')[1],
            line2Steps: line.split(':')[1],
        });
    } else {
        if(line.includes('line1')) {
            gridMap[coordinate] = [line];
        }
    }
}
