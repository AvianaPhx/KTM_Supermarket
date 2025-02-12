import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
    title: String,
    content: String,
    displayTime: Number,
    displayCondition: { type: String, enum: ['onPageLoad', 'onScroll', 'onClick'] },
    image: String
  });
  
module.exports = mongoose.model("Ad", adSchema);