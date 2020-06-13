const express=require('express');
const path=require('path');
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose=require('mongoose');
const routes = require('../routes');
const config = require('./config');
const bodyParser=require('body-parser');
const bookRoutes=require('./routes/book');
const portfolioRouter=require('./routes/portfolio');
const blogRouter=require('./routes/blog');
const nodemailer =require('nodemailer');
const cors=require('cors');

const robotsOptions={
  root:path.join(__dirname,'../public/static'),
  headers:{
    'Content-Type':'text/plain;charset=UTF-8'
  }
}

//services
const authService=require('./services/auth');
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)

const secretData=[
    {
        title:'secret data 1',
        description:'Plans how to build spaceship'
    },
    {
        title:'secretdata 2',
        description:'my secret password'
    }
]

mongoose.connect(config.DB_URI,{useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
console.log('DB CONNECTED!')
})
.catch(error=>console.log(error));

app.prepare().then(() => {
  const server=express();
  server.use(bodyParser.json())
  server.use(cors());
    server.use('/api/v1/books',bookRoutes);
    server.use('/api/v1/portfolios',portfolioRouter);
    server.use('/api/v1/blogs',blogRouter);

    server.get('/robots.txt',(req,res)=>{
      return res.status(200).sendFile('robots.txt',robotsOptions)
    })

/*mail*/ 
    
    server.post('/api/v1/send',(req,res)=>{
      var transporter=nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'indiverimail@gmail.com',
            pass: 'esteban4111'
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      var mailOptions={
        from:req.body.email,
        to:'indiverimail@gmail.com, esteban.i@protonmail.com, remington.mohr@ethereal.email, esteluca89@hotmail.com',
        subject:'Message from:'+req.body.name,
        html:`
        
        <h3>Informations</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Company: ${req.body.company}</li>
        <li>Email: ${req.body.email}</li>
        <li>Phone: ${req.body.phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `
      }
      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(error);
        }else{
          console.log('enviado');
          res.status('success');
          res.status(200).send('success');
        }
      })
    })

/* end mail*/ 



    server.get('/api/v1/secret', authService.checkJWT, (req,res)=>{
        return res.json(secretData);
    })

    server.get('/api/v1/onlysiteowner', authService.checkJWT,authService.checkRole('siteOwner'),(req,res)=>{
      return res.json(secretData);
    })

    
    server.get('*', (req, res) => {
      return handle(req, res)
    })
  
    server.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401).send({title: 'Unauthorized', detail: 'Unauthorized Access!'});
      }
    });
  
    const PORT = process.env.PORT || 3000;
  
    server.use(handle).listen(PORT, (err) => {
      if (err) throw err
      console.log('> Ready on port ' + PORT)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
  