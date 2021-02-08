function rand(){    
    return Math.round((Math.random() * 4))
}

function somethingElse(){
    return "message"
}

//module.exports.rand = rand() // exports the function for use globally
//module.exports.somethingElse = somethingElse()

module.exports = {rand:rand(), something:somethingElse()}
