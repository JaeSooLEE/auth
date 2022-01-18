import {FileUtil as futil} from '../utils/fileHandler.js'
import fs from 'fs'


export class UserService{
    
    static cleanTokens(data){
        
            
            let res = []
            
            let array = data.passwdTokens;
            const d = new Date().getTime();
            for(const elem of array){
                if(elem.date >=  d - 1200000){
                    res.push(elem)
                }
            }
            data.passwdTokens = res;
            
            return data
    }
}