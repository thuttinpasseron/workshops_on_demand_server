module.exports = ({
  heading,
  content,
  buttonLabel,
  buttonUrl,
  userName,
  password
}) => `
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body style="color: #333333; background-color: #F6F6F6; background-image: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmelaniejones55%2Fde&psig=AOvVaw2Eg4lTQhslwD_4XHz1ngXX&ust=1587607728160000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiE4vj5-ugCFQAAAAAdAAAAABAE'); font-family: Verdana, Arial, sans-serif; margin: 0;">
  <div style="max-width: 980px; margin: 0 auto; padding: 12px 24px;">
    <div style="padding: 12px 0;">
      <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmelaniejones55%2Fde&psig=AOvVaw2Eg4lTQhslwD_4XHz1ngXX&ust=1587607728160000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiE4vj5-ugCFQAAAAAdAAAAABAE" style="display: inline-block; vertical-align: top;">
      <span style="display: inline-block; margin: 12px; font-size: 20px; font-weight: 700;">
        HPE Workshops On Demand
      </span>
    </div>
  </div>
  <div style="max-width: 932px; margin: 0 auto; padding: 48px 24px; background-color: #fff; text-align: center;">
    <h1 style="font-size: 36px; font-weight: 300; margin: 0 0 48px 0;">
      ${heading}
    </h1>
    <p style="font-size: 20px; max-width: 720px; margin: 0 auto;">
      ${content}
    </p>
  ${
    buttonUrl && buttonLabel
      ? `<a href="${buttonUrl}" style="display: inline-block; margin: 48px 0; padding: 18px 48px; background-color: #01A982; color: #FFFFFF; font-size: 20px; font-weight: 700; text-decoration: none;">
        ${buttonLabel}
      </a>`
      : ""
  }
  ${
    userName && password
      ? `<p>User Name: ${userName}</p></br>
      <p>Password: ${password}</p></br>`
      : ""
  }
  </div>
  <div style="max-width: 980px; margin: 0 auto; padding: 12px 24px;">
    <div style="margin: 24px 0; font-size: 14px;">
      <img src="https://s3-us-west-2.amazonaws.com/onesphere/OneSphereEmailWordmark.svg" style="display: inline-block;">
      <p>If you have any questions, contact us mailto:hpedev@hpe.com</p>
      <p>Copyright ${new Date().getFullYear()} Hewlett Packard Enterprise Development LP.</p>
    </div>
  </div>
</body>

</html>
`;
