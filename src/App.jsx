import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddSales from './pages/Sales/AddSales';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sales" component={AddSales} />
      </Switch>
    </Router>
  );
}

export default App;
