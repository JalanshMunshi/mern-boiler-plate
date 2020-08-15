import React from 'react';
import { Route, Switch } from "react-router-dom";
import About from './about';
import Login from './RegisterOrLogin';
import Register from './RegisterOrLogin/register';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/about' component={About} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
