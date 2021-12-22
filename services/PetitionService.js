import PetitionDAO from "../DataAccess/PetitionDAO.js";
import PetitionModel from "../models/petitionDetails.js";

export default class PetitionService {

    constructor() {
        this.PetitionDAOInstance = new PetitionDAO(PetitionModel);
    }

    async retrieveFilteredPetitions(filter) {

        let result;
        try{
            
            if(filter === "recent")
            {
                result = await this.PetitionDAOInstance.find({});
            }
            else if(filter === "victory")
            {
                result = await this.PetitionDAOInstance.find({});
            }
            else if(filter === "trending")
            {
                result = await this.PetitionDAOInstance.find({});
            }

            return result;
        }
        catch(err){
            throw err;
        }
    }
}