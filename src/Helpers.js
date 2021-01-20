

export function stripTime(input) {
    return new Date(input.getFullYear(), input.getMonth(), input.getDate())
}


export function groupedToSectionList(input) {
    var returnList = [];

    Object.keys(input)
        .forEach(function eachKey(key) {
            returnList.push({
                title: key,
                data: input[key]
            })
        });

    return returnList
}


export function addDate(date, i) {
    date.setDate(date.getDate() + 1);
    return date;
}


export function calDaytoDate(day) {
    return new Date(day.year, day.month - 1, day.day)
}

export function sortByDate(array, reverse = true) {
    var returnArray = array.sort((a, b) => (new Date(b.title)) - (new Date(a.title)));
    if (reverse) {
        returnArray.reverse()
    }
    return returnArray
}

export function stringToDateObject(dateStr) {
    var from = dateStr.split("-")
    var f = new Date(from[0], from[1] - 1, from[2])
    return f
}