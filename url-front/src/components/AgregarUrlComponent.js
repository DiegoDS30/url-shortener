import React, { useState } from 'react';
import axios from 'axios';

const AgregarUrlComponent = () => {

    // Cuando mandamos una url valida seteamos el estado y la mandamos a la api

    const [url, setUrl] = useState ('');

    const onSubmit = (e) => {

        e.preventDefault();

        if (!url) {

            alert ('no hay nada :(');
            return;

        }

        axios
            .post ('http://localhost:3333/short', { urlOrg: url })
            .then (res =>  {
                console.log (res.data);
                let urlCorta = res.data.urlCor;
                let linkCorto = document.getElementById ('link');

                linkCorto.innerHTML = urlCorta;
                linkCorto.href = urlCorta;

            })
            .catch (err => {
                console.log (err.message);
            });

            setUrl('');
        
    }

    return (

        <div>
            <main>
                <section className='w-100 d-flex flex-column justify-content-center align-items-center'>

                    <h1 className='mb-6 fs-1'>Acortador de URL</h1>

                    <p>Introduzca una URL del dominio de Mercado Libre</p>

                    <form className='w-50 mb-4' onSubmit={onSubmit}>
                    
                    <div className='row g-2'>
                        <div className='col-9'>
                            <input className='border border-primary form-control' type='text' placeholder='http://mercadolibre.com.uy' value={url} onChange={e => setUrl(e.target.value)}/>
                        </div>
                        <div className='col-3'>
                            <button type='submit' className='btn btn-primary'>
                                Acortar link
                            </button>
                        </div>
                    </div>

                    </form>

                    <p>Su URL acortada:</p><a className='mb-2 border border-dark-subtle p-2' id='link' href=''></a>

                </section>
            </main>
        </div>

    );

}

export default AgregarUrlComponent;