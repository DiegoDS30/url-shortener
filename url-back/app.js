const express = require ('express');
const cors = require ('cors')
const dotenv = require ('dotenv');
const mongoose = require ('mongoose');
const shortid = require ('shortid'); // Generar IDs unicas
const url = require ('./url');
const utils = require ('./Util/util')

dotenv.config(); // Para usar variables de entorno
const app =  express ();

app.set('view engine', 'ejs')
app.use (cors());
app.use (express.json());
//app.use (express.urlencoded({ extended: false }));

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

    const allUrl = await url.find ();

    res.json(allUrl);

    //res.render('index', { allUrl: allUrl });

})

// Endpoint del acortador

app.post ('/short', async (req, res) => {

    //const urlOrg = req.body.urlCom;
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
                //res.redirect('/');

            } else {

                const urlCor = `${base}/${urlId}`;

                urlN = new url ({
                    urlId,
                    urlOrg,
                    urlCor,
                    creacion: new Date (),
                });

                await urlN.save ();
                res.json(urlN)
                //res.redirect('/');

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

        const urlF = await url.findOne ({ urlId: req.params.urlId });

        if (urlF) {

            urlF.cantClick++;
            urlF.save();
            return res.redirect (urlF.urlOrg);

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
        //res.redirect('/')
    } catch (err) {

        console.log (err);

    }

})

const PUERTO = process.env.PUERTO || 3333;

app.listen (PUERTO, () => {

    console.log (`Server anda por lo menos: ${PUERTO} :)`);

})