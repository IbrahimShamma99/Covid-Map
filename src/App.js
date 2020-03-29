import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './views/Main';
import Details from './views/Details';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Main} />
        <Route path='/:country' component={Details} />
      </Router>
    </div>
  );
}

export default App;
