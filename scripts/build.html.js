var glob = require("glob-all"),
    path = require("path"),
    fs = require("fs-extra"),
    permalinks = require("permalinks"),
    posthtml = require("posthtml");

/* Site Root */
var root = __dirname.replace('/scripts', '');

/* Destination */
var dest = "./build/";

/* Source */
var files = glob.sync([
    root + "/**/*.html",
    "!" + root + "/node_modules/**/*.html",
    "!" + root + "/lib/components/**/*.html",
    "!" + root + "/build/**/*.html"
]);

/* Loop through source files */
files.forEach(function(file) {
    var permalink;
    var isIndex;
    var dirname = path.dirname(file).substring(root.length);
    var ext = path.extname(file);
    var basename = path.basename(file, ext);
    var html = fs.readFileSync(file, 'utf-8');

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

    /* Compile path for static assets */
    html = html.replace(/{{static}}/g, '/public');

    /* Configure PostHTML and run Mutations */
    const hint = require('posthtml-hint')();
    const include = require('posthtml-include')({ encoding: 'utf-8' });

    posthtml([ hint, include ])
    .process(html)
    .then(function(result) {
        if (!fs.existsSync(dest + basename) && !isIndex) {
            fs.mkdirSync(dest + basename);
        }
        fs.writeFile(dest + permalink, result.html, 'utf-8');
    });
});
