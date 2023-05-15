// API REST per el manteniment de dades
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
app.use(express.json());

/* establim conexió amb la bdd MONGO */
mongoose.connect('mongodb+srv://admin:1234@kanbancluster.tmb8i51.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

/* establim conexió amb mongoose */
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Connected successfully");
});

/* seleccionem i mostrem la carpeta 'www' */
app.use(express.static(path.join(__dirname,'www')));

require('./api')(app);

/* un cop estigui escoltant es mostrará un missatge */
app.listen(port, () => {
    console.log(`Servidor arrancat, escoltant http://localhost:${port}`);
}); 