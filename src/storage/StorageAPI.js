import uuid from "react-native-uuid";
import { schema } from "./StorageSchema"
import Realm from "realm"
import _ from "lodash"
import { getTimeDiffMins, groupedToSectionList, stringToDateObject, stripTime } from "../Helpers";


var SCHEMA_VERSION = 1


var realm = new Realm({ 
    schema: schema,
    schemaVersion: SCHEMA_VERSION,

})

export function saveAssignment(name, type, className, dueDate, time, notes, attachments) {
    realm.write(() => {
        realm.create("Assignment", {
            name: name,
            className: className,
            type: type,
            dueDate: dueDate,
            status: 0,
            time: time,
            notes: notes,
            attachments: attachments,
            id: uuid()
        });
    });
}

export function editAssignment(id, name, type, className, dueDate, time, notes, attachments, status) {
    realm.write(() => {
        realm.create("Assignment", {
            id: id,
            name: name,
            className: className,
            type: type,
            dueDate: dueDate,
            status: status,
            time: time,
            notes: notes,
            attachments: attachments,
        }, "modified");
    });
}

export function getAssignments(filter) {
    var objects = [];
    if (filter) {
        objects = realm.objects("Assignment").filtered("name CONTAINS[c] $0", filter);
    } else {
        objects = realm.objects("Assignment");
    }
    return objects
}

export function getAssignmentsByDate(filter) {
    var objects = [];

    const date = stringToDateObject(filter);

    if (filter) {
        objects = realm.objects("Assignment").filtered("dueDate == $0", date.toString());
    } else {
        objects = realm.objects("Assignment");
    }
    return objects
}

export function getTodayAssignments() {
    return realm.objects("Assignment").filtered("dueDate == $0", stripTime(new Date().addDays(1)).toString());
}

export function updateStatus(id, newStatus) {
    realm.write(() => {
        realm.create("Assignment", { id: id, status: newStatus }, "modified");
    });
}

export function getAssignmentByID(id) {
    return realm.objectForPrimaryKey('Assignment', id);
}

export function deleteAssignmentWithID(id) {
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Assignment', id));
    })
}

export function groupAssignmentsBy(assignments, key) {
    return groupedToSectionList(_.mapValues(_.groupBy(assignments, key), clist => clist.map(assignment => assignment)));
}

export function saveWorkTime(name, start, end, canExpand) {
    realm.write(() => {
        realm.create("WorkTime", {
            name: name,
            start: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            end: end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            minutes: getTimeDiffMins(start, end),
            canExpand: canExpand,
            id: uuid()
        });
    });
}

export function deleteWorkTime(id) {
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('WorkTime', id));
    })
}

export function editWorkTime(id, name, start, end, canExpand) {
    realm.write(() => {
        realm.create("WorkTime", {
            name: name,
            start: start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            end: end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            minutes: getTimeDiffMins(start, end),
            canExpand: canExpand,
            id: id
        }, "modified");
    });
}


export function getWorkTimes() {
    return realm.objects("WorkTime");
}

export function getWorkTimeByID(id) {
    return realm.objectForPrimaryKey('WorkTime', id);
}

export function deleteRealm() {
    Realm.deleteFile({schema: schema})
}


export function addClass(n) {
    realm.write(() => {
        realm.create("Class", {
            name: n,
            id: uuid()
        });
    });
}

export function getClasses() {
    return realm.objects("Class")
}

export function getClassesArray() {

    var c = realm.objects("Class")
    var f = []
    c.forEach((item) => {
        f.push(item.name)
    })

    return f
}

export function deleteClass(id) {
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Class', id));
    })
}

export function addType(n) {
    realm.write(() => {
        realm.create("Type", {
            name: n,
            id: uuid()
        });
    });
}

export function getTypes() {
    return realm.objects("Type")
}

export function getTypesArray() {

    var c = realm.objects("Type")
    var f = []
    c.forEach((item) => {
        f.push(item.name)
    })

    return f
}

export function deleteType(id) {
    realm.write(() => {
        realm.delete(realm.objectForPrimaryKey('Type', id));
    })
}