# Acortador de URLs - Challenge técnico para Mercado Libre
## Descripción
Un acortador de URLs es un servicio que nos permite reducir el tamaño de un link. Por ejemplo: 

Tenemos el siguiente link: https://www.mercadolibre.com.uy/c/computacion#menu=categories

Si lo introducimos en nuestra aplicación, el objetivo es obtener algo como: https://me.li/xxyyzz

Nosotros como usuarios finales, si navegamos al link acortado en realidad nos dirigimos al primero. De esta manera contamos con una herramienta para hacer los canales de comunicación más eficientes.

## Requerimientos
- Dada una URL larga, mi servicio me tiene que devolver una URL corta.
- Dada una URL corta, mi servicio me tiene que devolver la URL larga original.
- Puedan obtenerse estadísticas de las URLs que utilizan este servicio.
- Puedan borrarse las URLs cortas necesarias.
- Y lógicamente, que el usuario navegue hacia la URL larga cuando ingresa una
URL corta válida en su navegador :)

## Detalles
La aplicación fue desarrollada con el siguiente stack de tecnologías.
- MongoDB 7.2.2
- Express 4.18.2
- React 18.2.0
- Node.js 19.0.1

### Side Note
Es la primera vez que utilizo MongoDB y React, so mistakes were made. Pero todo aprendizaje es buen aprendizaje.

## Librerías
- ***shortid*** - Nos brinda la ventaja de crear IDs únicas no secuenciales y amigables para ser URLs.
- ***ua-parser-js*** - Herramienta para parsear los el navegador, el motor, el sistema operativo, el CPU y el dispositivo / modelo que utilizo el usuario.
- ***axios*** - Cliente HTTP a base de promesas para procesar las peticiones a la API.
- ***recharts***  - Librería con el propósito de generar gráficas en aplicaciones de React.

## Endpoints
- `/all` Endpoint principal de la aplicación, donde solicitamos los datos a la BD.
- `/short` Generamos y obtenemos la URL acortada a partir de una URL introducida.
- `/$urlId` Este endpoint nos redirecciona a la URL original, donde *$urlId* nos sirve para identificar la URL original en la BD.
- `/delete/$urlId` Para borrar el link acortado, es decir, si lo introduciríamos en el navegador NO nos redirige a la URL original.

### ToDo
- [ ] Mejorar la estructura de carpetas
- [ ] Investigar e implementar testing
- [ ] Divide and conquer, los componentes cumplen una sola función
