'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        // This makes `appname` a required argument.
        // desc Description for the argument
        // required Boolean whether it is required
        // type String, Number, Array (can also be a custom function receiving the raw string value and parsing it)
        // default Default value for this argument
        this.argument('appname', {type: String, required: true});
        // And you can then access it later; e.g.
        this.log(this.options.appname);
    }

    prompting() {
        return this.prompt(
                [
                    {
                        type: 'input',
                        name: 'moduleName',
                        message: 'A name of your app:',
                        validate: function (input) {
                            if (/.+/.test(input)) {
                                return true;
                            }
                            return 'Please enter a app name';
                        },
                        default: this.appname
                    },
                    {
                        type: 'input',
                        name: 'author',
                        message: 'Your full name:',
                        validate: function (input) {
                            if (/.+/.test(input)) {
                                return true;
                            }
                            return 'Please enter your full name';
                        },
                        default: this.user.git.name
                    },
                    {
                        type: 'input',
                        name: 'email',
                        message: 'Your email:',
                        validate: function (input) {
                            if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
                                return true;
                            }
                            return 'Please enter a valid email address';
                        },
                        default: this.user.git.email
                    },
                    {
                        type: 'input',
                        name: 'description',
                        message: 'One-line description of your module:',
                        validate: function (input) {
                            if (/.+/.test(input)) {
                                return true;
                            }
                            return 'Please enter a brief description of your module';
                        },
                        default: "simple HTML/CSS/JS app"
                    },
                    {
                        type: 'input',
                        name: 'keywords',
                        message: 'List of keywords for your module, separated by comma:',
                        validate: function (input) {
                            if (/.+/.test(input)) {
                                return true;
                            }
                            return 'Please enter a comma-separated list of keywords';
                        },
                        default: "html css js"
                    },
                    {
                        type: 'input',
                        name: 'gitUrl',
                        message: 'Your project\s Git URL:',
                        validate: function (input) {
                            if (/.+\..+/.test(input)) {
                                return true;
                            }
                            return 'Please enter a URL';
                        },
                        store: true,
                        default: ''
                    },
                    {
                        type: 'list',
                        name: 'license',
                        message: 'License identifier (see https://spdx.org/licenses/ for all choices):',
                        choices: ["MIT", "Apache 2.0", "Mozilla Public License 2.0", "BSD 2-Clause (FreeBSD) License", "BSD 3-Clause (NewBSD) License", "Internet Systems Consortium (ISC) License", "GNU AGPL 3.0", "Unlicense", "No License (Copyrighted)"],
                        default: "MIT"
                    },
                    //-------------------------------------------------
                    {
                        type: 'confirm',
                        name: 'jquery',
                        message: 'Would you like to set up jQuery',
                        default: 'Y'
                    },
                    {
                        type: 'confirm',
                        name: 'fontawesome',
                        message: 'Would you like to set up Font Awesome',
                        default: 'Y'
                    },
                    {
                        type: 'list',
                        name: 'cssframework',
                        message: 'Would you like to use some CSS framework?',
                        choices: ["no", "bootstrap", "foundation", "neato"],
                        default: "no"
                    }
                ]
                )
                .then((props) => {
                    this.props = {

                        moduleName: props.moduleName,
                        description: props.description,
                        gitUrl: props.gitUrl,
                        keywords: props.keywords,
                        license: props.license,

                        author: {
                            name: props.author,
                            email: props.email
                        },

                        jquery: props.jquery,
                        fontawesome: props.fontawesome,
                        cssframework: props.cssframework
                    };
                });
    }

    paths() {
        //    this.destinationRoot();
        // returns '~/projects'
        this.log(this.destinationRoot());
        //this.contextRoot
        //    this.destinationPath('index.js');
        // returns '~/projects/index.js'
    }

    installingDependencies() {
        this.installDependencies({
            bower: true,
            npm: false,
            callback: function () {
                console.log('Everything is ready!');
            }
        });
        if (this.props.jquery)
            this.bowerInstall(['jquery'], {'save-dev': true});

        if (this.props.fontawesome) {
            this.bowerInstall(['components-font-awesome'], {'save-dev': true});
        }
    }

    writing() {
        this.fs.copy(
                this.templatePath('_example.config.js'),
                this.destinationPath('example.config.js')
                );
        this.fs.copyTpl(
                this.templatePath('index.html'),
                this.destinationPath('public/index.html'),
                {title: 'Templating with Yeoman'}
        );
        this.fs.copy(
                this.templatePath('scss/'),
                this.destinationPath('public/assets/scss/')
                );
        this.fs.copy(
                this.templatePath('js/'),
                this.destinationPath('public/assets/js/')
                );
        this.fs.copyTpl(
                this.templatePath('_bower.json'),
                this.destinationPath('./bower.json'),
                {config: this.props}
        );
        this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('./package.json'),
                {config: this.props}
        );
        this.fs.copyTpl(
                this.templatePath('_gulpfile.js'),
                this.destinationPath('./gulpfile.js')
                );
    }

    install() {
        this.installDependencies();
        // this.spawnCommand('composer', ['install']);
    }
};
