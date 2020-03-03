"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 9096;
app.get('/', function (req, res) {
    res.send('The sedulous hyena the t  world !');
});
app.listen(port, function (err) {
    if (err) {
        return console.error(err);
    }
    return console.log("server is listening on " + port);
});
//# sourceMappingURL=server.js.map