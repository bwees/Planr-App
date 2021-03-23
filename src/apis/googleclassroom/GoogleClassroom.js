import { GoogleSignin } from "@react-native-google-signin/google-signin";

export async function getCourses() {
    var token = (await GoogleSignin.getTokens().catch(() => {return []})).accessToken
    var r = fetch("https://classroom.googleapis.com/v1/courses", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    var data = await (await r).json()
    return data.courses
}

export async function getWorkForCourse(course) {
    var token = (await GoogleSignin.getTokens().catch(() => {return []})).accessToken
    var r = fetch("https://classroom.googleapis.com/v1/courses/" + course + "/courseWork", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    var data = await (await r).json()
    return data.courseWork
}

export async function getSubmissionForWork(course, work) {
    var token = (await GoogleSignin.getTokens().catch(() => {return []})).accessToken
    var r = fetch("https://classroom.googleapis.com/v1/courses/" + course + "/courseWork/" + work + "/studentSubmissions", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    var data = await (await r).json()
    return data.studentSubmissions[0]
}

// getCourses().then((courses) => {
//     if (courses)
//         courses.forEach(course => {
//             if (course)
//                 getWorkForCourse(course.id).then(t => {
//                     if (t)
//                         t.forEach(work => {
//                             console.log(work.title + " " + work.id + " " + course.id)
//                         })
//                 })
//         });
// })

// getSubmissionForWork(149085313826, 149392629553).then(sub => console.log(sub.state))
