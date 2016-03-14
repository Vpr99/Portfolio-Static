var replace = require("replace");

var assetPath = "/public"

replace({
    regex: "<% assetPath %>",
    replacement: assetPath,
    paths: ['./build/'],
    recursive: true,
    silent: true,
});
