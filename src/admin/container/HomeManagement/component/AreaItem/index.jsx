import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Modal, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

const AreaItem = (props, ref) => {
    const { index, item, removeItemFromChildren, changeAreaItem } = props // get the properties from AreaList
    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ schema, setSchema ] = useState(item);
    const [ temp, setTemp ] = useState(item);

    useEffect(() => {
        setSchema(props.item);
        setTemp(props.item);
    }, [props.item])

    useImperativeHandle(ref, () => {
        return {
            getSchema: () => { return schema; },
        };
    });

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        setSchema(temp);
        changeAreaItem(index, temp)
    };
    
    const handleModalCancel = () => {
        setIsModalVisible(false);
        setTemp(schema);
    };

    const handleSelectChange = (value) => {
        const newSchema = { name: value, attributes: {}, children: [] };
        setTemp(newSchema);
    }

    return (
        <li className={styles.item}>
            <span 
            className={styles.content} 
            onClick={showModal}
            >{schema.name ? schema.name + ' Component' : "Current block's content is empty" }</span>
            <span className={styles.delete}>
                <Button 
                onClick={ () => removeItemFromChildren(index)} 
                size="small" type="dashed" danger
                >Delete</Button>
            </span>
            <Modal title="Select Component" visible={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                <Select value={temp.name} className={styles.selector} style={{width: '100%'}} onChange={handleSelectChange}>
                    <Option value='Banner'>Banner Component</Option>
                    <Option value='List'>List Component</Option>
                    <Option value='Footer'>Footer Component</Option>
                </Select>
            </Modal>
        </li>
    )
}

export default forwardRef(AreaItem);