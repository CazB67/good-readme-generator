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
        type: "checkbox",
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
        type: "list",
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
        name: "username",
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
![Profile Image](${answers.profileImage})`;
  }
/*
  promptUser()
  .then(function(answers) {
    getProfileImage(answers.username);
    console.log(x);
    const md = generateReadMe(answers);

    return writeFileAsync("README.md", md);
  })
  .then(function() {
    console.log("Successfully wrote to README.md");
  })
  .catch(function(err) {
    console.log(err);
  });
  */



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
  go();
