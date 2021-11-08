import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Profile from './pages/profile';
import WatchMmyPlant from './watchMyPlant/watchMyPlant';
import MainHome from './main_home/main_home';
import PlantList from './plantList/plantList';
import RecommmentPlant from './recommend_plant/recommend_plant';
import Footer from './footer/footer';

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
          <Footer></Footer>
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
        <Route path='/list'>
          <PlantList />
          <Footer></Footer>
        </Route>         
      </Switch>
      
    </div>
  );
}

export default App;
