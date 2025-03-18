const path = require("path");
const fs = require("fs");

fs.readdirSync(__dirname).forEach((file) => {
    if (file.endsWith(".js") && file !== "main.js") {
        console.log(`Running test: ${file}`);
        require(path.join(__dirname, file));
    }
});
