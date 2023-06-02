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
        type: String,
        default: Date.now,
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
    
});

module.exports = mongoose.model('url', UrlSchema);