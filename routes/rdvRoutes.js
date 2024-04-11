const express = require('express');
const router = express.Router();

// accès aux variables d'environnement
var config = require('../.env')

module.exports = (app, db) => {
 
app.get('/api', async (request, response)=> {
    try {
        const database = await db();
        const rdvCollection = database.collection(config.mongoDB.collectionName);
        const rdvs = await rdvCollection.find({}).toArray();
        response.json(rdvs);
    } catch (error) {
        console.error('Erreur lors de la récupération des rendez-vous :', error);
        response.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
    }
})


} 