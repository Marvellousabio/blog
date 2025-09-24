const http=require('http');
const fs=require('fs');
const _ = require('lodash')

const server=http.createServer((req,res)=>{
//lodash
const num=_.random(0,20);
console.log(num);

res.setHeader('Content-Type','text/html');
let path='./';
switch(req.url){
    case'/':path+='index.html';
    res.statusCode=200;
        break;
    case'/about':path+='about.html'
    res.statusCode=200;
    break;
    case'/about-me':path+='about.html'
    res.statusCode=301;
    res.setHeader('location','/about');
    res.end();
    break;
    default:path+='404.html';
    res.statusCode=404;
    break;
}
fs.readFile(path,(err,data)=>{
    if (err){
        console.log(err);
    }else{
        // res.write(data);
        
        res.end(data);
    }
})
});

server.listen(4000,'localhost',()=>{
    console.log('listening for requests on port 4000')
})