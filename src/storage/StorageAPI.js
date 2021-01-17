import uuid from 'react-native-uuid';
import { schema } from './StorageSchema'
import Realm from 'realm'

export function saveAssignment(name, type, className, dueDate, time, notes, attachments) {
    const realm = new Realm({ schema: schema });

    realm.write(() => {
        const newAssignment = realm.create('Assignment', {
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

export function getAssignments(filter) {
    const realm = new Realm({ schema: schema });
    var objects = [];
    if (filter) {
        objects = realm.objects('Assignment').filtered("name CONTAINS[c] $0", filter);
    } else {
        objects = realm.objects('Assignment');
    }

    return objects
}