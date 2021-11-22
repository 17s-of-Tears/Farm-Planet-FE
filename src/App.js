import './App.css';
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Profile from './pages/profile';
import WatchMmyPlant from './watchMyPlant/watchMyPlant';
import MainHome from './main_home/main_home';
import PlantList from './plantList/plantList';
import RecommmentPlant from './recommend_plant/recommend_plant';     
import DetailPlant from './detailPlant/detailPlant'
import Footer from './footer/footer';
import CustomerCenter from './customer-center/customer-center';
import Admin from './admin/admin';

function App() {
  return (
    <div className="App">
      <ul>
        <li><Link exact to="/">메인</Link></li>
        <li><Link exact to="/signup">회원가입</Link></li>
        <li><Link exact to="/login">로그인</Link></li>
        <li><Link exact to="/profile">프로필</Link></li>
        <li><Link exact to="/myplant">내 식물</Link></li>
        <li><Link exact to="/detailplant">식물사진</Link></li>
        <li><Link exact to="/list">리스트</Link></li>
        <li><Link exact to="/customer-center">공지사항</Link></li>
        <li><Link exact to="/admin">어드민</Link></li>
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
        <Route path='/detailplant'>
          <DetailPlant />
        </Route>
        <Route path='/list'>
          <PlantList />
          <Footer></Footer>
        </Route>
        <Route path='/customer-center'>
          <CustomerCenter />
          <Footer></Footer>
        </Route>
        <Route path='/admin'>
          <Admin />    
        </Route>
      </Switch>
    </div>
  );
}

export default App;
