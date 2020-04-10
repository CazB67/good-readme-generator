const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);


// https://api.github.com/users/cazb67

function promptUser() {
    return inquirer.prompt([
       

        {
        type: "input",
        name: "repository",
        message: "What is the name of the gitHub repository for this project?",
        default: "good-readme-generator"
      },

      {
        type: "input",
        name: "title",
        message: "What is the title of your project?"
      },

      {
        type: "editor",
        name: "description",
        message: "Describe your project?",
        default: "blah"
      },

      {
        type: "editor",
        name: "installation",
        message: "What are the steps required to install project?",
        default: "blah"
      },

      {
        type: "editor",
        name: "usage",
        message: "Provide instructions for use.",
        default: "blah"
      },
      
      {
        type: "editor",
        name: "tests",
        message: "Write tests for you application",
        default: "blah"
      },
      {
        type: "input",
        name: "username",
        message: "What is your gitHub username?",
        default: "cazb67"
        }

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
![License](https://img.shields.io/github/license/${answers.username}/${answers.repository}?style=flat-square)

## Contributing

## Tests

${answers.tests}

## Questions
{Email}

![Profile Image](${answers.profileImage})`;
  }

  async function go() {

    
      const answers = await promptUser();
      answers.profileImage = await getProfileImage(answers.username);
      const md = await generateReadMe(answers)
      await writeFileAsync("generatedREADME.md", md);
  }

  async function getProfileImage(username) {
    console.log(username);
    try {
    
      const queryUrl = `https://api.github.com/users/${username.toLowerCase()}`;
      console.log(queryUrl);
      const gitHubProfile = await axios.get(queryUrl); 
      console.log("gitHubProfile " + gitHubProfile.data.avatar_url);
      return gitHubProfile.data.avatar_url;

    }
    catch (err) {
        console.log("Err: " + err);
    }

  }

  /*
  async function getEmail() {
    console.log();
    try {
    
      const queryUrl = `https://api.github.com/users/${username.toLowerCase()}`;
      console.log(queryUrl);
      const gitHubProfile = await axios.get(queryUrl); 
      
      return ;

    }
    catch (err) {
        console.log("Err: " + err);
    }

  }*/

  
  go()

  