let {database,update} = require("../database");
const fs = require("fs").promises;

let remindersController = {
  list: (req, res) => {
   // req.user ="cindy";
   if (database[req.user.email] != undefined) {
    res.render("reminder/index", { reminders: database[req.user.email].reminders });
  } else {
    database[req.user.email] = {reminders:[]};
    res.render("reminder/empty");
  }
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.email].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[req.user.email].reminders });
    }
  },

  create: (req, res) => {
    console.log(req.user);
    console.log(database[req.user.email].reminders);
    let reminder = {
    //  id: database[req.user.email].reminders == undefined ? 1 : database[req.user].reminders.length + 1,
       id: database[req.user.email].reminders.length +1,
    title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    database[req.user.email].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.email].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    database[req.user.email].reminders.forEach((reminder) => {
      if (reminder.id == req.params.id) {
        reminder.title = req.body.title;
        reminder.description = req.body.description;
        reminder.completed = req.body.completed;
      }
    })
    
    res.redirect("/reminders");
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResultIndex = database[req.user.email].reminders.findIndex(function (reminder) {
      return reminder.id == reminderToFind;
    });  
    database[req.user.email].reminders.splice(searchResultIndex);
    res.redirect("/reminders");
  },
    
};

module.exports = remindersController;
