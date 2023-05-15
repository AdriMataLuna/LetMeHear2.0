const mongoose = require("mongoose");

//creem l'esquema dels temes
const TemaSchema = new mongoose.Schema({
    name: {
        type: String
    },author:{
        type: String
    },genre:{
        type: String
    },ytframe: {
        type: String
    }
    
},{
    versionKey : false
});

/* declarem una estructura tema i l'exportem per poder-la cridar */
const Temes = mongoose.model("temes", TemaSchema);

module.exports = Temes;