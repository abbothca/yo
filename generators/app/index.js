'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        return this.prompt(
                [{
                        type: 'input',
                        name: 'name',
                        message: 'Your project name',
                        default: this.appname // Default to current folder name
                    }, {
                        type: 'confirm',
                        name: 'cool',
                        message: 'Would you like to enable the Cool feature?'
                    }]
                )
                .then((answers) => {
                    this.log('app name', answers.name);
                    this.log('cool feature', answers.cool);
                });
    }

    writing() {
        this.fs.copy(
                this.templatePath('dummyfile.txt'),
                this.destinationPath('dummyfile.txt')
                );
    }

    install() {
        this.installDependencies();
    }
};
