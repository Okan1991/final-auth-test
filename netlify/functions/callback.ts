import type { Handler, HandlerEvent } from "@netlify/functions";

export const handler: Handler = async (event: HandlerEvent) => {
  const body = new URLSearchParams(event.body || '');
  const htiToken = body.get('hti_token');

  if (!htiToken) {
    return { statusCode: 400, body: "HTI Token not found." };
  }

  const targetUrl = new URL(process.env.URL!);
  targetUrl.searchParams.set('hti_token', htiToken);

  return {
    statusCode: 302,
    headers: {
      Location: targetUrl.toString(),
    },
  };
};