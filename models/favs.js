const mongoose = require("mongoose");

//creem l'esquema de les favorites
const FavSchema = new mongoose.Schema({
    _id: {
        type: String
    },favlist:{
        type: String
    }
    
},{
    versionKey : false
});

/* declarem una estructura preferits i l'exportem per poder-la cridar */
const Favs = mongoose.model("favs", FavSchema);

module.exports = Favs;