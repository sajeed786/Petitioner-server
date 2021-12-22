import DecisionMakerService from "../services/DecisionMakerService.js";

const DecisionMakerServiceObj = new DecisionMakerService();

export const registerDecisionMaker = async(req, res) => {
    console.log('in register fn');
    console.log(req.body);

    const { firstname, lastname, email, mobile,password, designation, organization } = req.body;
    const decisionMakerDTO = { firstname, lastname, email, mobile,password, designation, organization };
    let response;

    try{
        response = await DecisionMakerServiceObj.register(decisionMakerDTO);
        console.log(response);
        return res.status(200).json({...response});
    }
    catch(err)
    {
        return res.status(500).json({...err});
    }
}

export const verifyDMEmail = async(req, res) => {
    const {otp} = req.body;
    console.log('controller: ' + otp)
    let response;

    try{
        response = await DecisionMakerServiceObj.verifyEmailWithOTP(otp);
        return res.status(200).json({...response});
    }
    catch(err)
    {
        return res.status(500).json({...err});
    }

}

export const resendOTP = async(req,res) => {
    let response;

    try{
        response = await DecisionMakerServiceObj.resendOTP();
        return res.status(200).json({...response});
    }
    catch(err)
    {
        return res.status(500).json({...err});
    }
}
