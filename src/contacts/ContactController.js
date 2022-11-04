const ContactService = require("./ContactService.js");
const path = require("path")
const createPath = (page) => path.resolve("D:/JS_labs/testExpress/src/ejs-views", `${page}.ejs`);

class ContactController {
    async getAll(req, res) {
        const title = "Contacts";

        try {
            const contacts = await ContactService.getAll();
            res.render(createPath("contacts"), {title, contacts})
    
        } catch(e) {
            res.render(createPath("error"), {title: "Error"})
            console.log(e);
        };
    }
};

module.exports = new ContactController();