var express = require('express');
var app     = express();
var multer  = require('multer');
var config  = require('./configuration/config'); // archivo de configuración
var done    =     false ; 

// Multer Storage para mantener la extenteción del archivo.
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, config.folder_upload); // Directirio donde se guardaran los archivos.
	},
	filename: function (req, file, cb) {
		cb(null, Date.now()+file.originalname);
	}
}) 

//add port a server app 
var port = process.env.PORT || config.port;

var upload = multer({ storage: storage });

app.use(express.static(__dirname + '/public'));

//vista de form para subir archivos
app.get('/', function (req, res, next) {
	res.sendfile ("views/index.html");
});

// Ruta para subir el archivo.
app.post('/subir', upload.array('file',2), function (req, res, next) {
	res.send({message:'Archivo guardado', file:req.file});
});

app.listen(port);
console.log('Servidor Ok! en puerto ' + port);