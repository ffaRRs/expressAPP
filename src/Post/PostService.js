const { builtinModules } = require("module");
const db = require("../db.js")
const path = require("path")
const createPath = (page) => path.resolve("D:/JS_labs/testExpress/src/ejs-views", `${page}.ejs`);


class PostService {
    async getAll() { 
       try {
            const posts = await db.query("SELECT * FROM express_schema.post");    
            return posts.rows.sort((a, b) => b.id - a.id);
        } catch(e) {
            throw e;
        }
    };

    async getOne(id) {
        try {
            const post = await db.query(`SELECT * FROM express_schema.post WHERE post.id = ${id}`);
            return post.rows[0];       
        } catch (e) {
            throw e;
        }
    };

    async delete(id) {
        try {
            return await db.query(`DELETE FROM express_schema.post WHERE post.id = ${id}`);
        } catch (e) {
            throw e;
        }      
    };

    async addOne(title, author, text) {  
        try {
            return await db.query(`INSERT INTO express_schema.post ("date", "title", "author", "text")
                                            VALUES ($1, $2, $3, $4) RETURNING *`, [(new Date()).toLocaleDateString(), title, author, text]);           
        } catch(e) {
            throw e;
        }
    };

    async getAddPost() {
        const title = "Add post";
    
        res.render(createPath("add-post"), {title});
    }
}

module.exports = new PostService();