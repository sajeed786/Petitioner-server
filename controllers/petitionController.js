import PetitionService from '../services/PetitionService.js'

const PetitionServiceObj = new PetitionService();

export const fetchTrendingPetitions = async(req, res) => {
    
    let response;
    try{
        response = await PetitionServiceObj.retrieveFilteredPetitions("trending");
        res.status(200).json({...response});
    }
    catch(err)
    {
        res.status(500).json({...err});
    }
}

export const fetchRecentPetitions = async(req, res) => {
    let response;
    try{
        response = await PetitionServiceObj.retrieveFilteredPetitions("recent");
        res.status(200).json({...response});
    }
    catch(err)
    {
        res.status(500).json({...err});
    }
}

export const fetchVictoriedPetitions = async(req, res) => {
    let response;
    try{
        response = await PetitionServiceObj.retrieveFilteredPetitions("victory");
        res.status(200).json({...response});
    }
    catch(err)
    {
        res.status(500).json({...err});
    }
}

