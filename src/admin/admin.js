import React, {useState,Suspense, lazy} from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import './admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, Menu } from 'antd';
import {
  SnippetsOutlined,
  FormOutlined,
  DatabaseOutlined,  
  UserOutlined,
} from '@ant-design/icons';

const BoardNotice = lazy(()=> import('@/codingjoa/BoardNotice'));
const Accounts = lazy(()=> import('@/codingjoa/Accounts'));
const User = lazy(()=> import('@/codingjoa/User'));
const Plant = lazy(()=> import('@/codingjoa/Plant'))
const Category = lazy(()=> import('@/codingjoa/Category'))
const Farm = lazy(()=> import('@/codingjoa/Farm'))
const Banner = lazy(()=> import('@/codingjoa/Banner'))
const Subscribe = lazy(()=> import('@/codingjoa/Subscribe'))

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Admin = (props) => {
  let [collapsed,setCollapsed] = useState(false); 
  const history = useHistory()
  const test = (arg) => {    
    history.push("/admin/" + arg.key);
  }

  return (
    <div className="Admin">
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={test}>      

            <SubMenu key="sub1" icon={<FormOutlined />} title="공지사항">
              <Menu.Item key="notice">공지사항</Menu.Item>
              <Menu.Item key="faq">FAQ</Menu.Item>              
            </SubMenu>           

            <SubMenu key="sub2" icon={<UserOutlined />} title="사용자 관리">
              <Menu.Item key="managerList">관리자 목록</Menu.Item>              
              <Menu.Item key="memberList">회원목록</Menu.Item>              
            </SubMenu>

            <SubMenu key="sub3" icon={<DatabaseOutlined />} title="식물관련">
              <Menu.Item key="plantList">식물 목록</Menu.Item>              
              <Menu.Item key="plantCategoryList">식물 카테고리 목록</Menu.Item>
            </SubMenu>

            <SubMenu key="sub4" icon={<SnippetsOutlined />} title="기타콘텐츠 관련">
              <Menu.Item key="banner">배너 관리</Menu.Item>
              <Menu.Item key="farm">밭 관리</Menu.Item>              
              <Menu.Item key="subscribe">구독 관리</Menu.Item>
            </SubMenu>
            
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>            
            
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Suspense fallback={<div>loading...</div>}>
                <Switch>
                  <Route path='/admin/notice'> 
                    <BoardNotice />
                  </Route>
                  <Route path='/admin/faq'>
                    option2
                  </Route>
                  <Route path='/admin/managerList'>
                    <Accounts />
                  </Route>
                  <Route path='/admin/memberList'>
                    <User />
                  </Route>
                  <Route path='/admin/plantList'>
                    <Plant  />
                  </Route>                  
                  <Route path='/admin/plantCategoryList'>
                    <Category  />
                  </Route>
                  <Route path='/admin/banner'>
                    <Banner  />
                  </Route>
                  <Route path='/admin/farm'>
                    <Farm  />
                  </Route>               
                  <Route path='/admin/subscribe'>
                    <Subscribe  />
                  </Route>                        
                </Switch>
              </Suspense>
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;