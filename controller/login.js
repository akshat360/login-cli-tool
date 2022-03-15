import fs from 'fs'
import bcrypt from 'bcryptjs'
import inquirer from 'inquirer'

import { dataPath, emailValidator, passwordValidator } from '../utils.js'
import { showMessage } from '../helperFunctions.js'
import chalk from 'chalk'

let salt = bcrypt.genSaltSync(10)

export const handleLoginInCredentials = () => {
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
      let email = answers.email
      let password = bcrypt.hashSync(answers.password, salt)

      const userData = {
        email,
        password,
      }

      fs.writeFile(dataPath, JSON.stringify(userData), (err) => {
        if (err) console.log('Error logging user !', err)
        showMessage('User Logged In!')
      })
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    })
}

export const handleShowUser = () => {
  fs.readFile(dataPath, 'utf8', (err, jsonString) => {
    if (err) {
      console.log('Please login first!')
      return
    }
    try {
      const userData = JSON.parse(jsonString)
      console.log(chalk.blue(`${userData.email} is loggedIn!`))
    } catch (err) {
      console.log('Error parsing JSON string:', err)
    }
  })
}

export const handleLogOut = () => {
  fs.unlink(dataPath, (err, jsonString) => {
    if (err) {
        console.log('Please login first!')
        return
    }
    showMessage('User Logged out!');
  })
}
