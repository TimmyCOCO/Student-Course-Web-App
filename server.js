/*********************************************************************************
* WEB700 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Ziming Tan   Student ID: 106915218  Date: 2021-11-08
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
}));

app.set('view engine', '.hbs');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const HTTP_PORT = process.env.PORT || 8080;


const collegeData = require("./modules/collegeData");

// Get all students or some students
app.get('/students', (req, res) => {
    // if have parameter, then Get some students via course number
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course).then(studentsByCourseNum => {
            res.json(studentsByCourseNum);
        }).catch(err => {
            res.status(500).json({ message: "no results" });
        })
    } else { // if don't have paramter, then Get all students
        collegeData.getAllStudents().then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({ message: "no results" });
        })
    }
})

// Get a student via student number
app.get('/student/:num', (req, res) => {
    collegeData.getStudentByNum(req.params.num).then(studentByNum => {
        res.json(studentByNum)
    }).catch(err => {
        res.status(500).json({ message: "no result" })
    })
})

// Get all courses
app.get('/courses', (req, res) => {
    collegeData.getCourses().then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: "no results" });
    })
})

// Get all TAs
app.get('/tas', (req, res) => {
    collegeData.getTAs().then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({ message: "no results" });
    })
})


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
app.get('/students/add/',(req,res)=>{
    // res.sendFile(path.join(__dirname, '/views/addStudent.html'));
    res.render('addStudent');
})


app.post('/processForm',(req,res)=>{
    collegeData.addStudent(req.body).then(()=>{
        res.redirect("/students")
    })
})

// 404 custom page if route not found
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
