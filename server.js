var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var MongoClient = require('mongodb').MongoClient
var port = process.env.PORT || 80;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(function(request, response, next) {
	//console.log(request.method, request.url);
	next(); 
});

app.use(express.static(__dirname + '/'));


app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.post('/nuevo_producto', function(request, response) {
    var nproduct = request.body;
	MongoClient.connect('mongodb://heroku_3d3n3f2w:ncdbtnibs1psbs61rr0oa8a42m@ds033259.mlab.com:33259/heroku_3d3n3f2w', function(err,db) {
		var collection = db.collection('animales')
		
		collection.insert({"tipo":nproduct.tipo,"raza":nproduct.raza, "telefono": nproduct.telf, "desc": nproduct.desc, "imagen":nproduct.imagen}, function(err, result) {
			if(err) {
				response.send('Error al guardar.')
				if(db) db.close()
				return;
			}
			response.send('Producto guardado con exito.')
			db.close()
		})
	})

		
});

app.post('/borrar_producto', function(request, response) {
    var nproduct = request.body;
	MongoClient.connect('mongodb://heroku_3d3n3f2w:ncdbtnibs1psbs61rr0oa8a42m@ds033259.mlab.com:33259/heroku_3d3n3f2w', function(err,db) {
		var collection = db.collection('animales')
			collection.remove({'telefono':nproduct.telefono},function(err,result){
			if(err) {
				response.send('Error al borrar.')
				if(db) db.close()
				return;
			}
			response.send('Producto borrado con exito.')
			db.close()
		})
	})
		
});

app.post('/modificar_producto', function(request, response) {
    var nproduct = request.body;
	MongoClient.connect('mongodb://heroku_3d3n3f2w:ncdbtnibs1psbs61rr0oa8a42m@ds033259.mlab.com:33259/heroku_3d3n3f2w', function(err,db) {
		var collection = db.collection('animales')
			collection.update({telefono:nproduct.telefono},{$set: {tipo: nproduct.tipo} },function(err,result){
			if(err) {
				response.send('Error al modificar.')
				if(db) db.close()
				return;
			}
			response.send('Producto modificado con exito.')
			db.close()
		})
	})
		
});



app.get('/productos', function(request, response) {
	MongoClient.connect('mongodb://heroku_3d3n3f2w:ncdbtnibs1psbs61rr0oa8a42m@ds033259.mlab.com:33259/heroku_3d3n3f2w', function(err,db) {
		var collection = db.collection('animales')
		collection.find().limit(50).toArray(function(err, results) {
			if(err) {
				response.send('Error en el base de datos.')
				if(db) db.close()
				return;
			}
			response.send(results)
			db.close()
		})
	})
		
});

app.use(function(request, response) {
	response.status(404).sendFile(__dirname + '/partials/404.html');
});

app.listen(port, function(){
	console.log('Server running on port ' + port + '.');
});