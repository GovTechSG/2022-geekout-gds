import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Clock from './components/Clock';
import NavigationBar from './components/NavigationBar';
import Todo from './screens/Todo';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/todo">
          <Todo></Todo>
        </Route>
        <Route path="/">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
              </a>
              <Clock interval={1000}></Clock>
            </header>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
