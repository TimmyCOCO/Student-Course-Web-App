/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Ziming Tan   Student ID: 106915218  Date: 2021-11-16
*
* Online (Heroku) Link: https://limitless-stream-49000.herokuapp.com/
*
********************************************************************************/

const express = require('express');
const app = express();
const path = require('path');

// handlebars module
const exphbs = require('express-handlebars');

// configure handlebars
app.engine('.hbs', exphbs({
    extname: '.hbs',
    layout: 'main',
    helpers: {
        navLink: function (url, options) {
            return '<li' +
                ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') +
                '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';
        },

        equal: function (lvalue, rvalue, options) {
            if (arguments.length < 3)
                throw new Error("Handlebars Helper equal needs 2 parameters");
            if (lvalue != rvalue) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        }
    }
}));

app.set('view engine', '.hbs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// fix navigation bar
app.use(function (req, res, next) {
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == '/') ? '/' : route.replace(/\/$/, '');
    next();
});

const HTTP_PORT = process.env.PORT || 8080;


const collegeData = require("./modules/collegeData");

// Get all students or some students
app.get('/students', (req, res) => {
    // if have parameter, then Get some students via course number
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course).then(data => {
            //res.json(data);
            res.render("students", {
                students: data
            });

        }).catch(() => {
            // res.status(500).json({ message: "no results" });
            res.render("students", {
                message: "no results"
            });

        });
    
    } else { // if don't have paramter, then Get all students
        collegeData.getAllStudents().then(data => {
            // res.json(data);    
            res.render("students", {
                students: data
            });

        }).catch(() => {
            // res.status(500).json({ message: "no results" });
            res.render("students", {
                message: "no results"
            });
        });
    }
})


// Get a student via student number
app.get('/student/:num', (req, res) => {
    collegeData.getStudentByNum(req.params.num).then(studentByNum => {
        // res.json(studentByNum);
        res.render('student', {
            student: studentByNum
        });
    }).catch(err => {
        //res.status(500).json({ message: "no result" });
        res.render('student', {
            message: "no results"
        });
    });
})

// Get all courses
app.get('/courses', (req, res) => {
    collegeData.getCourses().then(data => {
        // res.json(data);
        res.render("courses", {
            course: data
        });

    }).catch(() => {
        // res.status(500).json({ message: "no results" });
        res.render('courses', {
            message: "no results"
        });
    });
})

// Get course by courseId
app.get('/course/:id', (req, res) => {
    collegeData.getCourseById(req.params.id).then(data => {
        res.render("course", {
            course: data
        });
    }).catch(err => {
        res.json({message: err});
    })
})

// Get all TAs, remove now
// app.get('/tas', (req, res) => {
//     collegeData.getTAs().then(data => {
//         res.json(data);
//     }).catch(err => {
//         res.status(500).json({ message: "no results" });
//     })
// })


// Home Page
app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/home.html'));
    res.render('home');
})

// About Page
app.get('/about', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/about.html'));
    res.render('about');
})

// htmlDemo Page
app.get('/htmlDemo', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/htmlDemo.html'));
    res.render('htmlDemo');
})

// Add Student Page
app.get('/students/add/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/views/addStudent.html'));
    res.render('addStudent');
})

// Update Student
app.post('/student/update', (req, res) => {
    //console.log(req.body);
    collegeData.updateStudent(req.body).then(() => {
        res.redirect("/students");
    })
})


// Process the form, will not show up
app.post('/processForm', (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect("/students")
    })
})

// display 404 custom page if route not found
app.use((req, res, next) => {
    // res.status(404).send("404: Page Not Found");
    res.status(404).sendFile(path.join(__dirname, '/public/404.png'));
})


// start service 
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("server listening on port: " + HTTP_PORT);
    });
}).catch((err) => {
    console.log(err);
})
