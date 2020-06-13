const prod=process.env.NODE_ENV==='production';

module.exports={
    'process.env.BASE_URL':prod?'https://indiveriportfolio.herokuapp.com':'http://localhost:3000',
    'process.env.NAMESPACE':'https://indiveriportfolio.herokuapp.com',
    'process.env.CLIENT_ID':'Rb2nUy7ncYfLRcmtY92wxq55A0PcvhCK'
}