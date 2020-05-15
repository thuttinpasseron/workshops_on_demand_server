require("dotenv").config();

const sg = require("sendgrid")(process.env.SENDGRID_API_KEY);

const sendEmail = ({ recipient, subject, content }) =>
  new Promise((resolve, reject) => {
    // add plain version for mobile device previews.
    const contentPlainText = content.replace(/<(?:.|\n)*?>/gm, "");
    const request = sg.emptyRequest({
      method: "POST",
      path: "/v3/mail/send",
      host: "api.sendgrid.com",
      body: {
        personalizations: [
          {
            to: [
              {
                email: recipient
              }
            ],
            subject
          }
        ],
        from: {
          name: "HPE Workshops On Demand",
          email: "pramod-reddy.sareddy@hpe.com"
        },
        content: [
          {
            type: "text/plain",
            value: contentPlainText
          },
          {
            type: "text/html",
            value: content
          }
        ]
      }
    });

    sg.API(request, (error, response) => {
      if (error) {
        console.log("Response", JSON.stringify(response, null, 2));
        console.log(
          "Email Error response received",
          JSON.stringify(error, null, 2)
        );
        return reject(error);
      }
      return resolve(recipient);
    });
  });

export default sendEmail;
