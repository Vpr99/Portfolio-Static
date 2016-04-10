module.exports = {
    "use": [
        "precss",
        "postcss-vertical-rhythm",
        "postcss-import",
        "rucksack-css",
        "postcss-size",
        "lost",
        "cssnano"
    ],
    "input": "lib/css/main.css",
    "output": "build/public/css/main.css",
    "local-plugins": true,
    "rucksack": { "autoprefixer": true },
    "cssnano": { "autoprefixer": false }
};
