//Required Dependencies
const express = require("express");
const app = express();
const port = 3000;
const { projects } = require("./data.json");



//Middleware Set Up
//Pug Set up
app.set('view engine', 'pug');

//Set the path for express.static function
app.use("/static", express.static("public"));

//Routes Set Up
// Index Route
app.get('/', (req, res) => {
    res.render('index', { projects })
})

//About Route
app.get('/about', (req, res) => {
    res.render('about');
});

//Project Route
app.get('/projects/:id', (req, res, next) => {
    const projectId = parseInt(req.params.id)
    const project = projects.find(({ id }) => id == projectId);

    if (project) {
        res.render('project', { project });
    } else {
        next();
    }
});

//Error Handlers
// 404 handler
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    error.message = "Looks Like The Project Does Not Exist.";
   next(error);
});

//Global Error
app.use((error, req, res, next) => {
    if(error.status === 400) {
       res.send("Oh no! Something went wrong.");
       console.log("Oh no! Something went wrong.");

    } else {
        console.log(error.status);
        console.log(error.message);
    }
})

//Start Server on Port 3000
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
})