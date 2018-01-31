/*
 * Encaminador de peticions 
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

function encaminar(manegadorPeticions, pathname, response, consulta) {
  console.log('preparat per encaminar una petició a ...' + pathname);
  if (typeof manegadorPeticions[pathname] === 'function') {
    return manegadorPeticions[pathname](response, consulta);
  }else {
    console.log("No s'ha trobat manegador per a " + pathname);
    return "404 Not found";
  }
}

exports.encaminar = encaminar;