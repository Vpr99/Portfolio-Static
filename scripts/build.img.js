var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp(__dirname + "/../lib/images", __dirname + "/../build/public/images", function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
});
