const mongoose=require('mongoose');
const Schema =mongoose.Schema;


const portfolioSchema=new Schema({
    userId:{type:String,required:true,maxlength:256},
    title:{type:String,required:true,maxlength:256},
    company:{type:String,required:true,maxlength:256},
    location:{type:String,required:true,maxlength:256},
    position:{type:String,required:true,maxlength:256},
    description:{type:String,required:true,maxlength:256},
    startDate:{type:Date,maxlength:256},
    endDate:Date,
    // selectedFile:String
});

module.exports=mongoose.model('Portfolio',portfolioSchema);