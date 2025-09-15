import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga4';
import AppContent from './AppContent';

ReactGA.initialize(process.env.REACT_APP_GA_MEASUREMENT_ID);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    
    <Router>
      <AppContent
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </Router>
  );
}

export default App;