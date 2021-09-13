import React, { useState, useEffect } from 'react';
import moment from 'moment';



function CoinDisplay() {

    const [wallet, setWallet] = useState([]);

    const getWallet = () => {
        fetch('http://localhost:3000/coins', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => setWallet(data))

    }


    const updateUSDrate = (name, id, value, notes) => {

        fetch(`https://api.coincap.io/v2/assets/${name}`, {
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'deflate',
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => parseFloat(data.data.priceUsd).toFixed(2))
            .then(priceUsd => {
                fetch(`http://localhost:3000/coins/${id}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify({
                        name: name,
                        value: value,
                        rateUSD: priceUsd,
                        notes: notes || null
                    })
                })
            })
            getWallet();

    }


    const deleteCoin = (id, name) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete ${name}?`)

        if (confirmDelete) {
            fetch(`http://localhost:3000/coins/${id}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'DELETE'
            })
        }
        getWallet();

    }

    
    useEffect(() => {

        getWallet();

    }, [])



    return (
        <div className='container mt-3'>
            <div className="card shadow-lg mb-5">
                <div className="card-header text-center bg-success bg-gradient text-white">
                    Your current Balance
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table align-middle">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Name</th>
                                    <th scope="col" className='text-center'>Amount</th>
                                    <th scope="col" className='text-center'>USD Exch. Rate</th>
                                    <th scope="col" className='text-center'>Notes</th>
                                    <th scope="col" className='text-center'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {wallet.map(({ name, rateUSD, value, _id, notes, updatedAt }, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td ><i className="bi bi-currency-bitcoin pe-2 text-success"></i>{name.toUpperCase()}</td>
                                        <td className='text-center'><span className='fw-bold float-start'>{value}</span> (${rateUSD * value})</td>
                                        <td className='text-center'>{rateUSD}  <span className='text-muted fw-lighter fst-italic float-end'>{moment(updatedAt).format('DD/MM/YY HH:mm')}</span> 
                                            <button type="button" onClick={() => { updateUSDrate(name, _id, value, notes) }} className="btn btn-outline-success shadow mx-3 float-end"><i className="bi bi-arrow-repeat"></i></button>
                                        </td>
                                        <td className='text-center'>{notes}</td>
                                        <td className='text-center'>
                                            <button type="button" className="btn btn-outline-warning shadow mx-1"><i className="bi bi-pen"></i></button>
                                            <button type="button" className="btn btn-outline-danger shadow mx-1" onClick={() => { deleteCoin(_id, name) }}><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinDisplay;