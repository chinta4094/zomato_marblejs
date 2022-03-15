import nodeMailer from 'nodemailer'
import 'dotenv/config'

//the arrow function used to send the mail to register emialid
export = (userName: any,toEmail: any) => {
    const fromEmail = process.env.ACCESS_EMAIL_ID
    const password = process.env.ACCESS_PASSWORD_ID
    const transporter = nodeMailer.createTransport({
        service : 'gmail',
        auth : {
            user : fromEmail,
            pass : password
        }
    });
    
    var mailOptions = {
        from : fromEmail,
        to : toEmail,
        subject : 'Zomato | Signup Succesfully ',
        text : `Hi ${userName} , You are Successfully Registered `
    }
    
    transporter.sendMail(mailOptions , (err: any) => {
        if(err){
            console.log(err)
        }else{
            console.log('Email send To : ' + mailOptions.to)
        }
    })
}