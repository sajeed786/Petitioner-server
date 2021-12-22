import mongoose from 'mongoose'

const DecisionMakerSchema = mongoose.Schema({
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
      designation: {
        type: String,
        required: true
      },
      organization: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      },
      verificationStatus: {
        type: String,
        required: true
      },

      imageUrl: {
        type: String,
      },
      petitionsAddressed: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
      }],
      petitionResponses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PetitionResponse"
      }],
      createdAt: {
        type: Date,
        default: Date.now()
      }
});

export default mongoose.model("DecisionMaker", DecisionMakerSchema);