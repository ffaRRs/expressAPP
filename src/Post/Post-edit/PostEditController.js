const PostEditService = require("./PostEditService");
const path = require("path")
const createPath = (page) => path.resolve("D:/JS_labs/testExpress/src/ejs-views", `${page}.ejs`);

class PostEditController {
    async get(req, res) {
        const title = "Post";
    
        try {
            const post = await PostEditService.get(req.params.id);
    
            res.render(createPath("edit-post"), {title, post});
        } catch (e) {
            console.log(e);
            res.render(createPath("error"), {title: "error"})
        }
    }
    
    async update(req, res) {
        const {title, author, text} = req.body;
      
        try {
            await PostEditService.update(req.params.id, text, title, (new Date()).toLocaleDateString(), author);
            res.redirect("/posts");

        } catch (e) {
            console.log(e.message);
            res.render(createPath("error"), {title: "error"})
        }
    }
    
}

module.exports = new PostEditController();