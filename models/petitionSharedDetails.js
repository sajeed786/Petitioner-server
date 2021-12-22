import mongoose from 'mongoose'

const PetitionSharedSchema = mongoose.Schema({
    
    petitionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Petition"
    },
    petitionSigneeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sharingMedium: {
        type: String,
        required: true
    },
    timeOfSharing: {
        type: Date,
        default: Date.now()
    },
});

export default mongoose.model("PetitionShared", PetitionSharedSchema);