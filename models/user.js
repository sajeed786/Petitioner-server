import mongoose from 'mongoose'

const UserSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
    },
    role: {
      type: String,
    },

    petitionsSigned: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Petition"
    }],

    createdAt: {
      type: Date,
      default: Date.now()
    },
  
  });
  
  // export model user with UserSchema
  export default mongoose.model("User", UserSchema);

  