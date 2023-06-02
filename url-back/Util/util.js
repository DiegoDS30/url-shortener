function validarURL (link) {

    let patron = new RegExp ('^(https?:\/\/)?([A-Za-z0-9-]+\.)?(mercadolibre|mercadolivre)\.com(\/|.*)?$')

    // Nos aseguramos que sea un link valido y que el dominio sea de meli

    return patron.test (link)

}

function validarLocal (link) {

    let patron = new RegExp ('^(http?:\/\/)?(localhost(:\d+)?|)?(\/|.*)?$')

    return patron.test (link)

}

module.exports = { validarURL, validarLocal }