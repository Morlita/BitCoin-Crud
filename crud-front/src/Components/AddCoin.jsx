import React, { useState } from 'react'

function AddCoin() {

    const [newCoinInput, setNewCoinInput] = useState({})


    const handleInput = (e) => {
        setNewCoinInput({ ...newCoinInput, [e.target.name]: e.target.value })
    }

    console.log(newCoinInput);

    const setCoinData = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/coins', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: newCoinInput.coin,
                value: newCoinInput.value,
                rateUSD: newCoinInput.rateUSD
            })
        })
            .then(response => response.json())
            .then(data => console.log('data', data));
        
    }



    return (
        <div className="container my-3">
            <div className="card col-4 m-auto shadow-lg">
                <div className="card-header text-center bg-primary bg-gradient text-white">
                    Add New Coin
                </div>
                <form id='addCoinForm' className='p-1 col-10 m-auto'>
                    <select className="form-select my-1" aria-label="Default select example" value="" onChange={handleInput} name="coin">
                        <option value="" disabled>Choose Coin</option>
                        <option value="swissborg">swissborg</option>
                        <option value="nexo">nexo</option>
                        <option value="pancakeswap">pancakeswap</option>
                        <option value="omg">omg</option>
                        <option value="compound">compound</option>
                        <option value="helium">helium</option>
                        <option value="terra-luna">terra-luna</option>
                        <option value="the-graph">the-graph</option>
                    </select>
                    <div className="input-group mb-1">
                        <span className="input-group-text" id="inputGroup-sizing-default">Amount</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={newCoinInput.name} name='value' onChange={handleInput}></input>
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-text" id="inputGroup-sizing-default">Estimated USD rate</span>
                        <input type="number" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" value={newCoinInput.name} name='rateUSD' onChange={handleInput}></input>
                    </div>
                    <div className='d-grid m-auto col-6'>
                        <button type="submit" className="btn btn-primary m-1" onClick={setCoinData}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default AddCoin;