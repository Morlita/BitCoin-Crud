const mongoose = require('mongoose');

const coinSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        required: true
    },
    rateUSD: {
        type: Number,
        required: true
    },
    notes: {
        type: String
    }
}, { timestamps: true });

const Coin = mongoose.model('Coin', coinSchema);

module.exports = Coin;