const Assignment = {
    name: "Assignment",
    primaryKey: "id",
    properties: {
        name: "string",
        className: "string",
        type: "string",
        dueDate: "date",
        time: { type: "int", default: 15 },
        status: { type: "int", default: 0 },
        notes: "string",
        isGC: { type: "bool", default: false },
        gcURL: { type: "string", default: "" },
        cID: { type: "string", default: "" },
        wID: { type: "string", default: "" },
        attachments: "File[]",
        id: "string"
    }
};


const File = {
    name: "File",
    primaryKey: "id",
    properties: {
        name: "string",
        type: "string",
        path: "string",
        id: "string"
    }
};

const WorkTime = {
    name: "WorkTime",
    primaryKey: "id",
    properties: {
        name: "string",
        start: "string",
        end: "string",
        minutes: "int",
        canExpand: "bool",
        id: "string"
    }
}

const Class = {
    name: "Class",
    primaryKey: "id",
    properties: {
        name: "string",
        id: "string"
    }
}

const Type = {
    name: "Type",
    primaryKey: "id",
    properties: {
        name: "string",
        id: "string"
    }
}


export const schema = [Assignment, File, WorkTime, Class, Type]
