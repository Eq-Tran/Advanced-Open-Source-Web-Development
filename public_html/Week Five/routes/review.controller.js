const e = require('express');
var Review = require('./review.model');
var debug = require('debug')('demo:review');

function sendJsonResponse(res,status,content){
    res.status(status);
    res.json(content);
}

module.exports.reviewsReadAll = (req,res) => {

    debug("Getting all reviews")
    Review.find().exec().then((results) => {
        sendJsonResponse(res, 200, results);
    }).catch((err) =>{
        sendJsonResponse(res, 404, err);
    })
}


module.exports.reviewsReadOne = (req,res) => {

    if(req.params && req.params.reviewID){
        debug("Getting single review with id =", req.params.reviewID)
        Review.findById(req.params.reviewID).exec().then((results) => {
            sendJsonResponse(res, 200, results);
        }).catch((err) =>{
            sendJsonResponse(res, 404, {
                "message": "review id not found"
            });
        })

    }else{
        sendJsonResponse(res, 404, {
            "message": "review id not found"
        });
    }
    
}

// POST Routes /api/v1/reviews

module.exports.reviewsCreate = (req,res) => {
    debug('Creating a review', req.body);
    Review.create({
        author:req.body.author,
        rating:req.body.rating,
        reviewText:req.body.reviewText
    }).then((dataSaved) => {
        debug(dataSaved);
        sendJsonResponse(res,201,dataSaved);
    }).catch(err => {
        debug(err);
        sendJsonResponse(res, 400, err);
    })
}

module.exports.reviewsUpdateOne = (req,res) => {
    if(!req.params.reviewID){
        sendJsonResponse(res, 404,{
            "message":"Not found review ID required"
        })
        return;
    }

    Review.findById(req.params.reviewID).exec()
    .then((reviewData) => {
        reviewData.author = req.body.author;
        reviewData.rating = req.body.rating;
        reviewData.reviewText = req.body.reviewText;

        return reviewData.save();
    }).then((data)=>{
        sendJsonResponse(res, 200, data);
    }).catch(err =>{
        sendJsonResponse(res, 400, err);
    })
}

module.exports.reviewsDeleteOne = (req,res) =>{
    if(!req.params.reviewID){
        sendJsonResponse(res, 404, {
            "message":"Not found id required"
        });
        return;
    }

    Review.findByIdAndRemove(req.params.reviewID).exec()
    .then(data =>{
        debug("Review ID " + req.params.reviewID + " deleted");
        debug(data)
        sendJsonResponse(res, 204, null);
    }).catch(err => {
        sendJsonResponse(res, 404,err);
    })
}