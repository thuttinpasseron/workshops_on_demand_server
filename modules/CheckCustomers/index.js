import cron from 'cron';
import models from '../../models';
import createEmailBody from '../Email/createEmailBody';
import { sendEmail, sendPostfixEmail } from '../Email';
import dotenv from 'dotenv';

dotenv.config();

const { CronJob } = cron;

const feedback_workshop_url = process.env.FEEDBACK_WORKSHOP_URL;
const feedback_challenge_url = process.env.FEEDBACK_CHALLENGE_URL;
const session_type_workshops_on_demand =
  process.env.SESSION_TYPE_WORKSHOPS_ON_DEMAND;
const session_type_coding_challenge = process.env.SESSION_TYPE_CODING_CHALLENGE;
const getHoursLeft = (ends) => {
  const oneHour = 1 * 60 * 60 * 1000;
  const endsDate = new Date(ends);
  const today = new Date();
  return Math.round((endsDate.getTime() - today.getTime()) / oneHour);
};

const getDates = () => {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(
    parseFloat(endDate.getHours()) + parseFloat(process.env.DURATION)
  );
  return { startDate, endDate };
};

const checkCustomer = () => {
  models.customer
    .findAll({ include: [{ all: true, nested: true }] })
    .then((customers) =>
      customers.map(async (customer) => {
        const { dataValues } = customer;
        const customerStatus = dataValues.active;
        const location = dataValues.location;
        const sessionType = dataValues.sessionType;
        const hoursLeft = getHoursLeft(dataValues.endDate);

        let workshop, studentId, jupyterEmail;

        if (
          sessionType &&
          (sessionType === session_type_workshops_on_demand ||
            sessionType === session_type_coding_challenge)
        ) {
          // fetch the customer requested workshop from workshops table
          workshop = await models.workshop.findOne({
            where: { name: dataValues.sessionName },
          });
        }
        // commented as challenges are added in workshops table
        // else if (
        //   sessionType &&
        //   sessionType === session_type_coding_challenge
        // ) {
        //   // fetch the customer requested challenge from challenges table
        //   challenge = await models.challenge.findOne({
        //     where: { name: dataValues.sessionName },
        //   });
        // }
        if (location && location === process.env.JUPYTER_GRENOBLE_LOCATION) {
          jupyterEmail = process.env.POSTFIX_EMAIL_GRENOBLE;
          studentId = dataValues.studentId - process.env.NO_OF_STUDENT_ACCOUNTS;
        } else if (
          location &&
          location === process.env.JUPYTER_MOUGINS_LOCATION
        ) {
          jupyterEmail = process.env.POSTFIX_EMAIL_MOUGINS;
          studentId = dataValues.studentId;
        } else if (
          location &&
          location === process.env.JUPYTER_GREENLAKE_LOCATION
        ) {
          jupyterEmail = process.env.POSTFIX_EMAIL_GREENLAKE;
          studentId =
            dataValues.studentId - 2 * process.env.NO_OF_STUDENT_ACCOUNTS;
        }
        // Send welcome email.
        if (!dataValues.lastEmailSent && studentId != null && studentId > 0) {
          console.log(
            'send email to postfix to prepare a student account',
            jupyterEmail
          );
          var mailContent = `${dataValues.notebook}`;
          return sendPostfixEmail({
            location: location,
            recipient: jupyterEmail,
            subject: `CREATE ${studentId} ${dataValues.id} ${dataValues.email}`,
            content: mailContent,
          })
            .then(() => {
              let subject,
                heading,
                content,
                enjoyWorkshop = '';
              if (
                sessionType &&
                sessionType === session_type_workshops_on_demand
              ) {
                subject = 'HPE DEV Workshops-on-Demand';
                heading = 'Welcome to HPE DEV Workshops-on-Demand!';
                content = `Hello, ${dataValues.name}! <br> <br>
                In a moment, you will receive a second email providing you with the details required to access the Hack Shack <b>${dataValues.sessionName}</b> workshop.<br/><br/>
                To ensure a successful experience with this workshop, please take a moment to review this <a href="https://hackshack.hpedev.io/${workshop.replayLink}">video replay</a> of the live workshop and 
                read the detailed instructions found in this <a href="https://developer.hpe.com/blog/boost-skills-with-free-on-demand-software-technology-workshops">blog post</a>. We also advise that you 
                <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated <a href="${process.env.SLACK_CHANNEL_WORKSHOPS_ON_DEMAND}">#hpe-workshops-on-demand</a> 
                channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>
                <b>NOTE:</b> Your workshop access will expire in ${dataValues.hours} hours.
                Please make sure you save your workshop work before you lose the access to your Jupyter Notebook.
                <br/><br/>`;
                enjoyWorkshop = 'Enjoy the workshop!';
              } else if (
                sessionType &&
                sessionType === session_type_coding_challenge
              ) {
                subject = 'HPE DEV Challenge';
                heading = 'Welcome to HPE DEV Challenge!';
                content = `Hello, ${dataValues.name}! <br> <br>
                In a moment, you will receive a second email providing you with the details required to access the Hack Shack <b>${dataValues.sessionName}</b> challenge.<br/><br/>
                To ensure a successful experience with this challenge, please take a moment to review this <a href="https://hackshack.hpedev.io/${workshop.replayLink}">video replay</a> of the live workshop and 
                read the detailed instructions found in this <a href="https://developer.hpe.com/blog/hpe-dev-hack-shack-coding-challenges-are-you-ready-to-compete">blog post</a>. We also advise that you 
                <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated <a href="${process.env.SLACK_CHANNEL_CHALLENGES}">#hpe-hackshack-challenges</a> 
                channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>
                <b>NOTE:</b> Your challenge access will expire in ${dataValues.hours} hours.
                Please make sure you save your challenge work before you lose the access to your Jupyter Notebook.
                <br/><br/>`;
                enjoyWorkshop = 'Enjoy the challenge!';
              }
              sendEmail({
                sessionType: sessionType,
                recipient: dataValues.email,
                subject: subject,
                content: createEmailBody({
                  heading: heading,
                  content: content,
                  enjoyWorkshop: enjoyWorkshop,
                }),
                proxy: dataValues.proxy,
              });
            })
            .then(() => {
              customer.update({
                lastEmailSent: 'welcome',
              });
              console.log('sent welcome email');
            })
            .catch((error) => {
              console.log('Promise Rejected', error);
            });
        }

        // Send credentilas as soon as there are ready.
        if (customerStatus && dataValues.lastEmailSent === 'welcome') {
          let subject,
            heading,
            content,
            buttonLabel,
            registerMore,
            enjoyWorkshop;
          if (sessionType && sessionType === session_type_workshops_on_demand) {
            subject = 'HPE DEV Workshops-on-Demand credentials';
            heading = 'Your HPE DEV Workshops-on-Demand credentials';
            content = `${dataValues.name}, <br/> <br/>The clock has started! Begin your Hack Shack <b>${dataValues.sessionName}</b> workshop using the credentials below.
             Remember, you have <b>4 hours</b> from now to finish your workshop. If you do not currently have a dedicated 4-hour period in which to complete it, you can re-register at a later time.<br/><br/> 
            <b>NOTE:</b> You may have to click the Launch Server button once you log into your Jupyter student account.<br/><br/>
            Use below credentials to start the workshop:<br/><br/>
            <b>User Name: ${dataValues.student.username}</b><br/>
            <b>Password: ${dataValues.student.password}</b><br/>`;
            registerMore = `Remember, to ensure a successful experience with this workshop, please take a moment to review this <a href="https://hackshack.hpedev.io/${workshop.replayLink}">video replay</a> of the live workshop. You may also find this <a href="https://developer.hpe.com/blog/boost-skills-with-free-on-demand-software-technology-workshops">blog post</a> detailing instructions on how to interact with this workshop helpful. We also advise that you 
            <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated <a href="${process.env.SLACK_CHANNEL_WORKSHOPS_ON_DEMAND}">#hpe-workshops-on-demand</a> 
            channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>`;
            buttonLabel = 'Start Workshop';
            enjoyWorkshop = 'Enjoy the workshop!';
          } else if (
            sessionType &&
            sessionType === session_type_coding_challenge
          ) {
            subject = 'HPE DEV Challenge credentials';
            heading = 'Your HPE DEV Challenge credentials';
            content = `${dataValues.name}, <br/> <br/>The clock has started! Begin your Hack Shack <b>${dataValues.sessionName}</b> challenge using the credentials below.
            Remember, you have <b>4 hours</b> from now to finish your challenge. If you do not currently have a dedicated 4-hour period in which to complete it, you can re-register at a later time.<br/><br/> 
           <b>NOTE:</b> You may have to click the Launch Server button once you log into your Jupyter student account.<br/><br/>
           Use below credentials to start the challenge:<br/><br/>
           <b>User Name: ${dataValues.student.username}</b><br/>
           <b>Password: ${dataValues.student.password}</b><br/>`;
            registerMore = `Remember, to ensure a successful experience with this challenge, please take a moment to review this <a href="https://hackshack.hpedev.io/${workshop.replayLink}">video replay</a> of the live workshop. You may also find this <a href="https://developer.hpe.com/blog/hpe-dev-hack-shack-coding-challenges-are-you-ready-to-compete">blog post</a> detailing instructions on how to interact with this challenge helpful. We also advise that you 
           <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated <a href="${process.env.SLACK_CHANNEL_CHALLENGES}">#hpe-hackshack-challenges</a> 
           channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>`;
            buttonLabel = 'Start Challenge';
            enjoyWorkshop = 'Enjoy the challenge!';
          }
          return sendEmail({
            sessionType: sessionType,
            recipient: dataValues.email,
            subject: subject,
            content: createEmailBody({
              heading: heading,
              content: content,
              buttonLabel: buttonLabel,
              buttonUrl: dataValues.student.url,
              registerMore: registerMore,
              enjoyWorkshop: enjoyWorkshop,
            }),
            proxy: dataValues.proxy,
          })
            .then(() => {
              customer.update({
                lastEmailSent: 'credentials',
                ...getDates(),
              });
              console.log('sent credentials email');
            })
            .catch((error) => {
              console.log('Promise Rejected', error);
            });
        }

        // Send expiring soon email.
        if (hoursLeft <= 1 && dataValues.lastEmailSent === 'credentials') {
          let subject, heading, content, buttonLabel, enjoyWorkshop;

          if (sessionType && sessionType === session_type_workshops_on_demand) {
            subject =
              'Your HPE DEV Workshops-on-Demand session will end in one hour';
            heading =
              'Your HPE DEV Workshops-on-Demand session will end in one hour';
            content = `${dataValues.name}, <br/> <br/>Please remember to save your work and download the workshop notebook if you anticipate 
            requiring it in the future. Your account will be erased after your session has ended. <br/><br/>
            Keep in mind that you can <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated 
            <a href="${process.env.SLACK_CHANNEL_WORKSHOPS_ON_DEMAND}">#hpe-workshops-on-demand</a> 
            channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>
            Remember to use these credentials to connect to the workshop:<br/><br/>
            <b>User Name: ${dataValues.student.username}</b><br/>
            <b>Password: ${dataValues.student.password}</b><br/>`;
            buttonLabel = 'View Workshop';
            enjoyWorkshop = 'Enjoy the workshop!';
          } else if (
            sessionType &&
            sessionType === session_type_coding_challenge
          ) {
            subject = 'Your HPE DEV Challenge session will end in one hour';
            heading = 'Your HPE DEV Challenge session will end in one hour';
            content = `${dataValues.name}, <br/> <br/>Please remember to save your work and download the challenge notebook if you anticipate 
            requiring it in the future. Your account will be erased after your session has ended. <br/><br/>
            Keep in mind that you can <a href="https://slack.hpedev.io/">join us on Slack</a> to take advantage of the dedicated 
            <a href="${process.env.SLACK_CHANNEL_CHALLENGES}">#hpe-hackshack-challenges</a> 
            channel being provided so you can reach out to our subject matter experts (SMEs) and obtain support.<br/><br/>
            Remember to use these credentials to connect to the challenge:<br/><br/>
            <b>User Name: ${dataValues.student.username}</b><br/>
            <b>Password: ${dataValues.student.password}</b><br/>`;
            buttonLabel = 'View Challenge';
            enjoyWorkshop = 'Enjoy the challenge!';
          }
          return sendEmail({
            sessionType: sessionType,
            recipient: dataValues.email,
            subject: subject,
            content: createEmailBody({
              heading: heading,
              content: content,
              buttonLabel: buttonLabel,
              buttonUrl: dataValues.student.url,
              enjoyWorkshop: enjoyWorkshop,
            }),
            proxy: dataValues.proxy,
          })
            .then(() => {
              customer.update({
                lastEmailSent: 'expiring',
              });
              console.log('sent expiring email');
            })
            .catch((error) => {
              console.log('Promise Rejected', error);
            });
        }

        // Send expired email.
        if (hoursLeft <= 0 && dataValues.lastEmailSent === 'expiring') {
          let subject,
            heading,
            content,
            registerMore,
            shareWorkshop,
            feedback_url = '',
            badgeImg = workshop.badgeImg ? workshop.badgeImg : null,
            replayId = workshop.replayId ? workshop.replayId : null;
          if (sessionType && sessionType === session_type_workshops_on_demand) {
            subject =
              'Thanks for participating in the HPE DEV Workshops-on-Demand!';
            heading = `Thanks for participating in the HPE DEV Workshops-on-Demand!`;
            content = `Time's up! We hope you enjoyed the <b>${dataValues.sessionName}</b> workshop.<br/><br/>
                It is our goal to continually improve how we offer Workshops-on-Demand, so please share your feedback.`;
            registerMore = `Ready for another Workshop? Register <a href="https://hackshack.hpedev.io/workshops">here</a>.`;
            shareWorkshop = `Share Workshops-on-Demand with your colleagues!<br/>`;
            feedback_url = feedback_workshop_url;
          } else if (
            sessionType &&
            sessionType === session_type_coding_challenge
          ) {
            subject = 'Thanks for participating in the HPE DEV Challenge!';
            heading = 'Thanks for participating in the HPE DEV Challenge!';
            content = `Time's up! We hope you enjoyed the <b>${dataValues.sessionName}</b> challenge.<br/><br/>
                It is our goal to continually improve how we offer challenges, so please share your feedback.`;
            registerMore = `Ready for another Challenge? Register <a href="https://hackshack.hpedev.io/challenges">here</a>.`;
            //shareWorkshop = `Share Challenge with your colleagues!<br/>`;
            feedback_url = feedback_challenge_url;
          }
          console.log(
            'send CLEANUP email',
            studentId,
            dataValues.id,
            workshop.notebook
          );
          return sendPostfixEmail({
            location: location,
            recipient: jupyterEmail,
            subject: `CLEANUP ${studentId} ${dataValues.id}`,
            content: workshop.notebook,
          }).then(() => {
            customer
              .update({
                lastEmailSent: 'expired',
                active: false,
              })
              .then(async () => {
                console.log('send expired email');
                sendEmail({
                  sessionType: sessionType,
                  recipient: dataValues.email,
                  subject: subject,
                  content: createEmailBody({
                    heading: heading,
                    content: content,
                    buttonLabel: 'Click here to provide feedback',
                    buttonUrl: feedback_url,
                    registerMore: registerMore,
                    shareWorkshop: shareWorkshop,
                    badgeImg: badgeImg,
                    replayId: replayId,
                  }),
                  proxy: dataValues.proxy,
                });
              })
              .then(async () => {
                if (
                  (sessionType &&
                    (sessionType === session_type_workshops_on_demand ||
                      sessionType === session_type_coding_challenge) &&
                    workshop.reset &&
                    workshop.capacity === 0 &&
                    (workshop.notebook === 'WKSHP-OneView' ||
                      workshop.notebook === 'WKSHP-OneView-Advanced')) ||
                  (workshop.reset &&
                    workshop.notebook != 'WKSHP-OneView' &&
                    workshop.notebook != 'WKSHP-OneView-Advanced')
                ) {
                  console.log(
                    'sending reset email RESET',
                    workshop.notebook,
                    workshop.range
                  );
                  if (
                    workshop.notebook != 'WKSHP-OneView' &&
                    workshop.notebook != 'WKSHP-OneView-Advanced'
                  ) {
                    subject = `RESET ${studentId}`;
                  } else {
                    subject = `RESET ${workshop.range}`;
                  }
                  sendPostfixEmail({
                    location: location,
                    content: workshop.notebook,
                    recipient: jupyterEmail,
                    subject: subject,
                  });
                }
              })
              .then(async () => {
                if (
                  !workshop.reset ||
                  (workshop.reset &&
                    workshop.notebook != 'WKSHP-OneView' &&
                    workshop.notebook != 'WKSHP-OneView-Advanced')
                ) {
                  await workshop.increment('capacity');
                }
              })
              .catch((error) => {
                console.log('Promise Rejected', error);
              });
          });
        }
        return;
      })
    );
};

const runCronJobs = () => {
  const jobToCheckCustomers = new CronJob({
    // cronTime: '00 00 * * * *', // every hour
    cronTime: '*/20 * * * * *', // every 20 seconds
    onTick: () => checkCustomer(),
    runOnInit: true,
  });

  jobToCheckCustomers.start();
};

export default runCronJobs;
