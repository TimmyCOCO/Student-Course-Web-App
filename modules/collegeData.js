const Sequelize = require('sequelize');

var sequelize = new Sequelize('d7umftqv5d5rmt', 'shawkzmkitxejw',
    '04707ab0dbd2a011de81d271d15474fd81d4f7274c3cb4302fa3f18e92a5778a', {
        host: 'ec2-52-205-6-133.compute-1.amazonaws.com',
        dialect: 'postgres',
        port: 5432,
        dialectOptionns: {
            ssl: { rejectUnauthorized: false }
        },
        query: { raw: true }
    });


// Initialize function
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide the full array of "student" objects
module.exports.getAllStudents = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide an array of "student" object
module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide the full array of "course" objects
module.exports.getCourses = function () {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide the "course" objects matches course id
module.exports.getCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide an array of "student" objects matches course id
module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// provide a single "student" object matches student number
module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        reject();
    });
}


// add student 
module.exports.addStudent = function (studentData) {
    return new Promise(function (resolve, reject) {
        reject();
    });
}

// update student
module.exports.updateStudent = function (studentData) {
    return new Promise(function (resolve, reject) {
        reject();
    });
}
