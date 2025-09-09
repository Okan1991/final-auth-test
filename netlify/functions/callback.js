exports.handler = async (event) => {
  // De hti_token wordt verstuurd als form data, we moeten de body parsen.
  const params = new URLSearchParams(event.body);
  const token = params.get('hti_token');

  if (token) {
    // We hebben de token! Stuur de gebruiker nu naar de hoofdpagina
    // met de token in de URL als een query parameter (een GET request).
    const finalUrl = `/?hti_token=${encodeURIComponent(token)}`;

    return {
      statusCode: 302, // Dit is een tijdelijke redirect
      headers: {
        Location: finalUrl,
      },
    };
  }

  // Als er geen token is, stuur door met een foutmelding.
  const errorUrl = `/?error=token_missing_in_post`;
  return {
    statusCode: 302,
    headers: {
      Location: errorUrl,
    },
  };
};