import { Input, Button } from 'antd';
import styles from './style.module.scss'


const List = (props) => {
    const { children = [], changeChildren } = props;

    const addItemToChildren = () => {
        const newChildren = [ ...children ];
        newChildren.push({
            name: 'Item',
            attributes: { title: '', description: '', imageUrl: '', link: '' },
            children: []
        });
        changeChildren(newChildren);
    }

    const deleteItemFromChildren = (index) => {
        const newChildren = [ ...children ];
        newChildren.splice(index, 1);
        changeChildren(newChildren);
    }

    const changeChildrenItem = (index, key, value) => {
        const originItem = children[index];
        const item = { ...originItem };
        item.attributes[key] = value;
        const newChildren = [...children];
        newChildren.splice(index, 1, item);
        changeChildren(newChildren);
    }

    return (
    <div className={styles.wrapper}>
        <Button 
            type="primary" 
            className={styles.button}
            onClick={addItemToChildren}
        >Add New List</Button>
        {
            children.map(({ attributes: {
                title, description, imageUrl, link
            } }, index) => (
                <div className={styles.area} key={index}>
                    <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
                    <div className={styles['area-row']}>
                        <span className={styles.label}>List Title</span>
                        <Input 
                            value={title} 
                            className={styles.content} 
                            placeholder="Enter The List Title"  
                            onChange={(e) => {changeChildrenItem(index, 'title', e.target.value)}}
                        />
                    </div>
                    <div className={styles['area-row']}>
                        <span className={styles.label}>Description</span>
                        <Input 
                            value={description} 
                            className={styles.content} 
                            placeholder="Enter The Description"  
                            onChange={(e) => {changeChildrenItem(index, 'description', e.target.value)}}
                        />
                    </div>
                    <div className={styles['area-row']}>
                        <span className={styles.label}>Picture</span>
                        <Input 
                            value={imageUrl} 
                            className={styles.content} 
                            placeholder="Enter The Picture's Url"  
                            onChange={(e) => {changeChildrenItem(index, 'imageUrl', e.target.value)}}
                        />
                    </div>
                    <div className={styles['area-row']}>
                        <span className={styles.label}>Jump Link</span>
                        <Input 
                            value={link} 
                            className={styles.content} 
                            placeholder="Enter The Jump Link"  
                            onChange={(e) => {changeChildrenItem(index, 'link', e.target.value)}}
                        />
                    </div>
                </div>
            ))
        }
    </div>
    )
}

export default List;