/*
 * arxiu principal que arrenca el servidor HTTP
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
"use strict";
var server = require("./RR_servidorOthello");
var encaminador = require("./RR_encaminadorOthello");
var manegadorPeticions = require("./RR_manegadorPeticionsOthello");

// instancia d'objecte manegadors. En temps d'execució puc afegir propietats i mètodes. 
// Afegeixo propietats com les claus ["/"]
var manegadors = {};
manegadors["/"] = manegadorPeticions.login;
manegadors["/css"] = manegadorPeticions.css;
manegadors["/images_background"] = manegadorPeticions.images_background;
manegadors["/login"] = manegadorPeticions.login;
manegadors["/register"] = manegadorPeticions.register;
manegadors["/partida"] = manegadorPeticions.partida;

manegadors["/RR_ajax.js"] = manegadorPeticions.RR_ajax;
manegadors["/taulell"] = manegadorPeticions.taulell;

server.iniciar(encaminador.encaminar, manegadors);