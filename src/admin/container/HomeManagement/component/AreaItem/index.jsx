import { Button } from 'antd';
import styles from './style.module.scss';


const AreaItem = (props, ref) => {
    const { index, removeItemFromChildren } = props 

    return (
        <li className={styles.item}>
            <span className={styles.content}>Current block's content is empty</span>
            <span className={styles.delete}>
                <Button 
                onClick={ () => removeItemFromChildren(index)} 
                size="small" type="dashed" danger>Delete</Button>
            </span>
        </li>
    )
}

export default AreaItem;