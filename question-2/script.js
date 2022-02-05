/**
 * On this module you should write your answer to question #2.
 * This file would be executed with the following command:
 * $ node scritp.js BrowsingEvents.csv
 */
// import {readFile,writeFile} from 'fs/promises'
const fs = require('fs');
const fsPromises = fs.promises;
const args = process.argv.slice(-1);
const arr = []
const doReadFile = async (arg)=>{
    let filehandle = null;
    try{
        filehandle= await fsPromises.open(arg.toString(),'r+')
        var datos = await (await filehandle.readFile("utf-8")).split('\r\n');
        const [header,...data]= datos
        for(const i of data){
            const splitFiles = i.split(",")
            arr.push({
                user:splitFiles[0],
                entityId:splitFiles[1],
                entityType:splitFiles[2],
                eventType:splitFiles[3],
            })
        }
        var productsId=[]
        var index;
        for(let i=0;i<arr.length-1;i++){
            if(productsId.some(e=>e.productId===arr[i].entityId)){
                productsId.some((_,idx)=>{
                    index=idx
                    return _.productId===arr[i].entityId
                })
                if(arr[i].eventType==='impression')
                    productsId[index].impressions++
                else{
                    productsId[index].clicks++
                }

            }else{
                productsId.push({
                    productId:arr[i].entityId,
                    clicks:arr[i].eventType==='click'?1:0,
                    impressions:arr[i].eventType==='impression'?1:0,
                    cdr:0
                })
            }   
        }
        productsId.forEach(e=>{
            e.cdr=e.clicks/e.impressions
        })
        filehandle =await fsPromises.open("./output.csv",'a+')
        productsId.forEach(async (val,index,array)=>{
             await filehandle.writeFile(`${val.productId}, ${val.clicks}, ${val.impressions}, ${val.cdr===Infinity?1:val.cdr}\n`)
        })
    }catch(e){
        console.log("error",e)
    }
}
doReadFile(args)
console.log(`Running question #2 with args ${args}`)
