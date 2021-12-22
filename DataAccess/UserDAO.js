import MongooseService from "./MongooseService.js";

class UserDAO extends MongooseService {

    constructor(Model)
    {
        super(Model);
    }
}

export default UserDAO