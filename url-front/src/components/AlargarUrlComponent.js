import React, { useState } from "react";
import axios from 'axios';

const AlargarUrlComponent = () => {

    const [url, searchUrl] = useState ('');

    const onSubmit = (e) => {

        e.preventDefault ();

        if (!url) {

            alert ('no hay nada :(');
            return;

        }

        console.log(url)

        axios
            .get (`http://localhost:3333/long/${url}`, {urlCor: url})
            .then (res => {

                console.log (res.data);

            })
            .catch (err => {

                console.log (err.message);

            });

            searchUrl('');

    }

    return (

        <section className='w-100 d-flex flex-column justify-content-center align-items-center'>

            <h3>Alargar Url</h3>

            <form className="w-50 mb-2" onSubmit={onSubmit}>

                <input className='w-100 border border-primary p-2 fs-3 h-25' type='text' placeholder='http://localhost:3333/qefqef' value={url} onChange={e => searchUrl(e.target.value)}/>

                <div className='d-grid col-6 mx-auto'>
                        <button type='submit' className='btn btn-primary m-5'>
                            Acortar link
                        </button>
                </div>

            </form>

            <p>{url}</p>

        </section>

    );

}

export default AlargarUrlComponent