//Blocking synchronus
const fs = require('fs');
const http = require('http');
const url = require('url');


const replaceTemplate = require('./starter/modules/replaceTemplate')



/* ________________FILES___________________ */
//File System Sync- Takes two arguments, path and identifier to avoid buffer in terminial. 
/*
//read from filesystem
const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
console.log(textIn);

//write in filesystem using template string
const textOut = `This is what we know about the avacado: ${textIn}.\nCreated on ${Date.now()}`;
//write to new file
fs.writeFileSync('./starter/txt/output.txt', textOut);
console.log('Created New File');
 */
//Non-blocking, asynchronous way
//this will write a new file and use the call back function to show the data
// fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('Error! 💥 ')
//     fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('Your file has been written 😄');
//             })
//         });
//     });
// });
// console.log('Will read file!');


/* basic web server using NODE.js */
//step 1 method 
// step 2 Routing
/* Top level code, first run which is synchronous, but it doesn't block any other code from executing */


///* ___________________________SERVER_______________________ */


// const replaceTemplate = (temp, product)=>{
//     let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//     output = output.replace(/{%IMAGE%}/g, product.image);
//     output = output.replace(/{%PRICE%}/g, product.price);
//     output = output.replace(/{%FROM%}/g, product.from);
//     output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//     output = output.replace(/{%QUANITY%}/g, product.quantity);
//     output = output.replace(/{%DESCRIPTION%}/g, product.description);
//     output = output.replace(/{%ID%}/g, product.id);

//     if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//     return output;
// }


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

/* new request function */
const server = http.createServer((req, res) => {
    
    const {query, pathname} = url.parse(req.url, true)
    




    //Overview page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });

        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);



        res.end(output);


        //product page
    } else if (pathname === '/product') {
        //looking for query object
        console.log(query);

        //data object at the position it falls in the array.
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);


        //api
    } else if (pathname === '/api') {





        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
        /* node can filter directories usin __dirname using template strings */


        //PAGE NOT FOUND 404 PAGE
    } else {



        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-custom-header': 'Hello-World'
        });
    
        res.end('<h1>Sorry, Page Not Found!</h1>');
    
    }
});





/* call back function to listen to requests on port 8000/localhost */


server.listen(8000, '127.0.0.1', () => {
    console.log(`Fired Up On Port ${8000}`)
});

/* Use Req in the console log to see the result */
// const server = http.createServer((req, res) =>{
//     /* Event trigger */
//     console.log(req);
//     res.end('Hello from the server!');

// });
// /* call back function to listen to requests on port 8000/localhost */
// server.listen(8000, '127.0.0.1', () =>{
//     console.log(`Fired Up On Port ${8000}`)
// });