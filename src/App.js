import './App.css';
import { Suspense, lazy, useState, useEffect } from "react";
import { Route, Switch, Link } from 'react-router-dom';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Profile from './pages/profile';
import WatchMmyPlant from './watchMyPlant/watchMyPlant';
import MainHome from './main_home/main_home';
import PlantList from './plantCategoryList/plantCategoryList';
//import PlantCategoryView from './plantCategoryView/plantCategoryView';
import DetailPlant from './detailPlant/detailPlant'
import Footer from './footer/footer';
import CustomerCenter from './customer-center/customer-center';
import AdminLoginPage from './admin/adminLoginPage';
import Admin from 'admin/admin';
import Subscript from './subscript/subscript';
import Codingjoa from '@/codingjoa'
import axios from 'axios';


const PlantCategoryView = lazy(() => import('./plantCategoryView/plantCategoryView'));


function App() {
  const [selectedPlantList, setSelectedPlantList] = useState({list:{}});  

  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Switch>
          <Route exact path='/'>
            <MainHome  />
            <Footer></Footer>
          </Route>
          <Route path='/codingjoa'>
            <Codingjoa />
          </Route>
          <Route path='/signup'>
            <SignUp />
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/profile' >
            <Profile />
          </Route>
          <Route path='/myplant'>
            <WatchMmyPlant />
          </Route>
          <Route path='/detailplant' selectedPlantList={selectedPlantList} setSelectedPlantList={setSelectedPlantList}>
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
          <Route path='/adminLoginPage'>
            <AdminLoginPage />
          </Route>
          <Route path='/subscript'>
            <Subscript />
          </Route>
          <Route path="/plant-category-view" component={PlantCategoryView} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
