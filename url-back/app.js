const express = require ('express');
const cors = require ('cors')
const dotenv = require ('dotenv'); // Variables de entorno (might come in handy)
const mongoose = require ('mongoose');
const shortid = require ('shortid'); // Generar IDs unicas cortas
const uap = require ('ua-parser-js'); // Para parsear el ua, intente a hacerlo a mano pero quedo mal jeje

const url = require ('./Model/url');
const users = require ('./Model/users');
const utils = require ('./Util/util');


dotenv.config(); // Para usar variables de entorno
const app =  express ();

app.use (cors());
app.use (express.json());

mongoose.connect(process.env.MONGO_URI, {

        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
    .then (() => {

        console.log ('Nos conectamos a la db :D');

    })
    .catch ((err) => {

    console.log (err.message);
    process.exit (1);

});

// Renderizamos la pagina y nos traemos todas las URLs guardadas

app.get ('/all', async (req, res) => {

    const allUrl = await url.find (); // Traemos todos los datos de la base
    
    const aggBrowser = users.aggregate([

        { $match: { browser:  { $in: ['Firefox', 'Chrome'] } } },
        { $group: { _id: '$browser', count: { $sum: 1 } } },

    ]);

    const aggOS = users.aggregate ([

        { $match: { browser: { $in: ['Windows', 'Ubuntu'] } } },
        { $group: { _id: '$browser', count: { $sum: 1} } },
        
    ]);

    res.json(allUrl);

})

// Endpoint del acortador

app.post ('/short', async (req, res) => {

    const { urlOrg } = req.body;
    const base = `http://localhost:3333`; // cambiar por env.BASE luego

    const urlId = shortid.generate (); // generar ID unico para el link

    if (utils.validarURL(urlOrg)) {

        try {

            let urlN = await url.findOne ({ urlOrg }); // Buscamos en la db si ya existe

            if (urlN) {

                urlN.cantShort++;
                urlN.save();
                res.json(urlN)

            } else {

                const urlCor = `${base}/${urlId}`; // Generamos la url acortada con el ID unico

                let hoy = new Date ();
                let compensar = hoy.getTimezoneOffset(); // Cuando vayamos a insertar la fecha la vamos a pasar primero a formato ISO 8601 y tenemos que compensar la diferencia
                hoy = new Date (hoy.getTime() - (compensar*60*1000)) // Aca restamos la diferencia

                urlN = new url ({ // Documento que se va a insertar
                    urlId,
                    urlOrg,
                    urlCor,
                    creacion: hoy.toISOString().split('T')[0], // Y hacemos esto para que quede prolijo como YYYY-MM-DD
                }); 

                await urlN.save (); // Insertamos en la DB
                res.json(urlN)

            }

        } catch (err) {

            console.log (err);
            res.status(500).json('Error en el servidor D:');

        }

    } else {

        res.status(400).json('URL invalida, proba con alguna de meli ' + urlOrg);

    }
 
});

// Endpoint de redireccion

app.get ('/:urlId', async (req, res) => {

    try {

        const urlF = await url.findOne ({ urlId: req.params.urlId }); // Buscamos el identificador en la base

        if (urlF) {

            const userA = req.get('User-Agent'); // Nos traemos el ua del usuario para guardarlo
            const parser = uap(userA); // Creamos un objeto con el ua parseado

            let userBrowser = parser.browser.name; // Solo el string del nombre
            let userOS = parser.os.name; // Solo el string del OS
            let urlAccedida = urlF.urlCor; // El link que accedio (might be usefull for a V2)

            let newAgent = new users ({
                browser: userBrowser,
                os: userOS,
                linkAccessed: urlAccedida,
            });

            urlF.cantClick++; // Sumamos un click
            newAgent.save();
            urlF.save();
            return res.redirect (urlF.urlOrg); // Y redireccionamos

        } else res.sendStatus(404);

    } catch (err) {

        console.log (err);
        res.status(500).json('Error en el servidor D:');

    }

})

// Endpoint de borrado

app.delete ('/delete/:urlId', async (req, res) => {

    try {

        await url.deleteOne ({ urlId: req.params.urlId });
        res.json(data);

    } catch (err) {

        console.log (err);

    }

})

const PUERTO = process.env.PUERTO || 3333;

app.listen (PUERTO, () => {

    console.log (`Server anda por lo menos, puerto: ${PUERTO} :)`);

})