import React, {useState} from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';

import './admin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

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
            <Menu.Item key="option1" icon={<PieChartOutlined />}>
              option 1
            </Menu.Item>

            <Menu.Item key="option2" icon={<DesktopOutlined />} title="option2">
              option 2
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="option3">Tom</Menu.Item>
              <Menu.Item key="option4">Bill</Menu.Item>
              <Menu.Item key="option5">Alex</Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="option6">Team 1</Menu.Item>
              <Menu.Item key="option7">Team 2</Menu.Item>
            </SubMenu>

            <Menu.Item key="option8" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route path='/admin/option1'> 
                  option1
                </Route>
                <Route path='/admin/option2'>
                  option2
                </Route>     
              </Switch>
            </div>
            
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Admin;