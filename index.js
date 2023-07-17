
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const http = require('http');
const httpCasClient = require('http-cas-client');


const handler = httpCasClient({
    casServerUrlPrefix: process.env.CAS_SERVER,
    serverName: process.env.SERVER_NAME
});


http.createServer(async (req,res) => {
    
    if(!await handler(req,res)) {
        return res.end();
    }
    
    const { principal, ticket } = req;

    console.log(principal, ticket);
    res.end('hello world');
}).listen(8001, () => {
    console.log('Server running ...')
});