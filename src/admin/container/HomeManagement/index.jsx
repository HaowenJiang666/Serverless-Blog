import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout, Menu, Button, Modal, space } from 'antd';
import { parseJsonByString } from '../../../common/utils'
import AreaList from './component/AreaList';
import styles from './style.module.scss'
import { getChangeSchemaAction } from './store/action';
// This is added
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

// const useSearch = () => {
//   const [ searched, setSearched ] = useState(false)
//   const toggleSearched = () => { setSearched(!searched) };
//   return { searched, toggleSearched }
// }


const useCollapsed = () => {
  const [ collapsed, setCollapsed ] = useState(false)
  const toggleCollapsed = () => { setCollapsed(!collapsed) };
  return { collapsed, toggleCollapsed }
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
  // const { searched, toggleSearched } = useSearch();

  const handleHomePageRedirect = () => {window.location.href = "/"}

  const handleSaveBtnClick = () => {
    window.localStorage.schema = JSON.stringify(schema);
  }

  const handleResetBtnClick = () => {
    // action -> reducer -> redux change 
     changeSchema(parseJsonByString(window.localStorage.schema, {})) 
  }

  // This is added
  const { confirm } = Modal;

  function showConfirm() {
    confirm({
      title: 'Do you want to save these changes?',
      icon: <QuestionCircleOutlined />,
      content: 'This will save the configuration of your blog',
      onOk() {
        handleSaveBtnClick();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  function showPromiseConfirm() {
    confirm({
      title: 'Do you want to reset the changes?',
      icon: <ExclamationCircleOutlined />,
      content: 'This will reset your configuration to origin',
      onOk() {
        handleResetBtnClick();
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 800);
        }).catch(() => console.log('Oops errors!'));
      },
      onCancel() {},
    });
  }

  // This is added

  return (
    <Layout>
      <Sider className={styles.sidebar} trigger={null} collapsible collapsed={collapsed}>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['admin-home']}>
          <Menu.Item key="admin-home">
            <span className="iconfont">&#xe7c6;</span>{ collapsed ? "" : "Home Page Admin"}
          </Menu.Item>
          <Menu.Item key="admin-back" onClick={handleHomePageRedirect}>
          <span className="iconfont">&#xe666;</span>{ collapsed ? "" : "Back To User Page"}
          </Menu.Item>
          <Menu.Item key="admin-search">
          <span className="iconfont">&#xe8ef;</span>{ collapsed ? "" : "Search For Content"}
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
          <AreaList />
          <div className={styles.buttons}>
            <Button type="primary" onClick={showConfirm}>Save Block Configuration</Button>
            <Button type="primary" className={styles.reset} onClick={showPromiseConfirm}>Reset Block Configuration</Button>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default HomeManagement;