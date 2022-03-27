import { useState, forwardRef, useImperativeHandle } from 'react';
import { Input } from 'antd';
import styles from './style.module.scss'

const { TextArea } = Input;


const PageSetting = (props, ref) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    useImperativeHandle(ref, () => {
        return { title, description }
    });

    return (
        <div>
            <div className={styles.row}>
                <span className={styles.label}>Blog Title</span>
                <Input 
                    value={title} 
                    className={styles.content} 
                    placeholder="Enter The Blog Title" 
                    onChange={handleTitleChange}
                />
            </div>
            <div className={styles.row}>
                <span className={styles.label}>Blog Description</span>
                <TextArea 
                    value={description}
                    className={styles.content} 
                    rows={3} 
                    placeholder="Enter The Blog Description" 
                    onChange={handleDescriptionChange}
                />
            </div>
        </div>
    )
}

export default forwardRef(PageSetting);