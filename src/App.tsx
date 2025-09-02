import { createEffect, createSignal } from 'solid-js';

function App() {
  const [status, setStatus] = createSignal('Ready to connect to VITO.');
  const [htiToken, setHtiToken] = createSignal('');
  const [error, setError] = createSignal('');

  // Vang redirect EN errors op
  createEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('hti_token');
    const errorMsg = params.get('error');
    
    if (token) {
      console.log("SUCCESS! HTI Token found:", token);
      setStatus('Logged in successfully!');
      setHtiToken(token);
      window.history.replaceState({}, document.title, "/");
    } else if (errorMsg) {
      console.error("Error from VITO:", errorMsg);
      setError(errorMsg);
    }
  });

  const handleLogin = () => {
    // GEBRUIK ALLEEN UUID - NIET DE VOLLEDIGE URL!
    const htiLaunchUrl = 'https://we-are-acc.vito.be/hti/launch'; 
    const clientId = 'dcd2499f-656b-46ea-99ce-10aff48f1425'; // <-- ALLEEN UUID
    const redirectUri = 'https://sage-cucurucho-4495c9.netlify.app/';
    
    const fullUrl = `${htiLaunchUrl}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    console.log('Navigating to:', fullUrl);
    console.log('Dit zou moeten werken - client_id is nu alleen UUID');
    window.location.href = fullUrl;
  };

  return (
    <div>
      <h1>Final Authentication Test (VITO HTI Flow)</h1>
      <p>Status: {status()}</p>
      
      {error() && (
        <div style={{
          'background-color': '#ffeeee',
          'border': '1px solid red',
          'padding': '10px',
          'margin': '10px 0'
        }}>
          Error: {error()}
        </div>
      )}

      {htiToken() ? (
        <div style={{
          'margin-top': '20px', 
          'padding': '10px', 
          'background-color': '#f0f0f0', 
          'word-break': 'break-all'
        }}>
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