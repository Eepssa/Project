const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const axios = require('axios');



const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);


    
    if (req.method === 'GET' && pathname === '/') {
        fs.readFile('form.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error loading form');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } else if (req.method === 'POST' && pathname === '/generate-qr') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            const formData = querystring.parse(body);

            const productName = formData.productName;
            const price = formData.price;
            const qrData = `Product: ${productName}, Price: ${price}`;
            const url='http://localhost:2700/pay'
            const payUrl = `http://localhost:2700/pay?productName=${encodeURIComponent(productName)}&price=${encodeURIComponent(price)}`;
            try {
                const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(payUrl)}`;
                // const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${url}&productName=${productName}&price=${price}`;
                const response = await axios.get(qrCodeUrl, { responseType: 'arraybuffer' });

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`<html><body><img src="data:image/png;base64,${Buffer.from(response.data).toString('base64')}"></body></html>`);
                res.end();
            } catch (error) {
                res.writeHead(500);
                res.end('Error generating QR code');
            }
        });
    } 
    else if(req.method==='GET' && pathname==='/pay'){
        const data=query;
        console.log(JSON.stringify(data))
        console.log(data.price)
        res.end(`Your payment of amount ${data.price} on ${data.productName} is successful`)
        // res.end('Thank you for purchasing');

    }
    
    else {
        res.writeHead(404);
        res.end('Page not found');
    }
});

const port = 2700;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server started at http://${host}:${port}`);
});

