// server.js

	// ===============  Imposto le dipendenze ========================
	var express  = require('express');
	var app      = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');
	
	// Non serve per ora...
	// var forge = require('node-forge');
	
	// ================  Configurazione =================
	mongoose.connect('mongodb://127.0.0.1:27017/ghea');
	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev')); 
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
	app.use(methodOverride());

	var Hash = mongoose.model('Hash', {
		nome : String,
		dimensione : String,
		tipo : String,
		sha1 : String
	});

	// listen ( avvio l'app in ascolto in server.js ) ======================================
	app.listen(8080);
	console.log(".           .             . .         ");  
	console.log("|           |             | |     ");       
	console.log("|-. ,-: ,-. |-. ;-.-. ,-: | | ,-. , , , "); 
	console.log("| | | | `-. | | | | | | | | | | | |/|/  "); 
	console.log("' ' `-` `-' ' ' ' ' ' `-` ' ' `-' ' '  "); 
	console.log("[!] Applicazione avviata su 0.0.0.0:8080");

	app.post('/api/hash', function(req, res) {
		console.log("Ricevuto file:\nsha1: " + req.body.sha1 + "\nnome: " + req.body.nome);

		Hash.create({
				nome : req.body.nome,
				dimensione : req.body.dimensione,
				tipo : req.body.tipo,
				sha1 : req.body.sha1
			}, function(err, hash) {
				if (err)
					res.send(err);
				res.json(hash);
			});
	});

	app.get('/api/hash/:hash_id', function(req, res) {
		var obj_id = req.params.hash_id;
		
		console.log("\nRichiesta: " + req.params.hash_id );
		Hash.findOne({_id : obj_id }, function(err, hash) {
				if (err)
					res.send(err);
				res.json(hash);
			});
	});
	
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	
	app.get('*', function(req, res) {
		res.sendfile('./public/404.html');
	})
	
	