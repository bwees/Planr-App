const BinPacking2D = require('binpackingjs').BP2D;
const { Bin, Box, Packer } = BinPacking2D;

export function generateHomeworkSchedule(assignments, workTimes) {

    assignmentBoxes = []
    workBoxes = []

    assignments.forEach(function (item, index) {
        assignmentBoxes.push(new Box(item.time, 1))
    });

    
}