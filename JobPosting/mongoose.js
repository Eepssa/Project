const mongoose = require('mongoose');
const http=require('http')
const emailjs=require("@emailjs/nodejs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },

  qualification: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }

});

const applySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  experience: {
    type: Number,
    required: true
  }

});

const conn = mongoose.createConnection('mongodb://localhost:27017/job');
const Detail = conn.model('detail', userSchema);
const User=conn.model('user',applySchema);

// const newDetail = new User({
//     name: 'Developer',
//     title: 'A front-end developer specialises in building the front-side or client side of a web application',
//     email: 'Btech@anc.com',
//     phone:8978778,
//     experience:'34'
//   });
 
//   newDetail.save()
//   .then(() => console.log('User created'))
//   .catch((err) => console.log(err));


const handler=(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET ,POST,OPTIONS,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
}

  if (req.url === '/jobs' && req.method === 'GET') {
    try {
      const jobs = await Detail.find();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(jobs));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  }else if(req.method==='POST' && req.url==='/jobs'){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const { title, description, qualification, location } = JSON.parse(body)
            const newJob = new Detail({
                title,
                description,
                qualification,
                location
            });
            await newJob.save();
            res.writeHead(201, { 'Content-Type': 'application/json' }, {'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({ message: 'Job added successfully' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' }, {'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({ error: error.message }));
        }
    });
  }else if(req.method==='GET' && req.url==='/apply'){
    try {
      const user = await User.find();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  }else if(req.method==='POST' && req.url==='/apply'){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const {name, title, email , phone, experience } = JSON.parse(body)
            const newUser = new User({
                name,
                title,
                email,
                phone,
                experience
            });
            await newUser.save();
            const emailData = {
              service_id: 'service_x7zjsjs', 
              template_id: 'template_keyqfry',
              public_key: 'lfxlGwXZV-exrM4sX', 
              private_key: 'w_2bSV536vu10P2Y_6qnc',
              template_params: {
                to_name: name,
                message:"Thanks for applying",
                to_email:email,
                from_name: 'Eepssa Rout',
                reply_to: "kitty3275rt@gmail.com"
              }     
            };
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
            
            res.writeHead(201, { 'Content-Type': 'application/json' }, {'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({ message: 'Job added successfully' }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' }, {'Access-Control-Allow-Origin': '*'});
            res.end(JSON.stringify({ error: error.message }));
        }
    });
  }else if(req.method==="DELETE" && req.url.startsWith('/jobs/')){
    const id=req.url.split('/')[2]
    console.log(req.url.split('/'))
    console.log('id:'+id);
    try{
      const deleteJob= await Detail.findByIdAndDelete(id)
      if(!deleteJob){
        res.writeHead(404,{'Content-Type':'application/json'})
        res.end(JSON.stringify({error:'Job not found'}))
      }
      else{
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Job deleted successfully' }));
      }
    }catch(error){
        res.writeHead(500,{'Content-Type':'application/json'});
        res.end(JSON.stringify({ error: error.message }));
    }

  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});


const server= http.createServer(handler);

const port=5000;
const host="localhost";
server.listen(port,host,()=>{
    console.log(`Server started at http://${host}:${port}`);
})
