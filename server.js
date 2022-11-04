require("dotenv").config();

const express = require("express");
const path = require("path");
const morgan = require('morgan');
const methodOverride = require("method-override");
const PostRouter = require("./src/routers/PostRouter.js");
const ContactRouter = require("./src/routers/ContactRouter.js");

const createPath = (page) => path.resolve(__dirname + "/src" + "/ejs-views", `${page}.ejs`);

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.static("./src/styles"))
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(ContactRouter)
app.use(PostRouter);



app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const title = "Home";

    res.render(createPath("index"), {title});
})





const startApp = async () => {
    try {
        
        app.listen(PORT, () => {console.log(`Server started on port ${PORT}`);});
    }
    catch(e) {
        console.log(e.message);
    }
}

startApp();

app.use((req, res) => {
    const title = "Error page";
    res.render(createPath("error"), {title});
})