import React, { useState } from 'react';
import AddCoin from './AddCoin';
import CoinDisplay from './CoinDisplay';


function MainCoin () {
    
    return(
        <div className="container">
            <AddCoin />
            <CoinDisplay />
        </div>
    )

}


export default MainCoin;