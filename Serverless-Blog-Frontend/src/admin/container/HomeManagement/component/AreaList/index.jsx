import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'; 
import { SortableContainer } from 'react-sortable-hoc';
import { getAddPageChildrenAction, getChangePageChildPositionAction } from '../../../../store/action';
import AreaItem from '../AreaItem';
import styles from './style.module.scss';

const SortableList = SortableContainer(({ list }) => {
    return (
        <ul className={styles.list}>
                {
                    list.map((item, index) => (
                        <AreaItem key={index} index={index} value={index}/>
                ))}
        </ul>
    );
  });

const AreaList = () => {
    
    const dispatch = useDispatch();
    const children = useSelector((state) => state.common.schema?.children || []);

    const addPageChildren = () => {
        dispatch(getAddPageChildrenAction())
    }

    const onSortEnd = ({oldIndex, newIndex}) => {
        dispatch(getChangePageChildPositionAction(oldIndex, newIndex));
    }

    return  (
        <div>
            <SortableList distance={5} lockAxis="y" list={children} onSortEnd={onSortEnd}/>
            <Button type="primary" ghost onClick={addPageChildren}>Add New Page Block</Button>          
        </div>
    );
}

export default AreaList;