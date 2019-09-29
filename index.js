#! /usr/bin/env node
const figlet = require('figlet');
const chalk = require('chalk');
const fire = require('js-fire');
const inquirer = require('inquirer');
const themes = require("./themes/themes.json");

const cli = {
  __description__: 'Generate Themed ASCII Art',
  generate: (text, font = "Slant Relief", themeName = "Monokai Dimmed", horizontalLayout = "default", verticalLayout = "default") => {
    var coloredData = "";
    var colorsIndex = 0;
    const theme = themes[themeName];
    var data;

    if (!themes[themeName]) {
      throw `"${themeName}" is not a supported theme. You can add it at https://github.com/AlexLakatos/ascii-themes.`
    }

    try {
      data = figlet.textSync(text, {
        font: font,
        horizontalLayout: horizontalLayout,
        verticalLayout: verticalLayout
      });
    } catch (error) {
      return error
    }

    if (themeName === "plain") {
      return data;
    }

    for (var i = 0; i < data.length; i++) {
      var character = data.charAt(i)
      if (character !== "_") {
        if (data.charAt(i - 1) == "_" || data.charAt(i - 1) == " " || data.charAt(i - 1) == ".") {
          colorsIndex++;
          if (colorsIndex >= theme.colors.length) {
            colorsIndex = 0;
          }
        }
        coloredData += chalk.hex(theme.colors[colorsIndex]).bgHex(theme.background)(data.charAt(i))
      } else {
        coloredData += chalk.hex(theme.foreground).bgHex(theme.background)(data.charAt(i))
      }
    }
    return coloredData;
  },
  interactive: () => {
    return new Promise((res, rej) => {
      inquirer.prompt([
        {
          type: "input",
          message: "Text:",
          name: "text"
        },
        {
          type: "list",
          message: "Font:",
          name: "font",
          choices: figlet.fontsSync()
        },
        {
          type: "list",
          message: "Theme:",
          name: "theme",
          choices: Object.keys(themes)
        },
        {
          type: "list",
          message: "Horizontal Layout:",
          name: "horizontal",
          choices: ["default", "full", "fitted", "controlled smushing", "universal smushing"]
        },
        {
          type: "list",
          message: "Vertical Layout:",
          name: "vertical",
          choices: ["default", "full", "fitted", "controlled smushing", "universal smushing"]
        }
      ]).then(answers => {
        res(cli.generate(answers.text, answers.font, answers.theme, answers.horizontal, answers.vertical));
      })
    })
  },
  support: () => {
    return `Supported Fonts:\n${figlet.fontsSync()}\n\nSupported Themes:\n${Object.keys(themes)}`
  }
}

fire(cli);
