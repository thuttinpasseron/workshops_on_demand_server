require('dotenv').config();
var net = require('net');

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const fromAddress = process.env.FROM_EMAIL_ADDRESS;
const session_type_workshops_on_demand =
  process.env.SESSION_TYPE_WORKSHOPS_ON_DEMAND;

let HOST,
  PORT = '';

const sendPostfixEmail = ({ location, recipient, subject, content }) => {
  if (location && location === 'grenoble') {
    HOST = process.env.POSTFIX_HOST_GRENOBLE;
    PORT = process.env.POSTFIX_PORT_GRENOBLE;
  } else if (location && location === 'mougins') {
    HOST = process.env.POSTFIX_HOST_MOUGINS;
    PORT = process.env.POSTFIX_PORT_MOUGINS;
  } else if (location && location === 'greenlake') {
    HOST = process.env.POSTFIX_HOST_GREENLAKE;
    PORT = process.env.POSTFIX_PORT_GREENLAKE;
  }
  return new Promise((resolve, reject) => {
    const client = new net.Socket();
    client.setTimeout(2000);
    const msg = `MAIL FROM: ${fromAddress} \nRCPT TO: ${recipient} \nDATA\nSubject: ${subject} \n${content}\n.\n`;
    client
      .connect(PORT, HOST, function () {
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        console.log('message', msg);
        console.log('From Address' + '*' + fromAddress + '*');
        // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client
        // setTimeout(() => {
        client.write(msg);
        // }, 30000);
      })
      .on('error', function (error) {
        console.log('ERROR' + error.message);
        client.destroy();
        return reject(error);
      })
      .on('data', function (data) {
        console.log('DATA: ' + data);
        client.destroy();
        // Close the client socket completely
        // setTimeout(() => {
        //   client.destroy();
        // }, 30000);
        return resolve(recipient);
      })
      .on('close', function () {
        console.log('Connection closed');
        return resolve(recipient);
      });
  });
};

const sendEmail = ({ sessionType, recipient, subject, content, proxy }) =>
  new Promise((resolve, reject) => {
    // add plain version for mobile device previews.
    const contentPlainText = content.replace(/<(?:.|\n)*?>/gm, '');
    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      host: 'api.sendgrid.com',
      body: {
        personalizations: [
          {
            to: [
              {
                email: recipient,
              },
            ],
            subject,
          },
        ],
        from: {
          name: `HPE DEV ${
            sessionType && sessionType === session_type_workshops_on_demand
              ? 'Workshops-on-Demand'
              : 'Challenge'
          }`,
          email: fromAddress,
        },
        content: [
          {
            type: 'text/plain',
            value: contentPlainText,
          },
          {
            type: 'text/html',
            value: content,
          },
        ],
      },
    });
    if (proxy === 'hackshack') {
      console.log('*******request from hack shack*********');
      sg.API(request, (error, response) => {
        if (error) {
          console.log('Response', JSON.stringify(response, null, 2));
          console.log(
            'Email Error response received',
            JSON.stringify(error, null, 2)
          );
          return reject(error);
        }
        return resolve(recipient);
      });
    } else {
      console.log('$$$$$$$$$$$$$request not from hack shack$$$$$$$$$$$$$$');
      return resolve(recipient);
    }
  });

export { sendEmail, sendPostfixEmail };
