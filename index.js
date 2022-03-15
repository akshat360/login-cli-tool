#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'

import { dataPath, emailValidator, homedir, passwordValidator } from './utils.js'

let email = ''
let password = ''
let hasedPassword = ''
let salt = bcrypt.genSaltSync(10)

const welcome = () => {
  console.log(chalk.gray('CLI to use Auth'))
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menu',
        message: 'What do you want to do?',
        choices: [
          {
            key: 'a',
            name: 'Log In',
            value: 'log-in',
          },
          {
            key: 'b',
            name: 'Show User',
            value: 'show-user',
          },
          {
            key: 'c',
            name: 'Log Out',
            value: 'log-out',
          },
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        case 'log-in':
          handleLoginInCredentials()
          break;
        case 'show-user':
          handleShowUser()
          break;
        case 'log-out':
          handleLogOut()
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}

const handleLoginInCredentials = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email      : ',
        validate: emailValidator,
      },
      {
        type: 'password',
        message: 'Enter your password   : ',
        name: 'password',
        mask: '*',
        validate: passwordValidator,
      },
    ])
    .then((answers) => {
      email = answers.email
      password = answers.password
      hasedPassword = bcrypt.hashSync(answers.password, salt);

      const userData = {
        email,
        password: hasedPassword
      };
      
      fs.writeFile(dataPath, JSON.stringify(userData), err => {
        if (err) console.log("Error logging user :", err);
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}

const handleShowUser = () => {
  fs.readFile(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Please login first!");
      return;
    }
    try {
      const userData = JSON.parse(jsonString);
      

      console.log("home :",homedir);

      console.log("", userData.email, "is logged in."); // => "Customer address is: Infinity Loop Drive"
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

const handleLogOut = () => {
  fs.unlinkSync(dataPath, "utf8", (err, jsonString) => {
    if (err) {
      console.log("Something went wrong!");
      return;
    }
    console.log("User Logged out!")
  });
}

// start program
welcome();
