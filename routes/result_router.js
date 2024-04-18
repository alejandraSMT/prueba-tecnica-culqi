const {Router} = require('express');
const router = Router();
const Culqi = require("../models/Result");
const getIndexes = require("../utils/mainFunction.js");
const mongoose = require('mongoose');

router.get("/getResults", async (req, res) => {
    try{
        const listResults = await Culqi.find({}, { __v: 0 })
        console.log("Succesfully fecthed results!")
        res.json(listResults)
    }catch(error){
        res.json({"message":"Error fetching results :("})
        console.log(error.message)
    }
});

router.post("/addResult", async (req, res) => {
    try{
        const {s, words} = req.body;
        const output = getIndexes.getIndexes(s,words);

        const newItem = new Culqi({
            _id: new mongoose.Types.ObjectId().toString(),
            output: output
        })
        await newItem.save(function (err) {
            if (err) {
                console.error(err.message);
                res.json({"message": "Error inserting result into collection!"})
            } else {
                console.log('Succesfully inserted!');
                res.json({"message": `Succesfully inserted the array = ${newItem}`})
            }
        })

    }catch(err){
        res.json({"meesage":"Error!"})
        console.error(err.message)
    }
});

module.exports = router;