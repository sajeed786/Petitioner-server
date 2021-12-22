import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import sgMail from '@sendgrid/mail';
import UserDAO from "../DataAccess/UserDAO.js";
import PetitionDAO from "../DataAccess/PetitionDAO.js";
import UserModel from "../models/user.js";
import PetitionModel from "../models/petitionDetails.js";

export default class UserService {

    constructor(){
        this.userDAOInstance = new UserDAO(UserModel)
        this.petitionDAOInstance = new PetitionDAO(PetitionModel)
    }

    //--------User authentication functions-----------------
    async login(loginInfo) {

        const {email, password} = loginInfo
        console.log("Service: " + loginInfo);
        try {
            const existingUser = await this.userDAOInstance.findOne({ email });
        
            if (!existingUser) throw { 
                name: "ValidationError",
                message: "User doesn't exist" 
            };
        
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        
            if (!isPasswordCorrect) throw { 
                name: "ValidationError",
                message: "Invalid Credentials" 
            };
        
            const token = jwt.sign({
                email: existingUser.email, 
                id: existingUser._id }, 
                process.env.JWT_SECRET, 
                { expiresIn: "1h" });
        
            return { resultData: existingUser, token };

          } catch (err) {
            return err;
          }
    }

    async signup(userRecord) {

      const { email, password, confirmPassword, firstName, lastName } = userRecord;

        try {
            const existingUser = await this.userDAOInstance.findOne({ email });
        
            if (existingUser) throw { name: 'DuplicateErr', message: "User already exists" };
            
            if(password !== confirmPassword)
                  throw {name: 'PasswordErr', message: "Passwords don't match" };
      
            const token = jwt.sign(
              {
                firstName,
                lastName,
                email,
                password
              },
              process.env.JWT_ACTIVATE_ACCOUNT,
              {
                expiresIn: '5m'
              }
            );
        
            const emailData = {
              from: process.env.EMAIL_FROM,
              to: email,
              subject: 'Account activation link',
              html: `
                        <h1>Please use the following to activate your account. The following link is valid only for 5 minutes from now</h1>
                        <p>${process.env.CLIENT_URL}/user/activate/${token}</p>
                        <hr />
                        <p>This email may contain sensetive information</p>
                        <p>${process.env.CLIENT_URL}</p>
                    `
            };
        
            const sent = await sgMail.send(emailData)
            
            return {
                  name: 'EmailSuccess',
                  message: `Email has been sent to ${email}`
                };
        
          } catch (error) {
            console.log(error.name);
            throw error;
          }
    }

    async activateAccount(token) {

        if (token) {
        
          try {

            jwt.verify(token, process.env.JWT_ACTIVATE_ACCOUNT);

            const { firstName, lastName, email, password } = jwt.decode(token);

            console.log(email);
            const hashedPassword = await bcrypt.hash(password, 12);

            const resultData = await this.userDAOInstance.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`});
        
            return {
                resultData,
                success: true,
                message: 'Signup success. Please Log in to Continue'
            };
          }catch(error){
            if(error.name === 'TokenExpiredError')
              error.message = 'Link has Expired. Try Again';
            
            throw error;
          }
        } 
        else {
            return {
              success: false,
              message: 'Activation failed'
            };
        }
    }
    
    //social login via facebook
    async fblogin(fbLoginInfo) {
      const { userID, accessToken } = fbLoginInfo;

      const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

      try{
        const response = await fetch(url, {
          method: 'GET'
        });
        
        if(response)
        {
              const fbUser = await response.json();
              const { email, name } = fbUser;
              const imageUrl = fbUser.picture.data.url;
            
              const existingUser = await this.userDAOInstance.findOne({ email });

              if (existingUser) {
                const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
                  expiresIn: '1h'
                });
                
                return {
                  resultData: existingUser,
                  token
                };
              } 
              let password = email + process.env.JWT_SECRET;
              const hashedPassword = await bcrypt.hash(password, 12);
              const resultData = await this.userDAOInstance.create({ name, email, imageUrl, password: hashedPassword });
              const token = jwt.sign(
                  { id: resultData._id },
                  process.env.JWT_SECRET,
                  { expiresIn: '1h' }
                );
              
              return {
                  resultData,
                  token
                };     
        }
      }catch(error){
          throw error;
        }
    }
    //-----------------authentication end--------------------

    async retrieveStartedPetitions(userId) {

      try{
        const result = await this.petitionDAOInstance.find({_id: userId});
        console.log(result);
        return {success: "true", filteredPetitions: result};
      }
      catch(err)
      {
        throw err;
      }
    }

    //---------------save petition to database-----------------
    async submitPetition(petitionRecord) {

      const {userId, petitionCategory, petitionTitle, petitionRecipients, petitionText, fileName} = petitionRecord;

      try{

        const petitionData = {
          petitionCategory,
          petitionTitle,
          decisionMakers: petitionRecipients,
          problemDetail: petitionText,
          supportingMedia: fileName,
          petitionStarter: userId
        }
    
        const resultData = await this.petitionDAOInstance.create({...petitionData});
        //console.log(resultData);
    
        return {
          resultData,
          success: true,
          message: "Petition saved successfully"
        };
    
      }catch(error){
        console.log(error.message);
        throw error;
      }
    }
}