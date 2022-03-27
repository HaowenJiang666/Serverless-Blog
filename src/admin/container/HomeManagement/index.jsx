import { useState, useRef } from 'react';
import { Layout, Menu, Button } from 'antd';
import AreaList from './component/AreaList';
import { parseJsonByString } from '../../../common/utils'
import styles from './style.module.scss'

const { Header, Sider, Content } = Layout;

const initialSchema = parseJsonByString(window.localStorage.schema, {});

const useCollapsed = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed}
}

const HomeManagement = () => {
  const { collapsed, toggleCollapsed } = useCollapsed();
  const [ schema, setSchema ] = useState(initialSchema);
  const handleHomePageRedirect = () => {window.location.href = "/"}
  const areaListRef = useRef()

  const handleSaveBtnClick = () => {
    const { getSchema } = areaListRef.current;
    const schema = { name: 'Page', attributes: {}, children: getSchema() }
    window.localStorage.schema = JSON.stringify(schema);
  }

  const handleResetBtnClick = () => {
     const newSchema = parseJsonByString(window.localStorage.schema, {});
     setSchema(newSchema);
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
          <AreaList ref={areaListRef} children={schema.children || []}/>
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