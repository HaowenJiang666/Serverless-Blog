import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal, Input } from 'antd';
import { parseJsonByString } from '../../../common/utils'
import styles from './style.module.scss'
import axios from 'axios';
import { getChangeSchemaAction, getChangePageAttributeAction } from '../../store/action';
import { ExclamationCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const useStore = () => {
  const dispatch = useDispatch();
  const schema = useSelector((state) => state.common.schema)
  const changeSchema = (schema) => {
    dispatch(getChangeSchemaAction(schema));
  }
  const changePageAttribute = (key, value) => {
    dispatch(getChangePageAttributeAction(key, value))
  }
  return { schema, changeSchema, changePageAttribute }; 
}

const BasicSetting = () => {
  const { schema = {}, changeSchema, changePageAttribute } = useStore();
  const { attributes = {} } = schema; 
  const { title = '' } = attributes;
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

  const handleTitleChange = useCallback((e) => {
    changePageAttribute('title', e.target.value);
  }, [changePageAttribute]);

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
        <div className={styles.row}>
            <div className={styles.title}>Page Title:</div>
            <div className={styles.content}>
                <Input value={title} onChange={handleTitleChange}/>
            </div>
        </div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={showConfirm}>Save Basic Configuration</Button>
        <Button type="primary" className={styles.reset} onClick={showPromiseConfirm}>Reset Basic Configuration</Button>
      </div>
    </div>
  );
}

export default BasicSetting;