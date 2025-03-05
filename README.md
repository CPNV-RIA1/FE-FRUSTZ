# RIA - FE-FRUSTZ

## Description

Fitness application, available in multiple languages, authentication system...

## Getting Started

### Prerequisites

List all dependencies and their version needed by the project as :

-   Package manager :
    -   [NPM](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)
-   [Node JS](https://nodejs.org/en/download)
-   [Git](https://git-scm.com/)

#### WebStorm

-   IDE used :
    -   [WebStorm version 2024.1.4](https://www.jetbrains.com/webstorm/)
-   OS supported :
    -   [macOS (Sonoma 14.5)](https://www.iclarified.com/91544/where-to-download-macos-sonoma)
-   Extensions :
    -   [Prettier](https://prettier.io/docs/webstorm)

#### VS Code

-   IDE used :
    -   [Visual Studio Code (v1.92.2)](https://code.visualstudio.com/updates/v1_92)
-   OS supported :
    -   [Debian 12 (bookworm)](https://www.debian.org/releases/bullseye/debian-installer/index)
-   Extensions :
    -   [EditorConfig for VS Code (v0.16.4)](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
    -   [Prettier - Code formatter (v11.0.0)](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    -   [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

---

### Configuration

How to set up the database? How do you set the sensitive data?

> TODO

## Install JavaScript

1. JavaScript Verification in the Browser
    - Most modern browsers like Chrome, Firefox, Edge, or Safari include a JavaScript engine.
2. Access the developer tools:

    - Chrome / Edge: `F12` or `Ctrl + Shift + I`
    - Firefox: `F12` or `Ctrl + Shift + K`
    - Safari: `Cmd + Option + C` (with developer mode enabled)
    - Type `console.log("Hello, JavaScript!");` and press **Enter**.

3. [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
4. [Install Node](https://nodejs.org/fr/download)

### WebStorm

-   [Jest](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_node_test_docker)
-   [Debug Test](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_jest_debugging_tests)
-   [Code Coverage](https://www.jetbrains.com/help/webstorm/running-unit-tests-on-jest.html#ws_jest_code_coverage)

### VS Code

-   [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)

For Git Flow, it depends on which OS you are. If you are using Windows, it's all good, it already comes installed with git. For the others, [follow this tutorial](https://skoch.github.io/Git-Workflow/).

In this project, we have been using Visual Studio Code and WebStorm.

## Deployment

### On dev environment

1. Clone the repository and install the required dependencies

```bash
git clone git@github.com:CPNV-RIA1/FE-FRUSTZ.git
cd FE-FRUSTZ
npm i
```

2. Setup `main` branch and init Git Flow for the project

```bash
git switch main

git flow init
```

3. Create configuration file

> Create the configuration file and edit parameters

```bash
# No configuration file for instance
```

4. Setup the database

> No database for this project for instance.

5. Run JS dev server

```bash
npm run dev
```

#### How to run the tests?

```bash
npm run test
```

## Directory structure

```bash
./Neogym
├── app
│   ├── controllers
│   ├── models
│   └── views
│       ├── contact.html
│       ├── trainer.html
│       └── why.html
├── config
├── database
├── docs
├── index.html
├── public
│   └── assets
│       ├── css
│       ├── images
│       └── js
├── README.md
└── test
```

## Collaborate

-   Take time to read some readme and find the way you would like to help other developers collaborate with you.

-   They need to know:
    -   [How to propose a new feature (issue, pull request)](https://github.com/CPNV-RIA1/FE-FRUSTZ/issues/new)
    -   [How to write code](https://ecma-international.org/)
    -   [How to commit](https://www.conventionalcommits.org/en/v1.0.0/)
    -   [How to use your workflow - GitFlow](https://nvie.com/posts/a-successful-git-branching-model/)

## License

-   [MIT License](LICENSE).

## Contact

-   David : <david.dieperink@eduvaud.ch>, [GitHub](https://github.com/dieperid)
-   Julien : <julien.schneider@eduvaud.ch>, [GitHub](https://github.com/T5uy0)
