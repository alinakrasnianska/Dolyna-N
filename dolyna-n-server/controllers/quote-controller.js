const db = require('../database/db')
const jwt = require('jsonwebtoken')
const { DOLYNAKEY } = require('../config')
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


const us = "dolynan.grainsupplier@gmail.com"
const oauth2Client = new OAuth2(
   '525921555438-6onerkpkcb5h92920r2qrcelctofim2n.apps.googleusercontent.com',
   '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',
   'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
   refresh_token: '1//040PhZvHlX7anCgYIARAAGAQSNwF-L9IrVyM08mE0t4z4nX5SwXNATSVjKmIDBRJAxzXLQsS34ora7EEAC2zlcxC7CQLd8Q0w4tU'
});

const accessToken = oauth2Client.getAccessToken()

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      type: 'OAuth2',
      user: us,
      clientId: '525921555438-6onerkpkcb5h92920r2qrcelctofim2n.apps.googleusercontent.com',
      clientSecret: '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',
      refreshToken: '1//040PhZvHlX7anCgYIARAAGAQSNwF-L9IrVyM08mE0t4z4nX5SwXNATSVjKmIDBRJAxzXLQsS34ora7EEAC2zlcxC7CQLd8Q0w4tU',
      accessToken: accessToken
   },
});






class QuoteController {
   req_quote = async (req, res) => {
      const cart = req.body
      const new_cart = JSON.parse(cart.cart)

      const token = req.headers.authorization;

      if (!token) {
         return res.status(401).json({ error: 'Token is uncought' });
      } else {
         const decoded = jwt.verify(token, DOLYNAKEY);
         //new_cart - текущая корзина decoded- данні юзера

         const user = await db.query('UPDATE users SET last_order = $1 WHERE _id = $2 RETURNING *', [JSON.stringify(new_cart), decoded.id])

         const htmlString1 = `
            <!DOCTYPE html>
               <html lang="en">
               <head>
                  <title>NEW REQUEST</title>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap" rel="stylesheet">
               </head>
               <body  style="width: 600px;margin: 0;">
                  <header style="width: 100%; height: 83px;box-sizing: border-box; padding: 10px 0 0 190px; ">
                     <img style="width: 200px;"
                        src='https://lh3.googleusercontent.com/fife/ALs6j_G2zdGfD8yI98EsJTucVJpo7wAO_ppYeN8aJo9lqbQZGrwcOk64eXE8y4Rfv3qwodu_swkKwhaQm1J1Y8k43SCuzozTMHxcBDCY44H5r9nijM39W2QdeXGKW4SAXqHrH31X0wPWtTPUmyrQHabh_1Dw6YRMuTFBmrffAzqlegvaucicPMQBRfE7tESnpfKSsJsDVFnYFR7ZH8jZjZHmG_09P4QIa7DJz-_FY-6tCmdlwIyMVa-R6ub-1iDIzPgSR55Klix5RyiNkkU4p1eMOTmN9oTrmWxns_AJnwk5dkGrjqJu9Q4v9Rh2t9uST0utBTu-YFMBUgcE5_jymG-QXt_XGn7reF6xyUJZeYYBRYQ0iKNj7VDYToBHkfdhf7GpeakiD11Isb-IX6PgUx3j9lUeJNcKWInhO8pWJVmltMt6A8mYej1p9aKds8GrUzf6Pjk4CCL-0JwdOULPzNou0qSao42bn3BhtiPYBwkNuFneCN8RSGuzMSAL-G5d6JMKUKifCsB3nRwJ7c4aic8JBwhAdHDEzIIDtH9-9OeuzA5YVlId3Bt737ksReuWv56zpCqY58Ccmad0TgIVqBA4inV65CTmMhOOVbxVmnc2JhPY12QGEWsRCy5GmOG9bDU5oQUR885M1Pn6HVsueMM2h5S71xcVcXVIL4Y99_7KXhCeJqG5wWu6q3aAJHBe4EpsMje63Sq7k4v2Jm_msC_0ZC1JLrwjyemnk76MVmTM8pAc3p49bS-D8QE6enxyiNnoKp0IdbBMyRoIDMU9q-Iz9iyR7-bqbADQyC7ORmTXo3bvaBOVNTrKHEPB50FllHXdDBrBX8nzGgmYuhZ2iNvbM3-788NmSI8uRGmZzYSiEpmBBOVx8517CAd7Vgp6Hdm7_Pw0urEqcQXw8hPiaQsy74EIx6g1-_qco6OuawTkJrJdmaXoarsxvfOSsrgZuVnIzcqPKfD1hOvHaO9Clg320OC3FRW9uxfwHEwzW30FQUfmKbjsM2UHlL-vZYIsTWwmjqX6SWAAAhUlQYIjtaBSZbwKPxW6mZiqOk-QSs-7uLuys3_tXuB9bsoKVgscNkflAWPrMqiefhMD8jgKDP67B38ImgvUiYX51NgQpNNCZpw2wV-qoFxy7TVaa17d4gXlNTRVYLAJucEsfkbh-62f8h9QF1wsf-Uz5CLw8rLjb7Lrbz2oM5tIfy3XafOVhsvZokIYGwNLMlfk8UW-yhp835tKdORxA7laksERKqYLooEToEr3EDIIOSvUUTEUxnmniLxVgu9_QI5zRk0hZWJUdqhc8qfONqfWaeQzmy3kX8jQ4I00NbRf9Pymcc-vO4iM00wwS60E5_dup0nVjwWbQXvAvzqVIOPOU7R2XZu5gFwjMRkHN-pDUAaEM59RqewsA4uvo8cTZ2IhiFTXMNQ-BvTXJmI6brR4oIrIqWSkF_XKZbJADOrUEEA7f4YRWUU4X2Ds7oVogToSEk5X1roTFGcb9Jz66j8N36Q5wZYzoWiSxR_nKnOGa8TBfUfn_9PCdrRs_CgteHrOXbBu9hFiY52Kumn-zlQomzIgKKXbaAX0j1gzRCY7c6asA0MOVfQbeRxnMHQH5iqhxtYX-tfa7_TAyBZrX9RyAYDZvBrAzfuTlQuBtAWz8zJVl_0W1QFj5_yrEMAo12TzSiaPpQmcAw4GWpvzfCJqZyGPXqyTOEEx8oTNICB_s0PiHnjwR_OqAqD3FgeEJabn9qRjMWvZq2A_zr5642caJxttJnAECN3noHdJk9FVl2Lgxt6bCQ=w1920-h957'
                        alt="dolyna-n">
                  </header>
                  <div style="width: 100%; height:2px; background: #D9D9D9;"></div>
                  <main style="padding :18px 18px 55px 18px; box-sizing: border-box;">
                     <div
                     style="color:#2A2C34; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 20px;  ">
                     NEW REQEST
                     </div>
                     <div style="height: 20px;"></div>
                     <section
                        style="width: 94%;background: #2A2C34; border-radius: 15px; box-sizing: border-box; padding:11px 47px 28px 18px; color:#ffffff; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">
                        <div style="font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">from: <span style="color:#FFB75E; "> ${decoded.name}</span></div>
                        <div style="height: 24px;"></div>
                     
                        ${new_cart.map(e => (
                           `<div><span>${e.name}</span> <span style="padding: 0 0 0 187px">${e.quantity}kg</span></div>`
                        )).join('')}
                     
                        <div style="height: 24px;"></div>
                        <div style="font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">email: <span style="color:#FFB75E; "> ${decoded.email}</span></div>
                        <div style="font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">phone: <span style="color:#FFB75E; "> ${decoded.phone}</span></div>
                     </section>
                  </main>
                  
               </body>
               </html>
         
         
         `

         const htmlString2 = `
            <!DOCTYPE html>
               <html lang="en">

               <head>
                  <title>USER MAIL</title>
                  <link rel="preconnect" href="https://fonts.googleapis.com">
                  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                  <link href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap" rel="stylesheet">
               </head>

               <body style="width: 600px;margin: 0;">
                  <header style="width: 100%; height: 83px;box-sizing: border-box; padding: 10px 0 0 190px; ">
                     <img style="width: 200px;"
                        src='https://lh3.googleusercontent.com/fife/ALs6j_G2zdGfD8yI98EsJTucVJpo7wAO_ppYeN8aJo9lqbQZGrwcOk64eXE8y4Rfv3qwodu_swkKwhaQm1J1Y8k43SCuzozTMHxcBDCY44H5r9nijM39W2QdeXGKW4SAXqHrH31X0wPWtTPUmyrQHabh_1Dw6YRMuTFBmrffAzqlegvaucicPMQBRfE7tESnpfKSsJsDVFnYFR7ZH8jZjZHmG_09P4QIa7DJz-_FY-6tCmdlwIyMVa-R6ub-1iDIzPgSR55Klix5RyiNkkU4p1eMOTmN9oTrmWxns_AJnwk5dkGrjqJu9Q4v9Rh2t9uST0utBTu-YFMBUgcE5_jymG-QXt_XGn7reF6xyUJZeYYBRYQ0iKNj7VDYToBHkfdhf7GpeakiD11Isb-IX6PgUx3j9lUeJNcKWInhO8pWJVmltMt6A8mYej1p9aKds8GrUzf6Pjk4CCL-0JwdOULPzNou0qSao42bn3BhtiPYBwkNuFneCN8RSGuzMSAL-G5d6JMKUKifCsB3nRwJ7c4aic8JBwhAdHDEzIIDtH9-9OeuzA5YVlId3Bt737ksReuWv56zpCqY58Ccmad0TgIVqBA4inV65CTmMhOOVbxVmnc2JhPY12QGEWsRCy5GmOG9bDU5oQUR885M1Pn6HVsueMM2h5S71xcVcXVIL4Y99_7KXhCeJqG5wWu6q3aAJHBe4EpsMje63Sq7k4v2Jm_msC_0ZC1JLrwjyemnk76MVmTM8pAc3p49bS-D8QE6enxyiNnoKp0IdbBMyRoIDMU9q-Iz9iyR7-bqbADQyC7ORmTXo3bvaBOVNTrKHEPB50FllHXdDBrBX8nzGgmYuhZ2iNvbM3-788NmSI8uRGmZzYSiEpmBBOVx8517CAd7Vgp6Hdm7_Pw0urEqcQXw8hPiaQsy74EIx6g1-_qco6OuawTkJrJdmaXoarsxvfOSsrgZuVnIzcqPKfD1hOvHaO9Clg320OC3FRW9uxfwHEwzW30FQUfmKbjsM2UHlL-vZYIsTWwmjqX6SWAAAhUlQYIjtaBSZbwKPxW6mZiqOk-QSs-7uLuys3_tXuB9bsoKVgscNkflAWPrMqiefhMD8jgKDP67B38ImgvUiYX51NgQpNNCZpw2wV-qoFxy7TVaa17d4gXlNTRVYLAJucEsfkbh-62f8h9QF1wsf-Uz5CLw8rLjb7Lrbz2oM5tIfy3XafOVhsvZokIYGwNLMlfk8UW-yhp835tKdORxA7laksERKqYLooEToEr3EDIIOSvUUTEUxnmniLxVgu9_QI5zRk0hZWJUdqhc8qfONqfWaeQzmy3kX8jQ4I00NbRf9Pymcc-vO4iM00wwS60E5_dup0nVjwWbQXvAvzqVIOPOU7R2XZu5gFwjMRkHN-pDUAaEM59RqewsA4uvo8cTZ2IhiFTXMNQ-BvTXJmI6brR4oIrIqWSkF_XKZbJADOrUEEA7f4YRWUU4X2Ds7oVogToSEk5X1roTFGcb9Jz66j8N36Q5wZYzoWiSxR_nKnOGa8TBfUfn_9PCdrRs_CgteHrOXbBu9hFiY52Kumn-zlQomzIgKKXbaAX0j1gzRCY7c6asA0MOVfQbeRxnMHQH5iqhxtYX-tfa7_TAyBZrX9RyAYDZvBrAzfuTlQuBtAWz8zJVl_0W1QFj5_yrEMAo12TzSiaPpQmcAw4GWpvzfCJqZyGPXqyTOEEx8oTNICB_s0PiHnjwR_OqAqD3FgeEJabn9qRjMWvZq2A_zr5642caJxttJnAECN3noHdJk9FVl2Lgxt6bCQ=w1920-h957'
                        alt="dolyna-n">
                  </header>
                  <div style="width: 100%; height:2px; background: #D9D9D9;"></div>
                  <main style="padding :18px 18px 55px 18px; box-sizing: border-box;">
                     <div
                        style="color:#2A2C34; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 20px;  ">
                        Dear ${decoded.name},
                        <br><br>
                        Thank you for your order.<br>
                        We appreciate the trust you have placed in us.<br>
                        Please do not hesitate to get in touch with us for any of your<br>
                        future needs.<br><br>
                        Yours quote:<br>

                     </div>
                     <section
                        style="width: 94%;background: #2A2C34; border-radius: 15px; box-sizing: border-box; padding:41px 47px 46px 29px; color:#ffffff; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 18px; ">
                        ${new_cart.map(e => (
                           `<div><span>${e.name}</span> <span style="padding: 0 0 0 187px">${e.quantity}kg</span></div>`
                        )).join('')}
                     
                     </section>

                     <div style="color:#2A2C34; font-family: 'Jura', sans-serif; font-optical-sizing: auto; font-weight: 500; font-style: normal; font-size: 16px; line-height: 20px; padding:20px 0 0 0 ">
                        We will contact you shortly
                     </div>
                  
                  </main>
               

               </body>

               </html>
         
         
         `

         const mailOptions = {
            from: us,
            to: us,
            subject: 'NEW REQUEST',
            html: htmlString1
         };

         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
               res.json({ message: 'Email sent: ' + info.response })
            }
         });

         const mailOptions2 = {
            from: us,
            to: decoded.email,
            subject: 'Dolyna-N confirm letter',
            html: htmlString2
         };

         transporter.sendMail(mailOptions2, function (error, info) {
            if (error) {
               console.log(error);
            } else {
               console.log('Email sent: ' + info.response);
               res.json({ message: 'Email sent: ' + info.response })
            }
         });



         res.json({ message: user })

      }

   }
}

module.exports = new QuoteController() 