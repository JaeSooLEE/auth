import { LoginTester} from "./test.js";
//....
import fs from 'fs'
const args = process.argv.slice(2)




async function autotest(){
    let verb = false
    let configFile = ""
    if(args[0] == "verbose") {
        verb = true
        configFile = args[1]
    }else{
        configFile = args[0]
    }

    fs.readFile(configFile, 'utf8', (err, data) => {
        if (err){
            console.error(err)
            return
        }
        const obj = JSON.parse(data);
        for(const t of obj.tests){
            eval(t.testClass + "." + t.testFunction)
        }
    })

}