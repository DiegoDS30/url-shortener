const mongoose = require ('mongoose');

const UrlSchema = new mongoose.Schema ({

    urlId: {
        type: String,
        required: true,
    },
    urlOrg: {
        type: String,
        required: true,
    },
    urlCor: {
        type: String,
        required: true,
    },
    creacion: {
        type: String, // Podriamos hacer algo parecido aca con new Date ("<YYYY-mm-dd>") pero habria que buscar la manera de compensar
    },
    cantClick: {
        type: Number,
        required: true,
        default: 0,
    },
    cantShort: {
        type: Number,
        required: true,
        default: 1,
    },
    toDelete: { // Fecha para establecer cuando se creo
        type: Date,
        default: new Date (),
        required: true,
    },    
    
}, {timestamps: true} );

UrlSchema.index ({toDelete: 1}, {expireAfterSeconds: 1296000}) // Usamos la segunda fecha para borrar despues de 7 dias

module.exports = mongoose.model('url', UrlSchema);