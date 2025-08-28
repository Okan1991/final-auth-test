import { createEffect, createSignal } from 'solid-js';

function App() {
  const [status, setStatus] = createSignal('Not logged in');
  // New state to store the login URL
  const [launchUrl, setLaunchUrl] = createSignal('');

  // Capture the redirect
  createEffect(() => {
    const htiToken = new URLSearchParams(window.location.search).get('hti_token');
    if (htiToken) {
      console.log("SUCCESS! HTI Token found:", htiToken);
      setStatus('Logged in successfully! HTI Token is in the console.');
    }
  });

  // Generate the URL, but don't redirect immediately
  const handleLogin = () => {
    const htiLaunchUrl = 'http://we-are-acc.vito.be/nl/hti/launch';
    const clientId = 'https://id.we-are-acc.vito.be/client/dcd2499f-656b-46ea-99ce-10aff48f1425';
    const redirectUri = 'https://sage-cucurucho-4495c9.netlify.app/';

    const fullUrl = `${htiLaunchUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    console.log('Generated HTI Launch URL:', fullUrl);
    // Store the URL in the state instead of reloading the page
    setLaunchUrl(fullUrl);
  };

  return (
    <div>
      <h1>Final Authentication Test</h1>
      <p>Status: {status()}</p>

      {/* If the URL has not been generated, show the button */}
      {!launchUrl() ? (
        <button onClick={handleLogin}>
          Generate Login Link
        </button>
      ) : (
        // If the URL has been generated, show the link
        <div>
          <p>Login link generated. Click the link below to continue:</p>
          <a href={launchUrl()} style={{ color: 'blue', 'text-decoration': 'underline' }}>
            {launchUrl()}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;