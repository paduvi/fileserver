var express = require('express');
var serveIndex = require('serve-index');
var multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage: storage});

var app = express()
const PORT = process.env.PORT || 5000

// Serve URLs like /ftp/thing as public/ftp/thing
// The express.static serves the file contents
// The serveIndex is this module serving the directory
app.get('/*', express.static('public'), serveIndex('public', {'icons': true}))

app.post("/upload", upload.single("file"), function (req, res) {
    console.log("Uploaded to " + req.file.filename);
    res.send("Uploaded to " + req.file.filename)
});


// Listen
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))