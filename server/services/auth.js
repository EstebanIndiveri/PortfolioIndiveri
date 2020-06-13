var jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// const namespace='http://localhost:3000/';

exports.checkJWT=jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true, // Default Value
        rateLimit:true,
        jwksRequestsPerMinute:50,
        jwksUri: 'https://dev-wxadjir0.auth0.com/.well-known/jwks.json'
      }), 
    audience: 'Rb2nUy7ncYfLRcmtY92wxq55A0PcvhCK', //clientid
    issuer: 'https://dev-wxadjir0.auth0.com/',
    algorithms:['RS256']
  })

  exports.checkRole = role=>(req,res,next)=>{
      const user=req.user;
      if(user && (user[process.env.NAMESPACE+'/role']===role)){
        next();
      }else{
        return res.status(404).send({title:'Not authorized',body:"You're noy authorized to access to this data"})
      }
    }
  