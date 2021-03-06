import React from 'react';
import { BrowserRouter as Router, Route , Redirect } from 'react-router-dom';
import Main from './views/Main';
import Details from './views/Details';

function App() {
  return (
    <div className='container'>
      <Router>
        <Route exact path='/' component={Main} />
        <Route path='/:country' component={Details} />
        <Redirect from="/*" to="/"/>
      </Router>
    </div>
  );
}

export default App;
