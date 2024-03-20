const http=require('http')
const querystring = require('querystring');
const fs=require('fs')
const emailjs=require("@emailjs/nodejs");

const handler=((req,res)=>{
    if (req.method === 'POST' && req.url === '/email') {
        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });
        req.on('end', async () => {
          const formData = querystring.parse(body);
    
          const { name, email } = formData;

          const emailData = {
            service_id: 'service_x7zjsjs', 
            template_id: 'template_keyqfry',
            public_key: 'lfxlGwXZV-exrM4sX', 
            private_key: 'w_2bSV536vu10P2Y_6qnc',
            template_params: {
              to_name: name,
              message:"Hello Friends",
              to_email:email,
              from_name: 'Eepssa Rout',
              reply_to: "kitty3275rt@gmail.com"
            }     
          };
          try {
            console.log(emailData);
            emailjs
  .send(emailData.service_id, emailData.template_id, emailData.template_params, {
    publicKey: emailData.public_key,
    privateKey: emailData.private_key, // optional, highly recommended for security reasons
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    },
  );
            
          } catch (error) {
            console.error('Error sending email:', error.response.data);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error sending email' }));
          }
        });
    }
    else if (req.method === 'GET' && req.url === '/') {
        fs.readFile('reg.html', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('Error loading reg form');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    }else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
      }
      
});


const server= http.createServer(handler);

const port=2700;
const host="localhost";

server.listen(port,host,()=>{
    console.log(`Server started at http://${host}:${port}`);
})

