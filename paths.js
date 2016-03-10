var replace = require("replace");

var assetPath = "/build/public"

replace({
    regex: "<% assetPath %>",
    replacement: assetPath,
    paths: ['./build/'],
    recursive: true,
    silent: true,
});
