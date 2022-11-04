const {Router} = require("express");
const PostController = require("../Post/PostController");
const PostEditController = require("../Post/Post-edit/PostEditController.js")

console.log(PostEditController.get);

const PostRouter = new Router();

PostRouter.get("/posts", PostController.getAll);
PostRouter.get("/posts/:id", PostController.getOne);
PostRouter.get("/add-post", PostController.getAddPost);
PostRouter.get("/edit-post/:id", PostEditController.get);

PostRouter.post("/add-post", PostController.addOne);

PostRouter.put("/edit-post/:id", PostEditController.update);
PostRouter.delete("/posts/:id", PostController.delete);


module.exports = PostRouter;