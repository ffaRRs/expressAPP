const db = require("../../db.js");

class PostEditService {
    async get(id) {       
        try {
            const post = await db.query(`SELECT * FROM express_schema.post WHERE post.id = ${id}`);
            return post.rows[0];

        } catch (e) {
            console.log(e.message);
            throw e;
        }
    };
    
    async update(id, text, title, date, author) { 
        try {
            const editedPost = await db.query(`UPDATE express_schema.post  
                                                SET text = $1, title = $2, date = $3, author = $4
                                                WHERE "id" = ${id} RETURNING *`, [text, title, date, author]);
            return editedPost.rows[0];    
            
        } catch (e) {
            console.log(e);
            throw e;
        }
      
    };
};

module.exports = new PostEditService();