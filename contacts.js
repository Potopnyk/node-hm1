const fs = require("fs").promises; 
const path = require("path"); 

const contactsPath = path.join("./db", "contacts.json"); 
const contactsDataBase = require("./db/contacts.json"); 
const { nanoid } = require("nanoid");

function parseContacts(data) {
  return JSON.parse(data.toString()); 
}

function listContacts() {
  fs.readFile(contactsPath) 
    .then((data) => {
      return parseContacts(data); 
    })
    .then((list) => {
      return [...list].sort((a, b) => {
        return a.name.localeCompare(b.name); 
      });
    })
    .then((result) => console.table(result)) 
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath) 
    .then((data) => {
      const contacts = parseContacts(data); 
      return contacts;
    })
    .then((contacts) => {
      const contactsFilter = contacts.filter(
        (contact) => contact.id === contactId 
      );
      if (contactsFilter.length > 0) {
        console.table(contactsFilter); 
        return;
      }
      console.log(`There is no contact with the id: ${contactId}.`); 
    })
    .catch((err) => console.log(err.message)); 
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = parseContacts(data); 
      return contacts;
    })
    .then((contacts) => {
      const contactIndex = contacts.findIndex(
        (contact) => contact.id === contactId 
      );
      if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);

        fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
          if (error) {
            console.log(error.message);
            return;
          }
        });
        console.log(
          `Contact with the id ${contactId} has been removed.`
        );
      } else {
        console.log(`There is no contact with the id: ${contactId}.`); 
      }
    })
    .catch((error) => console.log(error.message)); 
}

function addContact(name, email, phone) {
  const contact = {
    id: nanoid()
      .toString(),
    name,
    email,
    phone,
  };

  if (name === undefined || email === undefined || phone === undefined) {
    console.log(
      "Please set all arguments (name, email, phone) to add contact"
    ); 
    return;
  }

  contactsDataBase.push(contact);

  const contactsUpdate = JSON.stringify(contactsDataBase);

  fs.writeFile(contactsPath, contactsUpdate, (error) => {
    if (error) {
      console.log("Oops, something went wrong:".red, error.message);
      return;
    }
  });
  console.log(`${name} has been added to your contacts`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};