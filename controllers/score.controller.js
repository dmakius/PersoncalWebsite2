import HighScore from './../models/HighScore.js';
import Sort from "../helpers/sort.js"
import mongoose from 'mongoose';

export default class ScoreController{
    static async getScores(req, res){
        HighScore.find({})
        .then((data) => { 
            var sortedData = Sort(data);  
            res.send(sortedData)
        })
        .catch(error =>res.status(400).json({ message: "Failed to get Scores", error: error.message}));
    }

    static async createScore(req, res){
        console.log(`Saving Score ${req.body.name}`);
        const newScore = new HighScore({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            score: req.body.score
        });
    
        newScore.save()
        .then(res.status(200).json({message:"hi score saved!!!!!"}))
        .catch(error =>res.status(400).json({ message: "Failed to Save Score", error: error.message}));
    }

    static async deleteScore(req, res){
        console.log(`Deleting Score ${req.body.id}`);
        HighScore.deleteOne({_id:req.body.id})
        .then(res.status(200).json({message: "Deleted Score Succesfully", scoreId: req.body.id,  flash_type:"alert-info"}))
        .catch(error =>res.status(400).json({ message: "Failed to Delete Score", error: error.message, scoreId: req.body.id,  flash_type:"alert-danger" }));
    }

    static async updateScore(req, res){
        console.log(`Updating Score ${req.body.id}`);
        HighScore.updateOne({_id:req.body.id},{$set:{name:req.body.username, score: req.body.score}})
        .then(res.status(200).json({message: "Updated Score Succesfully",scoreId: req.body.id,  flash_type:"alert-success"}))
        .catch(error =>res.status(400).json({ message: "Failed to Update Score", error: error.message , scoreId: req.body.id,  flash_type:"alert-danger"}));

    }
}
    