import { createEffect, createSignal } from 'solid-js';

function App() {
  const [status, setStatus] = createSignal('Ready to connect to VITO.');
  const [htiToken, setHtiToken] = createSignal('');

  // Stap 2: Vang de redirect op
  createEffect(() => {
    const token = new URLSearchParams(window.location.search).get('hti_token');
    if (token) {
      console.log("SUCCESS! HTI Token found:", token);
      setStatus('Logged in successfully! HTI Token is in the console.');
      setHtiToken(token);
      // Verwijder de token uit de URL voor een schone weergave
      window.history.replaceState({}, document.title, "/");
    }
  });

  // Stap 1: Stuur de gebruiker naar de CORRECTE login-pagina
  const handleLogin = () => {
    // ZONDER /nl/ - terug naar origineel
    const htiLaunchUrl = 'https://we-are-acc.vito.be/hti/launch'; 
    const clientId = 'https://id.we-are-acc.vito.be/client/dcd2499f-656b-46ea-99ce-10aff48f1425';
    const redirectUri = 'https://sage-cucurucho-4495c9.netlify.app/'; // Met trailing slash
    
    const fullUrl = `${htiLaunchUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    console.log('Navigating to:', fullUrl);
    window.location.href = fullUrl;
  };

  return (
    <div>
      <h1>Final Authentication Test (VITO HTI Flow)</h1>
      <p>Status: {status()}</p>

      {htiToken() ? (
        <div style={{'margin-top': '20px', 'padding': '10px', 'background-color': '#f0f0f0', 'word-break': 'break-all'}}>
          <h3>Received HTI Token:</h3>
          <p>{htiToken()}</p>
        </div>
      ) : (
        <button onClick={handleLogin}>
          Log in with VITO
        </button>
      )}
    </div>
  );
}

export default App;