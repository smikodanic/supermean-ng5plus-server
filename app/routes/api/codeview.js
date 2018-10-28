const prismjs = require('prismjs');
const BPromise = require("bluebird");
const fs = BPromise.promisifyAll(require("fs"));


/**
 * GET /api/codeview?file=001osnovno.component.ts&tip=angular&codeLang=javascript
 * GET /api/codeview?file=html/osnovno/00test.html&codeLang=html
 * http://prismjs.com/
 * https://www.npmjs.com/package/prismjs
 */
module.exports = function (req, res, next) {
    'use strict';

    var tip = req.query.tip; // angular

    var baseFolder;
    if (tip === 'angular') {
        baseFolder = 'src/app/js/angular/examples/'
    } else {
        baseFolder = 'playground/'
    }
    var filePath = baseFolder + req.query.file;
    var codeLang = req.query.codeLang || 'javascript'; //typescript, html, javascript, css

    var err = new Error('Bad file path: ' + filePath);

    //get file content
    if (req.query.file) {

        fs.readFileAsync(filePath, "utf8")
            .then(function (codeFromFile) {
                var code = Prism.highlight(codeFromFile, Prism.languages[codeLang]);
                var vdata = {
                    code: code,
                    filePath: filePath,
                    codeLang: codeLang
                };
                res.render('public/codeview', vdata);
            })
            .catch(function () {
                next(err);
            });

    } else {
        next(err);
    }

};

