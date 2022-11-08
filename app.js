//Required Dependencies
const express = require("express");
const data = require("./data.json");
const app = express();
const port = 3000;


//Middleware Set Up
//Pug Set up
app.set('view engine', 'pug');

//Set the path for express.static function
app.use("/static", express.static("public"));
app.use("/images", express.static("images"));

//Routes Set Up
// Index Route
app.get('/', (req, res) => {
    res.render('index', data)
})

//About Route
app.get('/about', (req, res) => {
    res.render('about');
})

//Project Route
app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const projects = projects.find(({ id }) => id === +projectId);

    if (projects) {
        res.render('project', { data });
    } else {
        next();
    }
});

//Start Server on Port 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})