const express = require('express'); //creating express server using express package
const app = express(); // intializes the app
const task = require('./src/tasks.json'); //relative path
const validator = require('./src/helpers/validator');
const fs = require('fs');
const path = require('path');
app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send('app is running');
});
app.get('/tasks', (req, res) => {
    return res.status(200).send(task);
});

app.get('/tasks/:taskID', (req, res) => {
    let taskIdPassed = req.params.taskID;
    let taskdetails = task.alltasks;
    let result = taskdetails.filter(value => value.taskID == taskIdPassed);
    return res.status(200).send(result);
})

app.post('/tasks', (req, res) => {
    let taskdetails = req.body;
    console.log(taskdetails);
    if (validator.validateTaskInfo(taskdetails, task)) {
        let taskdetailsAdded = JSON.parse(JSON.stringify(task));
        console.log(taskdetailsAdded);
        taskdetailsAdded.alltasks.push(taskdetails);
        let writePath = path.join(__dirname, '.', 'tasks.json');
        fs.writeFileSync(writePath, JSON.stringify(taskdetailsAdded), { encoding: 'utf-8', flag: 'w' });
        return res.status(200).send('task posted successfully');
    } else {
        return res.status(400).send('error in adding the task');
    }
})

app.put('/updateTasks/:taskID', (req, res) => {
    const taskId = req.params.taskID;
    const { title, description, completionStatus, priorityLevel } = req.body;

    if (!title || !description || completionStatus === undefined || !['low', 'medium', 'high'].includes(priorityLevel)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const taskIndex = task.alltasks.findIndex((task) => task.id === parseInt(taskId));
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    } else {
        const updatedFlag = typeof completionStatus === "boolean" ? completionStatus : completionStatus === "true";
        task[taskIndex] = {
            ...task[taskIndex],
            taskID: parseInt(taskId),
            title,
            description,
            completionStatus: updatedFlag,
            priorityLevel,
        };

        const writePath = path.join(__dirname, ".", "tasks.json");
        fs.writeFileSync(writePath, JSON.stringify(task), {
            encoding: "utf-8",
            flag: "w",
        });
        res.status(200).send(task[taskIndex])
    }

})

app.delete("/tasks/:taskID", (req, res) => {
    const taskId = parseInt(req.params.taskID);
    const allTask = task.alltasks;
    const taskIndex = allTask.filter((task) => task.id === parseInt(taskId));
    console.log({ allTask, taskIndex });
    if (taskIndex === -1) {
        res.status(404).json({ error: "Task not found" });
    } else {
        const deletedTask = allTask.splice(taskIndex, 1);

        // Update the task.json file
        const writePath = path.join(__dirname, ".", "tasks.json");
        fs.writeFileSync(writePath, JSON.stringify(task), {
            encoding: "utf-8",
            flag: "w",
        });

        // res.json("deleted task is:", deletedTask[0]);
        res.send(`Task deleted: ${JSON.stringify(deletedTask[0])}`);
    }
});


let port = 5000;
app.listen(port, (err) => {
    if (err) {
        console.log("some error encountered");
    } else {
        console.log('port running on 5000');
    }
});