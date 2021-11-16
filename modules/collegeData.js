const fs = require('fs');

// Initialize function
module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        // for students
        fs.readFile('./data/students.json', 'utf8', (err, studentsData) => {
            if (err) {
                reject('unable to read students.json');
                return;
            }
            students = JSON.parse(studentsData);

            // for courses
            fs.readFile('./data/courses.json', 'utf8', (err, coursesData) => {
                if (err) {
                    reject('unable to read courses.json');
                    return;
                } else {
                    courses = JSON.parse(coursesData);
                    resolve();
                }
            });
        });
    });
}

// provide the full array of "student" objects
module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (students.length > 0) {
            resolve(students);
        } else {
            reject("no results returned");
            return;
        }
    });
}

// provide an array of "student" object
module.exports.getTAs = function () {
    return new Promise((resolve, reject) => {
        let TAsList = [];
        if (students.length > 0) {
            for (let i = 0; i < students.length; i++) {
                if (students[i].TA == true) {
                    TAsList.push(students[i])
                }
            }
            resolve(TAsList);
        } else {
            reject("no results returned");
            return;
        }
    });
}

// provide the full array of "course" objects
module.exports.getCourses = function () {
    return new Promise((resolve, reject) => {
        if (courses.length > 0) {
            resolve(courses);
        } else {
            reject("no results returned");
            return;
        }
    });
}

// provide the "course" objects matches course id
module.exports.getCourseById = function(id){
    return new Promise((resolve, reject)=>{
        if(courses.length > 0){
            for(let i =0; i<courses.length; i++){
                if(courses[i].courseId == id){
                    resolve(courses[i]);
                }
            }
        }else{
            reject("query returned 0 results");
            return;
        }
    })
}

// provide an array of "student" objects matches course id
module.exports.getStudentsByCourse = function (course) {
    return new Promise((resolve, reject) => {
        let studentsList = [];
        if (students.length > 0) {
            for (let i = 0; i < students.length; i++) {
                if (students[i].course == course) {
                    studentsList.push(students[i]);
                }
            }
            resolve(studentsList);
        } else {
            reject("no results returned");
            return;
        }
    })
}

// provide a single "student" object matches student number
module.exports.getStudentByNum = function (num) {
    return new Promise((resolve, reject) => {
        if (students.length > 0) {
            resolve(students[num - 1]);
        } else {
            reject("no result returned");
            return;
        }
    })
}


// add student 
module.exports.addStudent = function (studentData) {
    return new Promise((resolve, reject) => {
        if (studentData) {
            studentData.studentNum = students.length + 1;
            studentData.TA = (studentData.TA) ? true : false;
            students.push(studentData);
            resolve();
        } else {
            reject();
            return;
        }
    })
}

// update student
module.exports.updateStudent= function(studentData){
    return new Promise((resolve,reject)=>{
        for(let i=0; i<students.length; i++){
            if(studentData.studentNum == students[i].studentNum){
                students[i] = studentData;
                students[i].TA = (studentData.TA) ? true : false;
            }
        }
        resolve();

    })
}
