import mongoose from 'mongoose'

const PetitionResponseSchema = mongoose.Schema({
    
    title: {
        type: String,
    },
    response: {
        type: String,
        required: true
    },
    petitionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
    },
    decisionMakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DecisionMaker"
    },
    timeOfResponse: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model("PetitionResponse", PetitionResponseSchema);