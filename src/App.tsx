import { createEffect, createSignal } from 'solid-js';

function App() {
  const [status, setStatus] = createSignal('Not logged in');
  const [launchUrl, setLaunchUrl] = createSignal('');

  createEffect(() => {
    try {
      const htiToken = new URLSearchParams(window.location.search).get('hti_token');
      if (htiToken) {
        console.log("SUCCESS! HTI Token found:", htiToken);
        setStatus('Logged in successfully! HTI Token is in the console.');
      } else {
        setStatus('Not logged in - no HTI token found.');
      }
    } catch (error) {
      console.error('Error processing HTI token:', error);
      setStatus('Error during login process.');
    }
  });

  const handleLogin = () => {
    const htiLaunchUrl = 'https://app-api.we-are-acc.vito.be/hti/launch';
    const clientId = 'https://id.we-are-acc.vito.be/client/dcd2499f-656b-46ea-9ce-10aff48f1425';
    const redirectUri = 'https://sage-cucurucho-4495c9.netlify.app/'; 
    const fullUrl = `${htiLaunchUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&debug=true`;
    setLaunchUrl(fullUrl);
  };

  return (
    <div>
      <h1>Final Authentication Test</h1>
      <p>Status: {status()}</p>
      {!launchUrl() ? (
        <button onClick={handleLogin}>Generate Login Link</button>
      ) : (
        <div>
          <p>Login link generated. Click to continue:</p>
          <a href={launchUrl()} style={{ color: 'blue', textDecoration: 'underline' }}>
            {launchUrl()}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;