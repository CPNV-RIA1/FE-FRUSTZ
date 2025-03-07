# Selenium Setup

This documentation file is for setting up Selenium for this project.

### 1. Install the WebDriver

1. First you'll need to install a navigator on your OS (eg. Chrome, Firefox...)
2. Install the **WebDriver** for your navigator which can be found [here](https://github.com/SeleniumHQ/selenium/tree/trunk/javascript/node/selenium-webdriver#readme)

### 2. Add the WebDriver PATH to your PATH environment variable

1. Unzip the WebDriver that you've downloaded.
2. Put the WebDriver folder where you want, (eg. `Documents` folder)
3. Go in the Documents folder `cd ~/Documents`
4. Export the PATH : `export PATH=$PATH:$(pwd)/<webdriver_name>`
5. Test if the driver works : `<webdriver_name> --version`

### 3. Test Selenium

1. Edit the test file according to the browser you'r using :

    1. Open the `test/selenium/test.js` file and replace **chrome** with your web browser :

    ```javascript
    let driver = await new Builder().forBrowser("chrome").build();
    ```

2. Open your terminal and execute this command :

```bash
node test/selenium/test.js
```
