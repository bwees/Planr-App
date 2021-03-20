import Item from "./packer/Item"
import Bin from "./packer/Bin"
import Packer from "./packer/Packer"
import { minutesToTimeString } from "../Helpers"

export function generateHomeworkSchedule(assignments, workTimes) {

    assignmentBoxes = []
    workBins = []
    var usedTime = 0

    assignments.forEach(function (item) {
        assignmentBoxes.push(new Item(item.time, item))
        if (item.status != 2) {
            usedTime += item.time
        }
    });
    assignmentBoxes.sort((a, b) => (a.width < b.width) ? 1 : -1) // sort by largest

    var totalTime = 0
    workTimes.forEach(function(item) {
        workBins.push(new Bin(item.minutes, item))
        totalTime += item.minutes
    })

    let packer = new Packer(workBins, assignmentBoxes);
    packer.pack();

    // Pack unfit items into expandable work times
    var toRemove = []
    packer.unpacked.forEach((item, index) => {
        workBins.some((bin) => {
            if (bin.data.canExpand) {
                toRemove.push(index)
                bin.add(item)
                return true
            }
        })
    })

    toRemove.forEach(item => packer.unpacked.splice(item))

    // Pack unfit items into seperate section
    if (packer.unpacked.length > 0) {
        oversizeBin = new Bin(-1, {name: "Unfit Assignments"})
        packer.unpacked.forEach(item => {
            oversizeBin.add(item)
        })
        workBins.push(oversizeBin)
    }
    
    
    // create data structure for sectionList
    schedule = []

    workBins.forEach(function(item) {
        var b = {}
        b.title = item.data.name
        
        if (item.remaining < 0) {
            b.title += " (" + minutesToTimeString(Math.abs(item.remaining)) + " Over)"
        } 

        b.data = []
        item.packed.forEach((item) => {
            b.data.push(item.data)
        })

        schedule.push(b)
    })

    return {sched: schedule, usedTime: usedTime, percent: usedTime/totalTime, numAssignments: assignments.length}    
}