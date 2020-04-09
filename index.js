const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//const queryUrl = `https://api.github.com/users/${username}/`;
// https://api.github.com/users/cazb67

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },
      {
        type: "input",
        name: "description",
        message: "Describe your project?"
      },
      {
        type: "input",
        name: "installation",
        message: "What are the steps required to install project?"
      },
      {
        type: "input",
        name: "usage",
        message: "Provide instructions for use."
      },
      {
        type: "input",
        name: "usage-screenshot",
        message: "Do you want to add a screenshot or gif of your project?",
        choices: [
            "Yes", 
            "No"
          ]

      },
      {
        type: "input",
        name: "license",
        message: "Choose a license.",
        choices: [
            "MIT License", 
            "GNU GENERAL PUBLIC LICENSE", 
            "None", 
            "Other"
          ]
      },
      {
        type: "input",
        name: "contributing",
        message: "Would you like other developers to contribute to you project",
        choices: [
            "Yes", 
            "No"
          ]

      },
      {
        type: "input",
        name: "tests",
        message: "Write tests for you application",
      },

      {
        type: "input",
        name: "questions",
        message: "What is your gitHUb username?",
      },
    ]);
  }

function generateReadMe(answers) {
    return `
# ${answers.title}

## Description
${answers.description}

## Table of Contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Licence](#License)
4. [Contributing](#Contributing)
5. [Tests](#Tests)
6. [Questions](#Questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
${answers.choices}

## Contributing
{Text}

## Tests
${answers.tests}

## Questions
{Email}
{Image}`;
  }

  promptUser()
  .then(function(answers) {
    const md = generateReadMe(answers);

    return writeFileAsync("README.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });