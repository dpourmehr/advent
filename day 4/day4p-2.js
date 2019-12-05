var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'data.txt');

var _ = require('lodash');

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

    let bottom = res.split('-')[0];
    let top = res.split('-')[1];

    let current = Number(_.clone(bottom));

    let possibleOutcomes = 0;

    for (let i = _.clone(current); i <= top; i++) {
        if (hasTwoAdjacent(current) && neverDecreases(current)) {
            possibleOutcomes += 1;
        }

        current += 1;
    }

    console.log('Possible Outcomes: ' + possibleOutcomes);

});

function hasTwoAdjacent(current) {

    let last = null;

    let digit = current + '';

    let pairCounts = 0;

    let pairs = [];

    for (let i = 0; i < digit.length; i++) {
        if (!last) {
            pairCounts += 1;
            last = digit.charAt(i);
            pairs[digit.charAt(i)] = pairCounts;
            continue;
        }

        if (digit.charAt(i) === last) {
            pairCounts += 1;
            pairs[digit.charAt(i)] = pairCounts;
        } else {
            pairCounts = 1;
        }

        last = digit.charAt(i);

        pairs[digit.charAt(i)] = pairCounts;
    }

    let hasAdjancent = false;

    pairs.forEach(value => {
       if(value === 2) {
           hasAdjancent = true;
       }
    });

    return hasAdjancent;

}

function neverDecreases(current) {

    current = current + '';

    let last = null;

    for (let i = 0; i < current.length; i++) {
        if (!last) {
            last = current.charAt(i);
            continue;
        }

        if (Number(current.charAt(i)) < Number(last)) {
            return false;
        }

        last = current.charAt(i);
        current.charAt(i)

    }

    return true;
}