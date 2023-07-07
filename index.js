const { Command } = require("commander"); 
const contacts = require("./contacts"); 

const program = new Command(); 

program
    .option(
    "-a, --action <string>",
    "choose action: list, get -i, add -n -e -p, remove -i"
    ) 
    .option("-i, --id <string>", "user id") 
    .option("-n, --name <string>", "user name")
    .option("-e, --email <string>", "user email")
    .option("-p, --phone <string>", "user phone");

program.parse(process.argv);

const argv = program.opts(); 

function invokeAction({ action, id, name, email, phone }) {
    switch (
    action 
    ) {
    case "list": 
        contacts.listContacts(); 
        break;
    case "get":
        contacts.getContactById(id);
        break;
    case "add":
        contacts.addContact(name, email, phone); 
        break;
    case "remove":
        contacts.removeContact(id);
        break;
    default: 
        console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);
