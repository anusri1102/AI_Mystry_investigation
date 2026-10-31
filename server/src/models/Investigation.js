import mongoose from 'mongoose';
const schema=new mongoose.Schema({mysteryId:{type:mongoose.Schema.Types.ObjectId,ref:'Mystery',required:true,index:true},sessionId:{type:String,required:true,index:true},viewedEvidenceIds:[String],investigationNotes:{type:String,maxlength:3000,default:''},status:{type:String,enum:['ACTIVE','COMPLETED'],default:'ACTIVE'},startedAt:{type:Date,default:Date.now},completedAt:Date},{timestamps:true});
schema.index({mysteryId:1,sessionId:1},{unique:true});export default mongoose.model('Investigation',schema);
