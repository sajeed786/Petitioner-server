import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

import DecisionMakerDAO from "../DataAccess/DecisionMakerDAO.js";
import DecisionMakerModel from "../models/decisionMakerDetails.js";

export default class DecisionMakerService {

    constructor() {
        this.DecisionMakerDAOInstance = new DecisionMakerDAO(DecisionMakerModel);
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.mobile = '';
        this.password = '';
        this.designation = '';
        this.organization = '';
        this.otp = 0;
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            service: 'Gmail',
            
            auth: {
                user: 'thepetitioner70@gmail.com', //! Add email id
                pass: 'Tpf#78692#',  //! Email id's password
            }
            
        });
    }

    // async generateOTP()
    // {
    //         this.otp = Math.random();
    //         this.otp = this.otp * 1000000;
    //         this.otp = parseInt(this.otp);
    //         console.log(this.otp);
    // }

    async register(decisionMakerDTO) {

        const { firstname, lastname, email, mobile,password, designation, organization } = decisionMakerDTO;
        console.log("in register service");
        try{

            let userEmail = await this.DecisionMakerDAOInstance.findOne(({email: email}));
            let userMobile = await this.DecisionMakerDAOInstance.findOne(({mobile: mobile}));

            if(userEmail || userMobile) {
                throw {name: "ValidationError", message: "Already Exists"};
            }
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(password, salt);

            this.firstname = firstname;
            this.lastname= lastname;
            this.email= email;
            this.mobile= mobile;
            this.password= secPass;
            this.designation= designation;
            this.organization= organization;

            let decisionMaker = await this.DecisionMakerDAOInstance.create({
                name: `${this.firstname} ${this.lastname}`,
                email: this.email,
                password: this.password,
                mobile: this.mobile,
                verificationStatus: 'unverified',
                designation: this.designation,
                organization: this.organization
            });
            console.log(decisionMaker);
            return {success: "true", DecisionMakerProfile: decisionMaker};
             //waiting to receive a new otp
            // this.otp = Math.random();
            // this.otp = this.otp * 1000000;
            // this.otp = parseInt(this.otp);
            // console.log(this.otp);
            
            // var mailOptions = {
            //     from: 'thepetitioner70@gmail.com',
            //     to: this.email,
            //     subject: "Otp for registration is: ",
            //     html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + this.otp + "</h1>" // html body
            // };
            
            // let info;
            // try{
            //     info = await this.transporter.sendMail(mailOptions);

            //     console.log('Message sent: %s', info.messageId);
            //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        
            //     return {success: "true", message: "OTP has been sent to your email"};
            // }      
            // catch(err)
            // {
            //     throw err;
            // }      
            
        } 
        catch (error) {
            throw error;
        }
    }

    async verifyEmailWithOTP(receivedOTP) {

        console.log(receivedOTP + "    " + this.otp);
        this.otp = this.otp.toString();

        if (receivedOTP == this.otp) {


            try{
                let decisionMaker = await this.DecisionMakerDAOInstance.create({
                    name: `${this.firstname} ${this.lastname}`,
                    email: this.email,
                    password: this.password,
                    mobile: this.mobile,
                    designation: this.designation,
                    organization: this.organization
                });
                console.log(decisionMaker);
                return {success: "true", DecisionMakerProfile: decisionMaker};
            }
            catch(err)
            {
                throw err;
            }
        }
        else {
            throw {Success: "false", message: "You have entered a wrong OTP!!"};
        }
    }

    async resendOTP() {

        await generateOTP();

        var mailOptions = {
            to: this.email,
            subject: "Otp for registration is: ",
            html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + this.otp + "</h1>" // html body
        };
        
        try{
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw error;
                }
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
               
                return {success: "true", message: "OTP has been sent to your email"};
            });
        }
        catch(err)
        {
            throw err;
        }
    }
}