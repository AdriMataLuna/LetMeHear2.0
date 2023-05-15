const temaModel = require("./models/tema");
const userModel = require("./models/users");
const favModel = require("./models/favs");
const { response } = require('express');

module.exports = (app) => {
    /* -------------------------------------------------------------------------------------------------------- */
    //Afegir un nou usuari
    //POST al endpoint api/usuaris
    //En el BODY li pasarem els parametres de l'usuari que volem afegir
    app.post('/api/userA', async (req, res) => {
        if(await userModel.count({email: req.body.email}) < 1){
            try {
                const userData = new userModel(req.body);    
                await userData.save();
                const newUser = await userModel.find({email: req.body.email,passwd:req.body.passwd});
                const userFavlist = new favModel();
                userFavlist._id = newUser[0]._id;
                userFavlist.favlist = '';
                await userFavlist.save();
                res.status(200).send(newUser[0]._id);
                
            } catch (error) {
                res.status(500).send(error);
            }
        }else{
            res.status(500).send("nok");

        }
    });
    /* -------------------------------------------------------------------------------------------------------- */
    //Comprovar usuari
    //POST al endpoint api/user
    //En el BODY li pasarem els parametres de l'usuari que volem comprovar
    app.post('/api/userC', async (req, res) => {
        if(await userModel.count({email: req.body.email,passwd:req.body.passwd}) > 0){
            try {
                const newUser = await userModel.find({email: req.body.email,passwd:req.body.passwd});
                res.status(200).send(newUser[0]._id);

            } catch (error) {
                res.status(500).send(error);
            }
        }else{
            res.status(500).send("nok");
        }
    });
    /* -------------------------------------------------------------------------------------------------------- */
    //Obtenir els generes de l'usuari
    //GET al endpoint api/user/genres
    app.get('/api/user/genre/:id', async (req, res) => {
            try {
                res.status(200).send( (await userModel.find({_id: req.params.id})));
                
            } catch (error) {
                res.status(500).send(error);
            }
    });
     /* -------------------------------------------------------------------------------------------------------- */
    //Elimina els generes de l'usuari
    //PUT al endpoint api/user/genres
    app.put('/api/user/genre/rm/:id', async (req, res) => {
        try {
            user = await userModel.findOne({_id: req.params.id});
            user.genres = user.genres.replace(req.body.genre,'');
            await user.save();

            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });
/* -------------------------------------------------------------------------------------------------------- */
    //Afegeix els generes de l'usuari
    //PUT al endpoint api/user/genres
    app.put('/api/user/genre/add/:id', async (req, res) => {
        try {
            user = await userModel.findOne({_id: req.params.id});
            if(user.genres == ""){
                user.genres = req.body.genre;
            }else{
                user.genres = user.genres+' '+req.body.genre;
            }

            await user.save();
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });
    /* -------------------------------------------------------------------------------------------------------- */
    //Afegir preferits
    //POST al endpoint api/favorit
    app.post('/api/favorit/add', async (req, res) => {
            fav = await favModel.findOne({_id: req.body._idUser});
            try {
            if(fav.favlist == ""){
                fav.favlist = req.body.favsong;
            }else{
                fav.favlist = fav.favlist+' '+req.body.favsong;
            }
            await fav.save(); 
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });

     /* -------------------------------------------------------------------------------------------------------- */
    //Eliminar preferit
    //PUT al endpoint /api/favorit
    app.post('/api/favorit/rm', async (req, res) => {

        try {
            fav = await favModel.findOne({_id: req.body._idUser});
            fav.favlist = (fav.favlist).replace(req.body.favsong,'');
            await fav.save();
            res.status(200).send();
        } catch (error) {
            res.status(500).send(error);
        }
    });

    /* -------------------------------------------------------------------------------------------------------- */
    //Obtenir preferits
    //GET al endpoint api/favorit/:id
    app.get('/api/favorit/:id', async (req, res) => {
        try {
            res.status(200).send((await favModel.find({_id: req.params.id})));
        } catch (error) {
            res.status(500).send(error);
        }
    });

    /* -------------------------------------------------------------------------------------------------------- */
    //Afegir cançons (webscaper)
    //POST al endpoint api/temes
    app.post('/api/temes', async (req, res) => {
        try {
            if(await temaModel.count({name: req.body.name,author:req.body.autho}) < 1){
                const songData = new temaModel(req.body);    
                await songData.save();
                res.status(200).send();
            }else{
                res.status(200).send();
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
    /* -------------------------------------------------------------------------------------------------------- */
    //Obtenir cançons per estil
    //GET al endpoint api/temes/:genre
    app.get('/api/temes/:genere', async (req, res) => {
        try {
            res.status(200).send(await temaModel.find({genre: req.params.genere}));
        } catch (error) {
            res.status(500).send(error);
        }

    });

}


