import MongooseService from "./MongooseService.js";

class PetitionDAO extends MongooseService {

    constructor(Model)
    {
        super(Model);
    }
}

export default PetitionDAO