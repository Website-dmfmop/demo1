const mongoose = require('mongoose');
const uri = "mongodb://dmfmopwebsite_db_user:Dmfmop123@ac-ukwv50l-shard-00-00.8y6dqdo.mongodb.net:27017,ac-ukwv50l-shard-00-01.8y6dqdo.mongodb.net:27017,ac-ukwv50l-shard-00-02.8y6dqdo.mongodb.net:27017/?authSource=admin&replicaSet=atlas-jjlig9-shard-0&ssl=true&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection error:", err);
    process.exit(1);
  });
