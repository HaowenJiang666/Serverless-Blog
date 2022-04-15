import { Input, Button } from 'antd';
import styles from './style.module.scss'

const Footer = (props) => {
    const { 
        attributes = {}, changeAttributes, children = [], changeChildren 
    } = props;
    const { copyright, record } = attributes; 

    const addItemToChildren = () => {
        const newChildren = [ ...children ];
        newChildren.push({
            name: 'Item',
            attributes: { title: '', link: '' },
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
            <div className={styles['attribute-row']}>
                <span className={styles.label}>Copyright</span>
                <Input 
                    value={copyright} 
                    className={styles.content} 
                    placeholder="Enter The Copyright" 
                    onChange={(e) => {changeAttributes({ copyright: e.target.value })}}
                />
            </div>
            <div className={styles['attribute-row']}>
                <span className={styles.label}>Record</span>
                <Input 
                    value={record}
                    className={styles.content} 
                    placeholder="Enter The Record" 
                    onChange={(e) => {changeAttributes({ record: e.target.value })}}
                />
            </div>
            <Button 
                type="primary" 
                className={styles.button}
                onClick={addItemToChildren}
            >Add New List</Button>
            {
                children.map(({ attributes: { title, link } }, index) => (
                    <div className={styles.area} key={index}>
                        <div className={styles.delete} onClick={() => deleteItemFromChildren(index)}>X</div>
                        <div className={styles['area-row']}>
                            <span className={styles.label}>Title</span>
                            <Input 
                                value={title} 
                                className={styles.content} 
                                placeholder="Enter The Title"  
                                onChange={(e) => {changeChildrenItem(index, 'title', e.target.value)}}
                            />
                        </div>
                        <div className={styles['area-row']}>
                            <span className={styles.label}>Link</span>
                            <Input 
                                value={link} 
                                className={styles.content} 
                                placeholder="Enter The Link"  
                                onChange={(e) => {changeChildrenItem(index, 'link', e.target.value)}}
                            />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Footer;