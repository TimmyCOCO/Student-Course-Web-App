const Sequelize = require('sequelize');

var sequelize = new Sequelize('d7umftqv5d5rmt', 'shawkzmkitxejw',
    '04707ab0dbd2a011de81d271d15474fd81d4f7274c3cb4302fa3f18e92a5778a', {
        host: 'ec2-52-205-6-133.compute-1.amazonaws.com',
        dialect: 'postgres',
        port: 5432,
        dialectOptions: {
            ssl: { rejectUnauthorized: false }
        },
        query: { raw: true }
    });

var Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING
})

var Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
})

Course.hasMany(Student, { foreignKey: 'course' });


// Initialize database
module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        sequelize.sync().then(() => {
            resolve('success')
        }).catch(() => {
            reject('unable to sync the database');
        })

    });
}

// get all students
module.exports.getAllStudents = function () {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            order: ['studentNum']
        }).then(allStudent => {
            resolve(allStudent);
        }).catch(() => {
            reject('no results returned');
        })

    });
}

// get all students by course id
module.exports.getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: {
                course: course
            }
        }).then(allStudent => {
            resolve(allStudent);
        }).catch(() => {
            reject('no results returned');
        })
    });
}

// get all students who are TAs
module.exports.getTAs = function () {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: {
                TA: true
            }
        }).then(allStudent => {
            resolve(allStudent);
        }).catch(() => {
            reject('no results returned');
        })

    });
}


// get the student by number
module.exports.getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        Student.findAll({
            where: {
                studentNum: num
            }
        }).then(allStudent => {
            resolve(allStudent[0]);
        }).catch(() => {
            reject('no results returned');
        })
    })
}


// get all courses
module.exports.getCourses = function () {
    return new Promise(function (resolve, reject) {
        Course.findAll().then(allCourse => {
            resolve(allCourse);
        }).catch(() => {
            reject('no results returned');
        })
    });
}

// get the course by id
module.exports.getCourseById = function (id) {
    return new Promise(function (resolve, reject) {
        Course.findAll({
            where: {
                courseId: id
            }
        }).then(allCourse => {
            resolve(allCourse[0]);
        }).catch(() => {
            reject('no results returned');
        })
    });
}


// add student 
module.exports.addStudent = function (studentData) {

    for (prop in studentData) {
        if(studentData[prop] == ''){
            studentData[prop] = null;
        }
    }
    studentData.TA = (studentData.TA) ? true : false;

    return new Promise(function (resolve, reject) {
        Student.create(studentData).then(() => {
            resolve("success");
        }).catch(() => {
            reject('unable to create student');
        })

    });
}

// update student
module.exports.updateStudent = function (studentData) {

    for (prop in studentData) {
        if(studentData[prop] == ''){
            studentData[prop] = null;
        }
    }
    studentData.TA = (studentData.TA) ? true : false;

    return new Promise(function (resolve, reject) {
        Student.update(
            studentData,{
                where:{
                    studentNum : studentData.studentNum
                }
            }
        ).then(() => {
            resolve('success')
        }).catch(() => {
            reject('unable to update student')
        })
    });
}

// add course
module.exports.addCourse = function (courseData) {
    
    for (prop in courseData) {
        if(courseData[prop] == ''){
            courseData[prop] = null;
        }
    }

    return new Promise((resolve, reject) => {
        Course.create(courseData).then(() => {
            resolve('success')
        }).catch(() => {
            reject('unable to create course')
        })
    })
}

// update course
module.exports.updateCourse = function (courseData) {
    for (prop in courseData) {
        if(courseData[prop] == ''){
            courseData[prop] = null;
        }
    } 

    return new Promise((resolve, reject) => {
        Course.update(courseData, {
            where: {
                courseId: courseData.courseId
            }
        }
        ).then(() => {

            resolve('success')
        }).catch(() => {
            console.log('cant update:' + courseData.courseCode)
            reject('unable to update course')
        })
    })
}

// delete course
module.exports.deleteCourseById = function (id) {
    return new Promise((resolve, reject) => {
        Course.destroy({
            where: {
                courseId: id
            }
        }).then(() => {
            resolve('destroyed')
        }).catch(() => {
            reject('unable to delete')
        })
    })
}

// delete student
module.exports.deleteStudentByNum = function(studentNum){
    return new Promise((resolve,reject)=>{
        Student.destroy({
            where:{
                studentNum : studentNum
            }
        }).then(()=>{
            resolve("destroyed")
        }).catch(()=>{
            reject('unable to delete')
        })
    })
}