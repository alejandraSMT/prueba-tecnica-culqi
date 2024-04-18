const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const culqiSchema = new Schema ({
    _id: {type: String},
    output : {type: Array}
},{
    collection : "culqi"
});

module.exports = mongoose.model('Culqi', culqiSchema)
