#!/usr/bin/env node
import chalk from 'chalk'
import inquirer from 'inquirer'

import { handleLoginInCredentials, handleLogOut, handleShowUser } from './controller/login.js'

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

// start program
welcome();
