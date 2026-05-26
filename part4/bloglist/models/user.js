const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 3,
      required: true,
      unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogList' // from the model name - mongoose.model('BlogList', bloglistSchema)
      }
    ]
  },
  {
    timestamps: true
  }
)

// affects output like response.json(user)
// affects what gets sent out in responses
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash  
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User