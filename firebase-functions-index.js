const functions = require('firebase-functions');
const {google} = require('googleapis');
const formidable = require('formidable');
const fs = require('fs');
const nodemailer = require('nodemailer');

const auth = new google.auth.GoogleAuth({
  keyFile: 'service-account.json',
  scopes: ['https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/gmail.send']
});
const drive = google.drive({version:'v3', auth});

const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{user:'YOUR_EMAIL@gmail.com', pass:'YOUR_APP_PASSWORD'}
});

exports.uploadVolunteer = functions.https.onRequest((req, res) => {
  if(req.method !== 'POST'){ return res.status(405).send('Method Not Allowed'); }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if(err){ return res.status(500).send(err); }

    try{
      const fileMeta = {name: files.resume.name, parents: ['YOUR_FOLDER_ID']};
      const media = {mimeType: files.resume.type, body: fs.createReadStream(files.resume.path)};
      const driveRes = await drive.files.create({requestBody:fileMeta, media:media});

      const mailOptions = {
        from:'YOUR_EMAIL@gmail.com',
        to:'ADMIN_EMAIL@gmail.com',
        subject:`New Volunteer Submission: ${fields.name}`,
        html:`<p>Name: ${fields.name}</p>
              <p>Email: ${fields.email}</p>
              <p>Location: ${fields.location}</p>
              <p>Resume: <a href="https://drive.google.com/file/d/${driveRes.data.id}/view">View File</a></p>`
      };
      await transporter.sendMail(mailOptions);

      res.status(200).json({message:'Success! File uploaded & admin notified', fileId: driveRes.data.id});
    }catch(error){
      console.error(error);
      res.status(500).send(error);
    }
  });
});

