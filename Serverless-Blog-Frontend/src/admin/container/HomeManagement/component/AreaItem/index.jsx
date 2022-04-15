import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { Button, Modal, Select } from 'antd';
import { SortableElement } from 'react-sortable-hoc';
import { cloneDeep } from 'lodash'
import { getChangePageChildAction, getDeletePageChildAction } from '../../../../store/action';
import Banner from './component/Banner';
import List from './component/List';
import Footer from './component/Footer'
import styles from './style.module.scss';
// This is added
import { WarningOutlined } from '@ant-design/icons';

const { Option } = Select;
const map = { Banner, List, Footer }

const useStore = (index) => {
    const dispatch = useDispatch();
    const pageChild = useSelector((state) => state.common.schema.children?.[index] || []);
    const changePageChild = (temp) => { dispatch(getChangePageChildAction(index, temp)) }
    const removePageChild = () => { dispatch(getDeletePageChildAction(index)) }
    return { pageChild, changePageChild , removePageChild}; 
  }

const AreaItem = (props) => {
    const { value: index } = props // get the properties from AreaList
    const { pageChild, changePageChild, removePageChild } = useStore(index)

    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ tempPageChild, setTempPageChild ] = useState(cloneDeep(pageChild));

    useEffect(() => {
        setTempPageChild(cloneDeep(pageChild));
    }, [pageChild])

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        changePageChild(tempPageChild);
        
    };
    
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setTempPageChild(cloneDeep(pageChild));
    };

    const handleSelectChange = (value) => {
        setTempPageChild({ name: value, attributes: {}, children: [] });
    }

    const changeTempPageChildAttributes = (kvObj) => {
        const newTempPageChild = { ...tempPageChild };
        for(let key in kvObj) {
            newTempPageChild.attributes[key] = kvObj[key];
        }
        setTempPageChild(newTempPageChild);
    }


    const changeTempPageChildChildren = (children) => {
        const newTempPageChild = { ...tempPageChild };
        newTempPageChild.children = children;
        setTempPageChild(newTempPageChild);
    }

    const getComponent = () => {
        const { name } = tempPageChild;
        const Component = map[name];
        return Component ? (
            <Component {...tempPageChild} changeAttributes={changeTempPageChildAttributes} changeChildren={changeTempPageChildChildren}/>
        ) : null;
    }
    // This is added
    const { confirm } = Modal;

    function showDeleteConfirm() {
        confirm({
          title: 'Are you sure delete this component?',
          icon: <WarningOutlined style={ { color: '#F00' } }/>,
          content: 'The content will be deleted and can not be restored',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            removePageChild();
            console.log('OK');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }

    // This is added

    return (
        <li className={styles.item}>
            <span className={styles.content} onClick={showModal}>
                {pageChild.name ? pageChild.name + ' Component' : "Current block's content is empty" }
            </span>
            <span className={styles.delete}>
                <Button onClick={showDeleteConfirm} size="small" type="dashed" danger>Delete</Button>
            </span>
            <Modal 
                title="Select Component" 
                visible={isModalVisible} 
                onOk={handleModalOk} 
                onCancel={handleModalCancel}
                bodyStyle={{maxHeight: 600, overflow: 'scroll'}}
            >
                <Select value={tempPageChild.name} className={styles.selector} style={{width: '100%'}} onChange={handleSelectChange}>
                    <Option value='Banner'>Banner Component</Option>
                    <Option value='List'>List Component</Option>
                    <Option value='Footer'>Footer Component</Option>
                </Select>
                { getComponent() } 
            </Modal>
        </li>
    )
}

export default SortableElement(AreaItem);