exports.handler = async (event, context) => {
  // The HTI token is sent in the body of the POST request.
  // Netlify automatically parses it if it's form-urlencoded.
  const token = event.body.hti_token;

  if (token) {
    // Construct the final URL to redirect the user to.
    // We add the token as a query parameter that our front-end can read.
    const finalUrl = `/?hti_token=${encodeURIComponent(token)}`;

    return {
      statusCode: 302, // 302 means "Found" (a temporary redirect)
      headers: {
        Location: finalUrl,
      },
    };
  }

  // If no token is found, redirect to the home page with an error.
  return {
    statusCode: 302,
    headers: {
      Location: '/?error=token_missing',
    },
  };
};