function generateReadMe(answers) {
    return `
# ${answers.title}
![GitHub repo size](https://img.shields.io/github/repo-size/${answers.username}/${answers.repository})
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
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)

## Tests
${answers.tests}

## Questions
${answers.email}

![Profile Image](${answers.profileImage})`;
  }

module.exports = {generateReadMe: generateReadMe};