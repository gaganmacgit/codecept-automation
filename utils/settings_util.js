const loadJsonFile = require('load-json-file');

module.exports = new Promise((resolve, reject) => {
    // async.function(function(response) {
        loadJsonFile('././app-config/practice_settings.json').then(json => {
            // console.log(' The json file contents are ',json);
            resolve(json);
        });        
    // });
});