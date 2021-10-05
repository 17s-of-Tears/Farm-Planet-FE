import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <a>메인</a>
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
