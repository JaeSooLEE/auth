import fs from 'fs'
import readline from "readline"

export class FileUtil {

    // Ecriture de content dans le fichier filename

    static writeFile(filename, content){
        fs.writeFile(filename, content, (err) =>{
            if(err) {
                console.log(err);
            }
        });
    }


    // Lecture du fichier filename ligne par ligne

    static readLine(filename, action, closingAction ){
        
        var rl = readline.createInterface({
            input : fs.createReadStream('tokens.txt'),
            output : process.stdout,
            terminal: false
        });
        
        rl.on('line', action);
    
        rl.on('close', closingAction)
    }

    static appendFile(filename, content){

        fs.appendFile(filename, content, (err) =>{
            if(err) {
                console.log(err);
            }
        });

    }


    jsonReader(filePath, cb) {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return false
            }
            try {
                const object = JSON.parse(fileData)
                return object.hasOwnProperty()
            } catch(err) {
                return cb && cb(err)
            }
        })
    }


    static readJsonFile(filePath){
        jsonReader(filePath, (err, json) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(json)
        })

}

    static jsonArrayContains(array, field, value){
        let res = null
        for(const elem of array){
            if(elem[field] === value) return res = elem 
        }
        return res
    }

}
