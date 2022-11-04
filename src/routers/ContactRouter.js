const {Router} = require("express");
const ContactController = require("../contacts/ContactController");

const ContactRouter = new Router();

ContactRouter.get("/contacts", ContactController.getAll);


module.exports = ContactRouter;