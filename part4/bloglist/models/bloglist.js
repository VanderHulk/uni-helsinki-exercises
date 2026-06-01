const mongoose = require('mongoose')

const bloglistSchema = new mongoose.Schema(
  {
    url: String,
    title: String,
    author: String,        
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likes: { type: Number, default: 0 },
  },
  {
    timestamps: true
  }
)

bloglistSchema.set('toJSON', {
  transform: (document, returnedObject) =>{
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('BlogList', bloglistSchema)