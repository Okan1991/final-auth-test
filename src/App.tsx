import { createSignal, onMount } from 'solid-js';

function App() {
  const [status, setStatus] = createSignal('Ready to connect to VITO.');
  const [htiToken, setHtiToken] = createSignal('');
  const [error, setError] = createSignal('');

  // Check voor token bij page load
  onMount(() => {
    console.log('Checking for HTI token...');
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    console.log('Hash:', window.location.hash);
    
    const params = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
    
    const token = params.get('hti_token') || hashParams.get('hti_token');
    const errorMsg = params.get('error') || hashParams.get('error');
    
    if (token) {
      console.log('✅ SUCCESS! HTI Token found:', token);
      setStatus('Logged in successfully!');
      setHtiToken(token);
      window.history.replaceState({}, document.title, "/");
    } else if (errorMsg) {
      console.error('❌ Error from VITO:', errorMsg);
      setError(errorMsg);
    }
  });

  const handleLogin = () => {
    const htiLaunchUrl = 'https://we-are-acc.vito.be/nl/hti/launch';
    const clientId = 'https://id.we-are-acc.vito.be/client/dcd2499f-656b-46ea-99ce-10aff48f1425';
    
    // GEBRUIK LOCALHOST!
    const redirectUri = 'https://sage-cucurucho-4495c9.netlify.app/.netlify/functions/callback';
    
    const fullUrl = `${htiLaunchUrl}?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    console.log('🚀 Redirecting to VITO with localhost:', fullUrl);
    window.location.href = fullUrl;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>VITO HTI Authentication - LOCALHOST TEST</h1>
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
          'background-color': '#d4edda',
          'border': '1px solid #28a745',
          'word-break': 'break-all'
        }}>
          <h3>✅ Received HTI Token:</h3>
          <p style={{ 'font-family': 'monospace', 'font-size': '12px' }}>
            {htiToken()}
          </p>
        </div>
      ) : (
        <button 
          onClick={handleLogin}
          style={{
            'padding': '10px 20px',
            'font-size': '16px',
            'background-color': '#007bff',
            'color': 'white',
            'border': 'none',
            'border-radius': '4px',
            'cursor': 'pointer'
          }}
        >
          Login with VITO (via localhost)
        </button>
      )}
    </div>
  );
}

export default App;