import UserService from '../services/UserService.js';

const UserServiceObj = new UserService();

export const login = async (req, res) => {
  const {email, password} = req.body;
  const loginDTO = {email, password};
  let response;
  
  //calling method of service instance
  try{
    response = await UserServiceObj.login(loginDTO)
    return res.status(200).json({ ...response })
  }
  catch(err)
  {
    return res.status(500).json({ ...err })
  }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    const userDTO = { email, password, confirmPassword, firstName, lastName };
    let response;

    try{
      response = await UserServiceObj.signup(userDTO)
      return res.status(200).json({ success: true, message: response.message })
    }
    catch(err)
    {
      return res.status(500).json({ success: false, message: err.message })
    }
  };


  export const activateAccount = async (req, res) => {
    const { token } = req.body;
    let response;

    try{
      response = await UserServiceObj.activateAccount(token)
      return res.status(200).json({...response});
    }
    catch(err){
      return res.status(500).json({success: false, message: err.message});
    }
  };


export const fblogin = async (req, res) => {
  //console.log('FACEBOOK LOGIN REQ BODY', req.body);
  const { userID, accessToken } = req.body;
  const fbLoginDTO = { userID, accessToken }
  let response;

  try{
    response = await UserServiceObj.fblogin(fbLoginDTO)
    return res.status(200).json({...response});
  }
  catch(err){
    return res.status(500).json({success: false, message: err.message});
  }
  
};

export const getPetitionRecipients = async(req, res) => {
  const options = [ 'React-dom', 'ReactNative', 'JavaScript', 'CSS' ];
    
  return res.json({
    options
  });
}

export const getPetitionCategories = async(req, res) => {
  const options = [ 'Human Rights', 'Women Rights', 'Education', 'Environment', 'Others' ];
    
  return res.json({
    options
  });
}

export const getStartedPetitions = async(req,res) => {
  console.log(req.params.id);
  let response;
  try{
      response = await UserServiceObj.retrieveStartedPetitions(req.params.id);
      return res.status(200).json({...response});
  }
  catch(err)
  {
      return res.status(500).json({...err});
  }
}

export const submitPetition = async(req, res) => {
  
  const {userId, petitionCategory, petitionTitle, petitionRecipients, petitionText} = req.body;
  const petitionDTO = {userId, petitionCategory, petitionTitle, petitionRecipients, petitionText, fileName: req.file.filename};
  let response;

  try{
    response = await UserServiceObj.submitPetition(petitionDTO)
    return res.status(200).json({...response})
  }
  catch(err)
  {
    return res.status(500).json({
      success: false,
      message: "Failed to Submit petition"
    });
  }
}