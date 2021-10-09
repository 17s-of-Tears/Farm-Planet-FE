import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
<<<<<<< HEAD
import Profile from './pages/profile';
=======
import MainHome from './main_home/main_home';
>>>>>>> a590de57513c63d3c931201983c4dd79bd332fe0


function App() {
  return (
    <div className="App">
      <ul>
        <li><Link exact to="/">메인</Link></li>
        <li><Link exact to="/signup">회원가입</Link></li>
      </ul>
      <Switch>
        <Route exact path='/'>
          <MainHome></MainHome>
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
