/*
 * Manegador  de peticions.
 * 1. server -> gestiona posar-se en marxa.
 * 2. routing -> és l'enrutament o encaminament.
 * 3. manegador de peticions -> la lògica està aquí
 * @author  Carlos Rodero 
 * @author  Mario Recamales
 * @version 1.0
 * date 20.01.2018
 * forma del document UTF-8
 *
 * CHANGELOG
 *
 * NOTES
 * Projecte M06UF4. Comunicació asíncrona client-servidor.
 * 4.1 Node.JS
 * 4.2 Ajax
 * 4.3 MongoDB
 */

var fs = require('fs');
var querystring = require("querystring");
var assert = require('assert'); //utilitzem assercions

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions
var ObjectId = require('mongodb').ObjectID;

var usuari_logat = false;
/*
function iniciarBD(){
  var ruta = 'mongodb://localhost:27017/daw2';

  MongoClient.connect(ruta, function (err, db) {
		assert.equal(null, err);
    console.log("Connexió correcta");
    });
  return[db,error];
}
*/

function inici(response) {
  console.log("manegador de la petició 'iniciar' s'ha cridat.");
  response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  response.write("Hola iniciar");
  response.end();
}

function css(response, consulta) {
  console.log("manegador de la petició 'css' s'ha cridat.");

  fs.readFile('./css/style.css', function(err, sortida) {
    response.writeHead(200, {
      'Content-Type' : 'text/css'
    });
    response.write(sortida);
    response.end();
  });
}

function images_background(response, consulta) {
  console.log("manegador de la petició 'images_background' s'ha cridat.");

  fs.readFile('./images/background.svg', function(err, sortida) {
    response.writeHead(200, {
      'Content-Type' : 'image/svg+xml'
    });
    response.write(sortida);
    response.end();
  });
}

function login(response) {
  console.log("manegador de la petició 'login' s'ha cridat.");
  
  fs.readFile('./login.html', function(err, sortida) {
    response.writeHead(200, {
      'Content-Type' : 'text/html'
    });
    response.write(sortida);
    response.end();
  });
}

function register(response,consulta) {
  console.log("manegador de la petició 'register' s'ha cridat.");

  var username = querystring.parse(consulta)['username'];
  var email = querystring.parse(consulta)['email'];
  var password = querystring.parse(consulta)['password'];
  var html = '';

  var ruta = 'mongodb://localhost:27017/daw2';

  MongoClient.connect(ruta, function (err, db) {
    assert.equal(null, err);
    console.log("Connexió correcta");

    //required for version of Mongodb > 3.00 
    const db_othello = db.db('daw2')

    if (email == null ){
      response.writeHead(301,
        {Location: 'http://127.0.0.1:8888/login'}
      );
      response.end();
    }else{
      consultarDocumentRegistre(db_othello, err, email, function (usuari_registrat) { 
        if (usuari_registrat){
          html = '<html>'+
          '<head>'+   
          '</head>'+
          '<body>'+
          'usuari ja registrat'+
          '</body>'+
          '</html>';
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(html)
          response.end();
        }else{
          afegirDocuments(db_othello, err, username, email, password, function () { });
          html = '<html>'+
          '<head>'+   
          '</head>'+
          '<body>'+
          'registre realitzat'+
          '</body>'+
          '</html>';
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(html)
          response.end();
        }
      });
    }
  });
}

function partida(response,consulta) {
  console.log("manegador de la petició 'partida' s'ha cridat.");

  var email = querystring.parse(consulta)['logemail'];
  var password = querystring.parse(consulta)['logpassword'];
  
  var ruta = 'mongodb://localhost:27017/daw2';

  MongoClient.connect(ruta, function (err, db) {
    assert.equal(null, err);
    console.log("Connexió correcta");

    //required for version of Mongodb > 3.00 
    const db_othello = db.db('daw2')

    if (email == null || password == null){
      response.writeHead(301,
        {Location: 'http://127.0.0.1:8888/login'}
      );
      response.end();
    }else{
      consultarDocumentLogin(db_othello, err, email, password, function () {
        console.log("login" + usuari_logat)
        if (usuari_logat){
          //var jugador = new Jugador(nom,email);
          //jugador.toString;
          fs.readFile('./partida.html', function(err, sortida) {
            response.writeHead(200, {
              'Content-Type' : 'text/html'
            });
            response.write(sortida);
            response.end();
          });
        }else{
          html = '<html>'+
          '<head>'+   
          '</head>'+
          '<body>'+
          'login usuari incorrecte'+
          '</body>'+
          '</html>';
          response.writeHead(200, {"Content-Type": "text/html"});
          response.write(html)
          response.end();
        }
      });
    }
  });
}

var afegirDocuments = function (db, err, username, email, password, callback) {
  db.collection('usuaris').insertOne({
      "nom": username,
      "email": email,
      "password": password
  });
  assert.equal(err, null);
  console.log("Afegit " + username + " a col·lecció usuaris");
  callback();
};

var consultarDocumentRegistre = function (db, err, email, callback) {
  var usuari_registrat = false;
  var cursor = db.collection('usuaris').find({
    "email": email
  });
  cursor.each(function (err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        usuari_registrat = true;
      } else {
          callback(usuari_registrat);
      }
  });
};

var consultarDocumentLogin = function (db, err, email, password, callback) {
  var cursor = db.collection('usuaris').find({
    "email": email,
    "password": password
  });
  cursor.each(function (err, doc) {
      assert.equal(err, null);
      if (doc != null) {
        usuari_logat = true;
      }else {
        callback();
      }
  });
};

exports.inici = inici;
exports.css = css;
exports.images_background = images_background;
exports.login = login;
exports.register = register;
exports.partida = partida;

