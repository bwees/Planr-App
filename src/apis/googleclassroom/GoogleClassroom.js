import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { editGCAssignment, getStoredGCAssignment, saveGCAssignment } from "../storage/Storage";

export async function getCourses() {
    var token = (await GoogleSignin.getTokens().catch(() => { }))
    if (token) {
        var r = fetch("https://classroom.googleapis.com/v1/courses", {
            headers: {
                "Authorization": `Bearer ${token.accessToken}`
            }
        })
        var data = await (await r).json()
        return data.courses
    }
}

export async function getWorkForCourse(course, pSize=-1) {
    var token = (await GoogleSignin.getTokens().catch(() => { }))
    if (token) {
        var u = "https://classroom.googleapis.com/v1/courses/" + course + "/courseWork"
        if (pSize != -1) {
            u += "?pageSize=" + pSize
        }
        var r = fetch(u, {
            headers: {
                "Authorization": `Bearer ${token.accessToken}`
            },
        })
        var data = await (await r).json()
        return data.courseWork
    }
}

export async function getSubmissionForWork(course, work) {
    var token = (await GoogleSignin.getTokens().catch(() => { }))
    if (token) {
        var r = fetch("https://classroom.googleapis.com/v1/courses/" + course + "/courseWork/" + work + "/studentSubmissions", {
            headers: {
                "Authorization": `Bearer ${token.accessToken}`
            },
        })
        var data = await (await r).json()
        return data.studentSubmissions[0]
    }
}

export async function syncAssignments() {
    var courses = await getCourses()
    console.log("Starting")

    if (courses) {
        // GET ASSIGNMENTS THAT ARE IN FUTURE OR IN PREVIOUS 14 DAYS
        for (course of courses) {
            if (course) {
                var courseWork = await getWorkForCourse(course.id, 20)
                if (courseWork) {
                    for (work of courseWork) {
                        // Check if assignment due date is in the future
                        if (work.dueDate) {
                            var dueDate = new Date(work.dueDate.year, work.dueDate.month-1, work.dueDate.day-1)
                            
                            if (dueDate.getTime() >= (new Date()).stripTime().addDays(-1).getTime())
                            {
                                work.courseTitle = course.name
                                checkAssignmentSync(work)
                            }
                        }
                    }
                }
            }
        }
 
    }
}

function parseStatus(status, cStatus=0) {
    console.log(cStatus)
    if (status === "RETURNED" || status === "TURNED_IN") {
        return 2
    }
    if (cStatus == 1) {
        console.log("holding")
        return 1
    }
    if (status === "CREATED") {
        return 0
    }
}

async function checkAssignmentSync(a) {
    var found = getStoredGCAssignment(a.courseId, a.id)
    var submission = await getSubmissionForWork(a.courseId, a.id)

    // If preexisting assignment not found
    if (found.length == 0) {
        saveGCAssignment(
            a.title,
            "Google Classroom",
            a.courseTitle,
            new Date(a.dueDate.year, a.dueDate.month-1, a.dueDate.day),
            a.maxPoints + " Points",
            a.alternateLink,
            a.id,
            a.courseId,
            parseStatus(submission.state)
        )
    } else {
        editGCAssignment(found[0].id, parseStatus(submission.state, found[0].status))
    }
}

export function getGCLinkingURL(u) {
    u = u.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    u = "googleclassroom://" + u
    return u
}

