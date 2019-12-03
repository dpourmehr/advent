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

    line1.forEach(value => {
        if (value.charAt(0) === 'U') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[1] += 1;

                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1');
            }
        }

        if (value.charAt(0) === 'D') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[1] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1');
            }
        }

        if (value.charAt(0) === 'R') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[0] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1');
            }
        }

        if (value.charAt(0) === 'L') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[0] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line1');
            }
        }
    });

    currentGridCoordinates = [0, 0];

    line2.forEach(value => {


        if (value.charAt(0) === 'U') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[1] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2');
            }
        }

        if (value.charAt(0) === 'D') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[1] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2');
            }
        }

        if (value.charAt(0) === 'R') {
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[0] += 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2');
            }
        }

        if (value.charAt(0) === 'L') {
            // console.log('Left: ' + value.substring(1));
            for (let i = 0; i < value.substring(1); i++) {
                currentGridCoordinates[0] -= 1;
                markLocation(currentGridCoordinates[0], currentGridCoordinates[1], 'line2');
            }
        }

    });

    let smallest = null;

    intersections.forEach(coordinate => {
        if (smallest === null) {
            smallest = coordinate;
        }

        if (coordinate.distance < smallest.distance) {
            smallest = coordinate;
        }
    });

    console.log('Smallest Distance: ' + smallest.distance);
});

function markLocation(x, y, line) {

    let coordinate = x + ',' + y;

    if (gridMap[coordinate] && line === 'line2') {

        gridMap[coordinate].push(line);

        intersections.push({
            distance: Math.abs(Number(x)) + Math.abs(Number(y)),
            x: x,
            y: y
        });
    } else {
        if(line === 'line1') {
            gridMap[coordinate] = [line];
        }
    }
}
