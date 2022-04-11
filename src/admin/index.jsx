import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import HomeManagement from './container/HomeManagement'
import BasicSetting from './container/BasicSetting';
import store from './store';
import styles from './style.module.scss';

import 'normalize.css';
import 'antd/dist/antd.css';
import './style.scss'

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
}

const Wrapper = () => {
  const handleHomePageRedirect = () => {window.location.href = "/"}
  const { collapsed, toggleCollapsed } = useCollapsed();

  return (
    <Router>
      <Layout>
        <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
            <Menu.Item key="admin-home">
              <Link to="/">
                <span className="iconfont">&#xe7c6;</span>{ collapsed ? "" : "Home Page Admin"}
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-setting">
              <Link to="/setting">
                <span className="iconfont">&#xe612;</span>{ collapsed ? "" : "Basic Configuration"}
              </Link>
            </Menu.Item>
            <Menu.Item key="admin-search">
              <span className="iconfont">&#xe8ef;</span>{ collapsed ? "" : "Search For Content"}
            </Menu.Item>
            <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
              <span className="iconfont">&#xe666;</span>{ collapsed ? "" : "Back To User Page"}
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className={styles.header}>
            {
              collapsed 
              ?  <span className='iconfont' onClick={toggleCollapsed} >&#xe62c;</span>
              : <span className='iconfont' onClick={toggleCollapsed} >&#xe629;</span>
            }
          </Header>
          <Content className={styles.content}>
            <Switch>
              <Route path='/' component={HomeManagement} exact />
              <Route path='/setting' component={BasicSetting} exact />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Wrapper />
  </Provider>,
  document.getElementById('root')
);

