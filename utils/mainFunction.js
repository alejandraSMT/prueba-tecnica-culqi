function getIndexes(s, words) {
    var wordLength = parseInt(words[0].length)
    var wordArrayLength = parseInt(words.length)
    var concatWordLength = parseInt(wordArrayLength * wordLength)
    var result = []
    var map = new Map()

    if(s.length < concatWordLength || s == "" || words == []){
        return []
    }


    for(var i=0; i<wordArrayLength;i++){
        map.set(words[i], 1)
    }

    for(var i= 0; i < (s.length - concatWordLength)+1; i++){
        var subCad = s.substring(i,(i+concatWordLength))
        
        var mapResults = new Map()
        var count = 0
        for(var j=0; j<=((subCad.length - wordLength)); j = j + wordLength){
            var cad = subCad.substring(j,(wordLength+j))

            if(!mapResults.has(cad,1) && map.has(cad)){
                mapResults.set(cad,1)
                count++
            }
        }

        if(count == wordArrayLength){
            result.push(i)
        }
    }
    console.log("results: ", result);
    return result;
}

module.exports = {getIndexes}