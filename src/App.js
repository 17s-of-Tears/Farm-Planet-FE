import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Profile from './pages/profile';
import WatchMmyPlant from './watchMyPlant/watchMyPlant';
import MainHome from './main_home/main_home';
import RecommmentPlant from './recommend_plant/recommend_plant';

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
        <Route path='/myplant'>
          <WatchMmyPlant />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
