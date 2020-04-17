const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const genererateMD = require("./generateMarkdown.js");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
     

      {
      type: "input",
      name: "repository",
      message: "What is the name of the gitHub repository for this project?"
    },

    {
      type: "input",
      name: "title",
      message: "What is the title of your project?"
    },

    {
      type: "editor",
      name: "description",
      message: "Describe your project?"
    },

    {
      type: "editor",
      name: "installation",
      message: "What are the steps required to install project?"
    },

    {
      type: "editor",
      name: "usage",
      message: "Provide instructions for use."
    },
    
    {
      type: "input",
      name: "tests",
      message: "Write tests for you application"
    },
    {
      type: "input",
      name: "email",
      message: "What email would you like to be contacted on?"
    },

    {
      type: "input",
      name: "username",
      message: "What is your gitHub username?"
      }

  ]);
}

async function go() {
  const answers = await promptUser();
  answers.profileImage = await getProfileImage(answers.username);
  const md = genererateMD.generateReadMe(answers)
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

  
  go()

  