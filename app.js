const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function squadUp() {
    function partyLeader() {
        console.log("Every good team needs a leader!");
        console.log("Lets start with your Team Lead's information,");
        inquirer.prompt([
            {
                type: "input",
                name: "leaderName",
                message: "What is your Team Lead's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid name.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/ // tests if there are any special characters
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid number.";
                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/ //tests if there is an '@' symbol and '.'
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "managerNumber",
                message: "What is your manager's work number?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/ // tests if there are any special characters
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid number.";
                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            console.log("Your Team Lead has been created!");
            makeTeam();
        });
    }
    function makeTeam() {
        console.log("A great team needs their supporting staff");
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which kind of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't have any more team members to add"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    makeEngineer();
                    break;
                case "Intern":
                    makeIntern();
                    break;
                default:
                    rollOutSquad();
            }
        });
    }
    function makeEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/ // tests if there are any special characters
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                        } else {
                            return true;
                        }
                    }
                    return "Please enter a valid number.";
                }
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/ //tests if there is an '@' symbol and '.'
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's GitHub username?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid name.";
                }
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            makeTeam();
        });
    }
    function makeIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a valid name.";
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: answer => {
                    const pass = answer.match(
                        /^[1-9]\d*$/ // tests if there are any special characters
                    );
                    if (pass) {
                        if (idArray.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                        } else {
                            return true;
                        }

                    }
                    return "Please enter a valid number.";
                }
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/ //tests if there is an '@' symbol and '.'
                    );
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's school?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internId);
            makeTeam();
        });
    }
    function rollOutSquad() {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }
    partyLeader();
}
squadUp();

