
import * as express from "express"
import Router from "express"
import fs from 'fs'
export const logRouter = Router()
logRouter.use(express.json());
import {FileUtil as futil} from '../utils/fileHandler.js'



// Ajout d'un erreur dans le log

logRouter.post('/addErrors', (req, res) => {

    console.log(req.body)
    let newdata = ""
    const rawdata = fs.readFileSync('errorLog.json');
    const object = JSON.parse(rawdata);
    console.log(object.errors)
    object.errors.push(req.body)
    newdata = JSON.stringify(object, null, "\t")
    
    fs.writeFile('errorLog.json', newdata, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
    })
    res.send(newdata)
      
    
})




// Récupération des erreurs archivées dans le log

logRouter.get('/getErrors', (req, res) => {
    
    fs.readFile('errorLog.json', 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        let resp = ""
        const object = JSON.parse(data);
        object.errors.forEach((e) =>{
            resp += "name:\t" + e.name + ", message:\t" + e.message + ", stackTrace:\t" + e.stackTrace + ", date:\t" + e.date + "\n"
        })
        res.send(resp)
      })

})


// Clear le log

logRouter.delete('/clearErrors', (req, res) => {

    futil.writeFile("errorLog.json", "{\"errors\": []}")
    res.send()
})

