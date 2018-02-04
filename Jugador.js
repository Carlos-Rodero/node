class Jugador{
    
    constructor(nom, email){
        this.nom = nom;
        this.email = email;
        this.puntuacio = 0;
    }

    toString () {
        console.log('Nom del jugador: '+ this.nom);
    }
}

exports.Jugador = Jugador;