const AssignmentSchema = {
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
        attachments: "File[]",
        id: "string"
    }
};

const FileSchema = {
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
        minutes: "int"
    }
}

export const schema = [AssignmentSchema, FileSchema]
