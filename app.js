//Required Dependencies
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const { projects } = require("./data.json");



//Middleware Set Up
//Body Parser
app.use(bodyParser.urlencoded({extended: false}));

//Pug Set up
app.set('view engine', 'pug');

//Set the path for express.static function
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));

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
        res.render('project', { projects });
    } else {
        next();
    }
});

//Error Handlers
// 404 handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    err.message = 'Oops, looks like the project requested does not exist.'
    next(err);
});

//Global Error
app.use((err, req, res, next) => {
    if(err.status === 400) {
        res.send('Oops, something went wrong!');
        console.log('Oops, something went wrong!')
    } else {
        console.log(err.status);
        console.log(err.message);
    }
})

//Start Server on Port 3000
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
})