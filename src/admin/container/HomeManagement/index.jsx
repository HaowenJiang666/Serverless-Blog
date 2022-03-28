import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Button } from 'antd';
import { parseJsonByString } from '../../../common/utils'
import AreaList from './component/AreaList';
import styles from './style.module.scss'
import { getChangeSchemaAction } from './store/action';

const { Header, Sider, Content } = Layout;

const useCollapsed = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed}
}

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.homeManagement.schema)
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  return { schema, changeSchema }; 
}

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const { schema, changeSchema } = useStore();

  const handleHomePageRedirect = () => {window.location.href = "/"}

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema);
  }

  const handleResetBtnClick = () => {
    // action -> reducer -> redux change 
     changeSchema(parseJsonByString(window.localStorage.schema, {})) 
  }

  return (
    <Layout>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
          <Menu.Item key="admin-home">
            <span className="iconfont">&#xe7c6;</span>Home Page Admin
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
          <span className="iconfont">&#xe666;</span>Back To User Page
          </Menu.Item>
          <Menu.Item key="admin-search">
          <span className="iconfont">&#xe8ef;</span>Search For Content
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          {
            collapsed 
            ?  <span className='iconfont' onClick={toggleCollapsed} > &#xe62c; </span>
            : <span className='iconfont' onClick={toggleCollapsed} > &#xe629;</span>
          }
        </Header>
        <Content className={styles.content}>
          <AreaList />
          <div className={styles.buttons}>
            <Button type="primary" onClick={handleSaveBtnClick}>Save Block Configuration</Button>
            <Button type="primary" className={styles.reset} onClick={handleResetBtnClick}>Reset Block Configuration</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeManagement;