import uuid from "react-native-uuid";
import { schema } from "./StorageSchema"
import Realm from "realm"
import _, { assign } from "lodash"
import { groupedToSectionList, stringToDateObject, stripTime } from "../Helpers";


const realm = new Realm({ schema: schema });

export function saveAssignment(name, type, className, dueDate, time, notes, attachments) {
    realm.write(() => {
        const newAssignment = realm.create("Assignment", {
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
        const editedAssignment = realm.create("Assignment", {
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

