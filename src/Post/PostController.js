const PostService = require("./PostService");
const path = require("path")
const createPath = (page) => path.resolve("D:/JS_labs/testExpress/src/ejs-views", `${page}.ejs`);

class PostController {
    async getAll(req, res) {
        const title = "Posts";

        try {
            const posts = await PostService.getAll();

            res.render(createPath("posts"), {title, posts});
        } catch(e) {
            console.log(e);
            res.render(createPath("error"), {title: "error"});
        }
    };

    async getOne(req, res) {      
        const title = "Post"; 

        try {
            const post = await PostService.getOne(req.params.id);

            res.render(createPath("post"), {title, post});
        } catch (e) {
            console.log(e);
            res.render(createPath("error"), {title: "error"})
        }
    };

    async delete(req, res) {       
        try {
            await PostService.delete(req.params.id);
            res.redirect("/posts");
        } catch (e) {
            console.log(e);
            res.render(createPath("error"), {title: "error"});
            res.sendStatus(300);
        }    
    };

    async addOne(req, res) {   
        const {title, author, text} = req.body;
    
        try {
            PostService.addOne(title, author, text);
            res.redirect("/posts")
        } catch(e) {
            console.log(e);
            res.render(createPath("error"), {title: "Error"});
        }         
    };

    async getAddPost(req, res) {
        const title = "Add post";
    
        res.render(createPath("add-post"), {title});
    };
}

module.exports = new PostController();