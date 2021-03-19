// import Box from "./packer/Box"

export function generateHomeworkSchedule(assignments, workTimes) {

    assignmentBoxes = []
    workBins = []

    // assignments.forEach(function (item, index) {
    //     assignmentBoxes.push([item, new Box(item.time, 1, true)])
    // });

    // workTimes.forEach(function(item, index) {
    //     workBins.push([item, new Bin(item.minutes, 1)])
    // })

    // let packer = new Packer(workBins.map((item) => item[1]));
    // packer.pack(assignmentBoxes.map((item) => item[1]));

    // console.log(packer.unpackedBoxes)

    // assignmentBoxes.forEach(function(item) {
    //     console.log(item[1])
    // })

    return {sched: [], usedTime: 12, totalTime: 40}    
}