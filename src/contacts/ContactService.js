const db = require("../db.js");

class ContactService {
    async getAll() {
        try {
            const contacts = await db.query(`SELECT * FROM express_schema.contact`);
            return contacts.rows; 
    
        } catch(e) {
            console.log(e);
            throw e;
        };
    }
}


module.exports = new ContactService();