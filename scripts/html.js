var glob = require("glob-all"),
    path = require("path"),
    fs = require("fs-extra"),
    permalinks = require("permalinks"),
    posthtml = require("posthtml");

/* Destination */
var dest = "../build/";

/* Source */
var files = glob.sync([
    __dirname + "/../**/*.html",
    "!" + __dirname + "/../node_modules/**/*.html",
    "!" + __dirname + "/../build/**/*.html"
]);

/* Loop through source files */
files.forEach(function(file) {
    var permalink;
    var isIndex;
    var ext = path.extname(file);
    var basename = path.basename(file, ext);
    var html = fs.readFileSync(file, 'utf-8');

    /* Config for PostHTML Template Expressions */
    const exp = require('posthtml-exp')({
        locals: {

        }
    });

    /* Create Pretty Permalinks */
    if(basename == "index") {
        isIndex = true;
        permalink = "index.html";
    }
    else {
        var permalink = permalinks(':basename/index:ext', {
            basename: basename,
            ext: ext
        });
    }

    /* Run PostHTML Transformations */
    posthtml([ exp ])
    .process(html)
    .then(function(result) {
        if (!fs.existsSync(dest + basename) && !isIndex){
            fs.mkdirSync(dest + basename);
        }
        fs.writeFile(dest + permalink, result.html, 'utf-8');
    });
});
