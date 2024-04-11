const { MongoClient } = require('mongodb');


let db;

async function connectToDatabase() {
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    db = client.db('ma_base_de_donnees');
  } catch (error) {
    console.error('Erreur lors de la connexion à la base de données :', error);
  }
}

async function getDonneeCollection() {
  if (!db) {
    await connectToDatabase();
  }
  return db.collection('donnees');
}

async function getAllRDV() {
    const collection = await getDonneeCollection();
    try {
      return await collection.find().toArray();
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
      return [];
    }
  }
  
  module.exports = {
    getAllRDV
  };