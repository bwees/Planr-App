import Item from "./packer/Item"
import Bin from "./packer/Bin"
import Packer from "./packer/Packer"

export function generateHomeworkSchedule(assignments, workTimes) {

    assignmentBoxes = []
    workBins = []
    var usedTime = 0

    assignments.forEach(function (item) {
        assignmentBoxes.push(new Item(item.time, item))
        usedTime += item.time
    });
    assignmentBoxes.sort((a, b) => (a.width < b.width) ? 1 : -1) // sort by largest

    var totalTime = 0
    workTimes.forEach(function(item) {
        workBins.push(new Bin(item.minutes, item))
        totalTime += item.minutes
    })

    let packer = new Packer(workBins, assignmentBoxes);
    packer.pack();

    
    // create data structure for sectionList
    schedule = []

    workBins.forEach(function(item) {
        var b = {}
        b.title = item.data.name
        b.data = []
        item.packed.forEach((item) => {
            b.data.push(item.data)
        })

        schedule.push(b)
    })

    return {sched: schedule, usedTime: usedTime, percent: usedTime/totalTime, numAssignments: assignments.length}    
}