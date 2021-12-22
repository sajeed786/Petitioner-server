import mongoose from 'mongoose'

const PetitionSchema = mongoose.Schema({
    petitionCategory: {
      type: String,
      required: true
    },
    petitionTitle: {
      type: String,
      required: true
    },
    decisionMakers: {
      type: Array,
      required: true
    },
    problemDetail: {
      type: String,
      required: true
    },
    supportingMedia: {
        type: String,
      },
    petitionStarter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    signatureCount: {
        type: Number
      },

    status: {
      type: String,
    },

    petitionSupporters: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],

    petitionUpdates: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetitionUpdate"
    }],

    petitionResponses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "PetitionResponse"
    }],

    createdAt: {
      type: Date,
      default: Date.now()
    },
  
  });
  
  export default mongoose.model("Petition", PetitionSchema);