import { useState, useImperativeHandle, forwardRef } from 'react';
import { Button } from 'antd';
import AreaItem from '../AreaItem';
import styles from './style.module.scss'


const AreaList = (props, ref) => {
    const [ children, setChildren ] = useState(props.children);

    const addItemToChildren = () => {
        const newChildren = [...children];
        newChildren.push({});
        setChildren(newChildren);
    }

    const removeItemFromChildren = (index) => {
        const newChildren = [...children];
        newChildren.splice(index, 1);
        setChildren(newChildren);
    }

    useImperativeHandle(ref, () => {
        return { children };
    });

    return  (
        <div>
            <ul className={styles.list}>
                {
                    children.map((item, index) => (
                        <AreaItem key={index} index={index} removeItemFromChildren={removeItemFromChildren}/>
                    ))
                }
            </ul>
            <Button type="primary" ghost onClick={addItemToChildren}>Add New Page Block</Button>
            
        </div>
    );
}

export default forwardRef(AreaList);