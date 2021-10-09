import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Profile from './pages/profile';


function App() {
  return (
    <div className="App">
      <ul>
        <li><Link exact to="/">메인</Link></li>
        <li><Link exact to="/signup">회원가입</Link></li>
      </ul>
      <Switch>
        <Route exact path='/'>
          <a>메인</a>
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
