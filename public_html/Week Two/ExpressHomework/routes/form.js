var express = require('express');
var router = express.Router();

router.get('/', (req,res) => {
    res.render('form', {title:"Form Page", content: "Express Lab"})
})

router.post('/', (req,res) => {
    res.render('results', {name:req.body.name ,email:req.body.email, comment:req.body.comment, title: "Results Page"});
})
module.exports = router;