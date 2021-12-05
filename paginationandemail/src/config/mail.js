const nodemailer=require('nodemailer');



module.exports=nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "d2bd99a8972a98",
      pass: "e52bbba40cf957",
    },
  });