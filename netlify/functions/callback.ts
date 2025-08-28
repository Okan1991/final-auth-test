// netlify/functions/callback.ts
import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // 1. Haal de hti_token uit de body van de inkomende POST-request.
  const body = new URLSearchParams(event.body || '');
  const htiToken = body.get('hti_token');

  // 2. Als er geen token is, stuur een foutmelding terug.
  if (!htiToken) {
    return {
      statusCode: 400,
      body: "Fout: HTI Token niet gevonden in de POST body.",
    };
  }

  // 3. Bouw de uiteindelijke URL voor de gebruiker, inclusief de token.
  // We gebruiken de URL van de site uit de omgevingsvariabelen van Netlify.
  const targetUrl = new URL(process.env.URL || "https://sage-cucurucho-4495c9.netlify.app");
  targetUrl.searchParams.set('hti_token', htiToken);

  // 4. Stuur de browser van de gebruiker door naar de hoofdpagina met de token in de URL.
  // Dit zet de POST om in een GET die onze app wel kan verwerken.
  return {
    statusCode: 302, // 302 is de code voor een tijdelijke redirect.
    headers: {
      Location: targetUrl.toString(),
    },
  };
};

export { handler };

