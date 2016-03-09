var glob = require("glob-all"),
    path = require("path"),
    fs = require("fs-extra");

var buildRoot = __dirname + '/build/';

/* Look for .html files not in node_modules or build */
glob([
    __dirname + "/**/*.html",
    "!" + __dirname + "/node_modules/**/*.html",
    "!" + __dirname + "/build/**/*.html"
], function(err, files) {
    files.forEach(function(file) {
        var dir = path.dirname(file);
        var filename = path.basename(file);
        var projectlocation = file.replace(__dirname, '');

        /* If it's the root index for the site, just move it. Don't create an /index/ folder */
        if(projectlocation === "/index.html") {
            fs.copySync(file, buildRoot + "index.html");
            return;
        }

        /* Strips the directory within the project. Necessary for nested html files. */
        var filedirectory = projectlocation.substr(0, projectlocation.lastIndexOf("/") + 1);

        /* Strips .html file extension */
        filename = filename.slice(0, -5);

        /* Checks if the new directory exists, before creating it */
        if(filedirectory) {
            var newDir = buildRoot + filedirectory + "/" + filename;
        }
        else {
            var newDir = buildRoot + filedirectory + filename;
        }
        // // var newDir = buildRoot + filedirectory + filename;
        // // var newDir = buildRoot + filedirectory + "/" + filename;
        // if (!fs.existsSync(newDir)){
        //     // fs.mkdirSync(newDir);
        // }
        fs.copySync(file, newDir + "/index.html");
    });
});
