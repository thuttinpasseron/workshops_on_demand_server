require("dotenv").config();

const fromEmailAddress = process.env.FROM_EMAIL_ADDRESS;
module.exports = ({
  heading,
  content,
  buttonLabel,
  buttonUrl,
  userName,
  password,
  shareWorkshop,
  registerMore,
  enjoyWorkshop,
  badgeImg,
  replayId,
  shareSpecialWorkshop,
  specialBadgeId
}) => `
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<body style="color: #333333; background-color: #F6F6F6; background-image: url(''); font-family: Verdana, Arial, sans-serif; margin: 0;">
  <div style="max-width: 980px; margin: 0 auto; padding: 12px 24px;">
    <div style="padding: 12px 0;">
      <img src="https://us-central1-grommet-designer.cloudfunctions.net/images/lozzi-hpe-com/developer-logo.png" style="display: inline-block; vertical-align: top;">
    </div>
  </div>
  <div style="max-width: 932px; margin: 0 auto; padding: 48px 24px; background-color: #fff; text-align: center;">
    <h1 style="font-size: 36px; font-weight: 300; margin: 0 0 48px 0; text-align: center;">
      ${heading}
    </h1>
    <p style="font-size: 20px; max-width: 720px; margin: 0 auto; text-align:left;">
      ${content}
    </p><br>

    ${userName && password
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto;">
    Use below credentials to start the workshop
  </p><br>`
    : ""
  }

    ${userName
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto;"> <b>User Name: ${userName}</b></p><br>`
    : ""
  }
    ${password
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto;"> <b>Password: ${password}</b></p><br>`
    : ""
  }
  ${buttonUrl && buttonLabel
    ? `<a href="${buttonUrl}" style="display: inline-block; margin: 48px 0; padding: 18px 48px; background-color: #01A982; color: #FFFFFF; font-size: 20px; font-weight: 700; text-decoration: none;">
        ${buttonLabel}
      </a>  <br>`
    : ""
  }

  ${registerMore
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto; text-align:left;"> ${registerMore}</p><br>`
    : ""
  }
  ${shareWorkshop
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto; text-align:left;"> ${shareWorkshop}</p><br>
      <img src="${badgeImg}" style="width: 700px; margin-bottom: 50px;">
      <p style="font-size:20px; max-width:720px; margin:0 auto;">
      <a href="https://twitter.com/intent/tweet?url=https://deploy-preview-179--musing-kalam-f76e20.netlify.app/workshop/${replayId}/finisher-badge"
        style="text-decoration: none; display:flex; align-items: center;">
        <img data-imagetype="External"
          src="https://us-central1-grommet-designer.cloudfunctions.net/images/pramod-reddy-sareddy-hpe-com/Twitter.png"
          style="display:inline-block; margin-right: 25px">
        Share your badge on Twitter
      </a>
      <br />
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://deploy-preview-179--musing-kalam-f76e20.netlify.app/workshop/${replayId}/finisher-badge"
        style="text-decoration: none; display:flex; align-items: center;">
        <img data-imagetype="External"
          src="https://us-central1-grommet-designer.cloudfunctions.net/images/pramod-reddy-sareddy-hpe-com/LinkedIn.png"
          style="display:inline-block; margin-right: 25px">
        Share your badge on LinkedIn
      </a>
    </p>
    <br/>    <br/>
    `
    : ""
  }
  ${shareSpecialWorkshop
    ? `<p style="font-size: 20px; max-width: 720px; margin: 0 auto; text-align:left;"> ${shareSpecialWorkshop}</p><br>
      <img src="${badgeImg}" style="width: 700px; margin-bottom: 50px;">
      <p style="font-size:20px; max-width:720px; margin:0 auto;">
      <a href="https://twitter.com/intent/tweet?url=https://deploy-preview-179--musing-kalam-f76e20.netlify.app/workshops/${specialBadgeId - 1}/special-badge"
        style="text-decoration: none; display:flex; align-items:center">
        <img data-imagetype="External"
          src="https://us-central1-grommet-designer.cloudfunctions.net/images/pramod-reddy-sareddy-hpe-com/Twitter.png"
          style="display:inline-block; margin-right: 25px">
        Share your badge on Twitter
      </a>
      <br />
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://deploy-preview-179--musing-kalam-f76e20.netlify.app/workshops/${specialBadgeId - 1}/special-badge"
        style="text-decoration: none; display:flex; align-items:center">
        <img data-imagetype="External"
          src="https://us-central1-grommet-designer.cloudfunctions.net/images/pramod-reddy-sareddy-hpe-com/LinkedIn.png"
          style="display:inline-block; margin-right: 25px">
        Share your badge on LinkedIn
      </a>
    </p>
    <br/>    <br/>
    `
    : ""
  }

  <p style="font-size: 20px; max-width: 720px; margin: 0 auto; text-align:left;">
  ${enjoyWorkshop ? `${enjoyWorkshop}     <br/> <br/>` : ""} 

    The HPE DEV team
  </p><br/>

  <div style="padding: 12px 0; text-align:left;">
    <a href="https://developer.hpe.com/">
      <img src="https://us-central1-grommet-designer.cloudfunctions.net/images/pramod-reddy-sareddy-hpe-com/HpedevBanner.png" style="display: inline-block; vertical-align: top;">
    </a>
  </div>
  
  </div>
  <div style="max-width: 980px; margin: 0 auto; padding: 12px 24px;">
    <div style="margin: 24px 0; font-size: 14px;">
      <img src="" style="display: inline-block;">
      <p>If you have any questions, contact us mailto:${fromEmailAddress}</p>
      <p> Hewlett Packard Enterprise respects your privacy.<br/><br/>
      For more information regarding Hewlett Packard Enterprise's privacy policies and practices, please visit our 
      <a href="https://www.hpe.com/us/en/legal/privacy.html">Privacy Statement</a> or contact us 
      <a href="https://privacyportal.onetrust.com/webform/8c68e411-6bf3-4c9e-8800-9c72d0dc273a/8f599c3a-a3a5-4db9-ae19-2fc954a70130">here</a>. 
      3000 Hanover Street; 94304 Palo Alto; CA; United States of America. <br/><br/>
      © Copyright ${new Date().getFullYear()} Hewlett Packard Enterprise Development LP. The information contained herein is subject to change without notice. </p>      
    </div>
  </div>
</body>

</html>
`;
