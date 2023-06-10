const mongoose = require ('mongoose');

const UserAgent = new mongoose.Schema ({

    browser: {
        type: String,
        requiried: true,
    },
    os: {
        type: String,
        required: true,
    },
    linkAccessed:{
        type: String,
        required: true,
    },
    dateAccessed: {
        type: Date,
        default: new Date (),
        required: true,
    },

});

/*

Cada vez que hacemos click se genera una entrada nueva.
Lo ideal seria un dato de tipo numero para ir acumulando las combinaciones mas comunes. ie. chrome / windows
Si llego a refractar me gustaria cambiarlo, ya que se puede llenar de datos MUY rapido

*/

module.exports = mongoose.model ('users', UserAgent);