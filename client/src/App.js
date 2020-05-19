import React from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';

import Login from './components/login/loginView';
import Home from './components/home/Home';
import Users from './components/Users/User';
import Library from './components/Library/Library';


function App() {
  return (
    <Router>

      <Route path="/login" exact component={Login} />
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={Users} />
      <Route path="/library" exact component={Library} />
  
  </Router>
  );
}

export default App;
