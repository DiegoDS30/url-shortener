import React, { useEffect, useState, PureComponent } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VerUrlComponent = () => {

    const [urls, setUrls] = useState ([]);

    useEffect (() => {

        const buscarYSetUrl = async () => {

            const resultado = await axios.get ('http://localhost:3333/all');
            setUrls (resultado.data);

        };

        buscarYSetUrl ();

    }, [urls]);

    const borrarUrl = (e) => {

        e.preventDefault ();

        axios
            .delete (`http://localhost:3333/delete/${e.currentTarget.id}`)
            .then  (res => {
                console.log (res.data);
            })
            .catch (err => {
                console.log (err.message);
            })

    }

    return (

        <div>

                <BarChart
                    width={1300}
                    height={600}
                    data={urls}
                    layout='vertical'
                    margin={{top: 5, right: 0, left: 200, bottom: 5}}
                >
                    <XAxis type='number' dataKey='cantClick'/>
                    <YAxis type='category' dataKey='urlCor'/>
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='cantClick' name='Cantidad de clicks' fill='#009DDC'/>
                    <Bar dataKey='cantShort' name='Cantidad de veces que se acorto' fill='#2B3A67'/>
                </BarChart>

            <table className='table mt-5'>
                <thead className='table-warning'>
                    <tr className='row'>
                        <th className='col-4'>URL original</th>
                        <th className='col-2'>URL acortada</th>
                        <th className='col-1'>Cantidad de clicks</th>
                        <th className='col-2'>Cantidad de veces que se acorto</th>
                        <th className='col-2'>Fecha de creacion</th>
                        <th className='col-1'>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map ((url, index) => (
                        <tr className='row' key={index}>
                            <td className='col-4'><a href={`${url.urlOrg}`}>{url.urlOrg}</a></td>
                            <td className='col-2'><a href={`${url.urlCor}`}>{url.urlCor}</a></td>
                            <td className='col-1'>{url.cantClick}</td>
                            <td className='col-2'>{url.cantShort}</td>
                            <td className='col-2'>{url.creacion}</td>
                            <td className='col-1'><button id={url.urlId} type='button' onClick={borrarUrl} className='btn btn-outline-danger'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg></button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}

export default VerUrlComponent;