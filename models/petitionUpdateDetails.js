import mongoose from 'mongoose'

const PetitionUpdateSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    updateType: {
        type: String,
        required: true
    },
    supportingMedia: {
        type: String,
    },
    petitionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
    },
    timeOfUpdate: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model("PetitionUpdate", PetitionUpdateSchema);