const express = require('express'); //creating express server using express package
const app = express(); // intializes the app
let port = 3000; //defining the port
const courseData = require('./src/courses.json'); //relative path
const validator = require('./src/helpers/validator');
const fs = require('fs');
const path = require('path');
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send('hi SRG');
});

app.get('/courses', (req, res) => {
    return res.status(200).send(courseData);
});

app.get('/courses/:courseID', (req, res) => {
    let courseIdPassed = req.params.courseID;
    let airtribeCourse = courseData.airtribe;
    let result = airtribeCourse.filter(value => value.courseID == courseIdPassed);
    return res.status(200).send(result);
})

app.post('/courses', (req, res) => {
    let courseDetails = req.body;
    console.log(courseDetails);
    if (validator.validateCourseInfo(courseDetails, courseData)) {
        let courseDataAdded = JSON.parse(JSON.stringify(courseData));
        console.log(courseDataAdded);
        courseDataAdded.airtribe.push(courseDetails);
        let writePath = path.join(__dirname, '.', 'courses.json');
        fs.writeFileSync(writePath, JSON.stringify(courseDataAdded), { encoding: 'utf-8', flag: 'w' });
        return res.status(200).send('course details added');
    } else {
        return res.status(400).send('Got some error');
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('some error occured');
    } else {
        console.log('server started successfully on port 3000');
    }
})