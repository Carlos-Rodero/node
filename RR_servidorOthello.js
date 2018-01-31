/*
 * Servidor HTTP millorat amb Node JS. Utilitza una funció refactorizada. 
 * utilitza encaminament
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
var http = require("http");
var url = require("url");

function iniciar(encaminar, manegadorPeticions) {
	function onRequest(request, response) {
	// és una function anònima, i li passem petició i resposta (que són dos objectes).
	// petició està ple amb lo que li passem.
	// response està buit a esperes d'omplir-lo amb lo que necessitarem
  
		request.setEncoding("utf8");

		// Codi per fer els post
		var dataPosteada = "";
		var pathname = url.parse(request.url).pathname;
		console.log("Petició per a  " + pathname + " rebuda.");

		request.setEncoding("utf8");

		request.addListener("data", function(trozoPosteado) {
			dataPosteada += trozoPosteado;
			console.log("Recibido trozo POST '" + trozoPosteado + "'.");
		});
		request.addListener("end", function() {
			encaminar(manegadorPeticions, pathname, response, dataPosteada);
		});
	}
  
	// Necessitem un mòdul http. Ens permetrà crear objecte servidor http.
	// A createServer li hem de passar un objecte. Les funcions són OBJECTES I DINÀMIQUES.
	http.createServer(onRequest).listen(8888);
	console.log("Servidor iniciat.");
}
exports.iniciar = iniciar;
