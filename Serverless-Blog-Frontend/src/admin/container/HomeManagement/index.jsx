import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'antd';
import { parseJsonByString } from '../../../common/utils'
import AreaList from './component/AreaList';
import styles from './style.module.scss'
import axios from 'axios';
import { getChangeSchemaAction } from '../../store/action';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema)
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  return { schema, changeSchema }; 
}

const HomeManagement = () => {
  const { schema, changeSchema } = useStore();
  const { confirm } = Modal;

  const handleSaveBtnClick = () => {
    const { token } = window.localStorage;
    axios.post('/api/schema/save', {
      schema: JSON.stringify(schema)
    }, {
      headers: { token }
    }).then(() => {});
  }

  const handleResetBtnClick = () => {
    axios.get('/api/schema/getLatestOne').then((response) => {
      const data = response?.data?.data;
      data && changeSchema(parseJsonByString(data.schema, {}));
    }); 
  }

  function showConfirm() {
    confirm({
      title: 'Do you want to save these changes?',
      icon: <QuestionCircleOutlined />,
      content: 'This will save the configuration of your blog',
      onOk() { handleSaveBtnClick(); },
      onCancel() {},
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

  return (
    <div>
      <AreaList />
      <div className={styles.buttons}>
        <Button type="primary" onClick={showConfirm}>Save Block Configuration</Button>
        <Button type="primary" className={styles.reset} onClick={showPromiseConfirm}>Reset Block Configuration</Button>
      </div>
    </div>
  );
}

export default HomeManagement;