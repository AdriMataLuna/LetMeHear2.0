const mongoose = require("mongoose");

//creem l'esquema dels usuaris
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
        
    },
    passwd: {
        type: String
    },
    genres:{
        type: String
    }
    
},{
    versionKey : false
});

/* declarem una estructura usuaris i l'exportem per poder-la cridar */
const User = mongoose.model("users", UserSchema);

module.exports = User;