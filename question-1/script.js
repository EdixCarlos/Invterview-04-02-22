/**
 * On this module you should write your answer to question #1.
 * This file would be executed with the following command (N=100):
 * $ node scritp.js 100
 */
const climbStairs=(n)=>{
        if (n < 3) return n;
        let first = 1;
        let second = 2;
        for (let i = 2; i < n; i++) {
          const current = first + second;
          first = second;
          second = current;
        }
        return second;
}
const args =  process.argv.slice(2);
console.log(`Running question #1 with args ${args}`)
const fs = require('fs');
process.argv.slice(2).forEach((val,index,array)=>{
    console.log(`${index} : ${val} = ${climbStairs(parseInt(val))}`)
    fs.writeFile('output.txt',`-------\n${index} : ${val} = ${climbStairs(parseInt(val))}\n`,{
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
      },(err)=> {if(err) console.log(err)})
})
