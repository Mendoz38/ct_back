const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const cors = require('cors');
app.use(cors());

// accès aux variables d'environnement
var config = require('./.env')

//import de nos routes
const rdvRoutes = require('./routes/rdvRoutes')


async function db() {
    const uri =  "mongodb+srv://"+ config.mongoDB.user + ":"+ config.mongoDB.password +"@"+ config.mongoDB.cluster_url +"?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const database = client.db(config.mongoDB.dbName);
		console.log('Connexion à la base de données réussie');
        return database;
    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error);
        throw error;
    }
}

//appel de nos routes
rdvRoutes(app, db)



const PORT = config.db.PORT;

app.listen(PORT, () => {
    console.log('ct_back, En écoute sur le PORT : ' + PORT + '   user : ' + config.mongoDB.user + ' de la BDD : ' + config.mongoDB.dbName);
})
