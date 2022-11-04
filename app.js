require("dotenv").config();

const { json } = require("body-parser");
const express = require("express");
const path = require("path");
const morgan = require('morgan');
const db = require("./src/db.js");
const methodOverride = require("method-override");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("./src/styles"))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

const createPath = (page) => path.resolve(__dirname + "/src" + "/ejs-views", `${page}.ejs`)

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const title = "Home";

    res.render(createPath("index"), {title});
})

app.get("/contacts", async (req, res) => {
    const title = "Contacts";

    try {
        let contacts = await db.query(`SELECT * FROM express_schema.contact`)
        contacts = contacts.rows      
        res.render(createPath("contacts"), {title, contacts})

    } catch(e) {
        res.render(createPath("error"), {title: "Error"})
        console.log(e);
    };
})

app.get("/posts/:id", async (req, res) => {
    const title = "Post";

    try {
        let post = await db.query(`SELECT * FROM express_schema.post WHERE post.id = ${req.params.id}`);
        post = post.rows[0];

        res.render(createPath("post"), {title, post});
    } catch (e) {
        res.render(createPath("error"), {title: "error"})
    }
})

app.get("/edit-post/:id", async (req, res) => {
    const title = "Post";

    try {
        let post = await db.query(`SELECT * FROM express_schema.post WHERE post.id = ${req.params.id}`);
        post = post.rows[0];

        res.render(createPath("edit-post"), {title, post});
    } catch (e) {
        res.render(createPath("error"), {title: "error"})
    }
})

app.put("/edit-post/:id", async (req, res) => {
    const {title, author, text} = req.body;
    console.log("dasd");

    try {
        let editedPost = await db.query(`UPDATE express_schema.post  
                                         SET text = $1, title = $2, date = $3, author = $4
                                         WHERE "id" = ${req.params.id} RETURNING *`, [text, title, (new Date()).toLocaleDateString(), author]);
        editedPost = editedPost.rows[0];
        console.log(editedPost);

        res.redirect("/posts")
    } catch (e) {
        console.log(e.message);
        res.render(createPath("error"), {title: "error"})
    }
})


app.delete("/posts/:id", async (req, res) => {

    try {
        let post = await db.query(`DELETE FROM express_schema.post WHERE post.id = ${req.params.id}`);
        post = post.rows[0];
        res.sendStatus(200);
    } catch (e) {
        res.render(createPath("error"), {title: "error"});
        res.sendStatus(300);
    }

})

app.get("/posts", async (req, res) => {
    const title = "Posts";

    try {
        let posts =  await db.query("SELECT * FROM express_schema.post");
        posts = posts.rows.sort((a, b) => b.id - a.id);

        res.render(createPath("posts"), {title, posts});
    } catch(e) {
        res.render(createPath("error"), {title: "error"});
    }

})


app.get("/add-post", (req, res) => {
    const title = "Add post";

    res.render(createPath("add-post"), {title});
})

app.post("/add-post", async (req, res) => {
    const {title, author, text} = req.body;

    try {
        const post = await db.query(`INSERT INTO express_schema.post ("date", "title", "author", "text")
                                     VALUES ($1, $2, $3, $4) RETURNING *`, [(new Date()).toLocaleDateString(), title, author, text])

        res.redirect("/posts")
    } catch(e) {
        res.render(createPath("error"), {title: "Error"});
    }
   
})

app.use((req, res) => {
    const title = "Error page";

    res.render(createPath("error"), {title});
})
  

app.listen(port, () => {
    console.log("start listening server");
})




