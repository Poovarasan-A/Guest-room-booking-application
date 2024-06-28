const sendToken = (user, statusCode, res) => {
  //Generate JWT token for the user
  const token = user.getJwtToken();

  //Set cookie options for token storage and set expiration time
  //Date.now() returns timestamp in milliseconds so we calculate the future timestamp,here 24 = hours/day, 60 = mins/hour, 60 = secs/mins, 1000 = milliseconds/secs
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // ensures cookie is accessible only through HTTP(S)
  };

  //set token as cookie with Jwt
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user, //sending user  details
    token, // Included token in response for client side storage in browser
  });
};

export default sendToken;
