import { Input, Switch } from 'antd';
import styles from './style.module.scss'

const { TextArea } = Input;

const Banner = (props) => {
    const { attributes = {}, changeAttributes } = props;
    const { 
        title, description, showSmallPic, smallPicUrl, backgroundUrl, backgroundHeight
    } = attributes; 

    const handleShowSmallPicChange = (checked) => {
        if(!checked) {
            changeAttributes({
                showSmallPic: checked,
                smallPicUrl: ''
            })
        }else {
            changeAttributes({showSmallPic: checked});
        }
    }

    return (
    <div>
        <div className={styles.row}>
            <span className={styles.label}>Blog Title</span>
            <Input 
                value={title} 
                className={styles.content} 
                placeholder="Enter The Blog Title" 
                onChange={(e) => {changeAttributes({ title: e.target.value })}}
            />
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Description</span>
            <TextArea 
                value={description}
                className={styles.content} 
                rows={3} 
                placeholder="Enter The Blog Description" 
                onChange={(e) => {changeAttributes({ description: e.target.value })}}
            />
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Show Image</span>
            <Switch checked={showSmallPic} onChange={handleShowSmallPicChange}/>
        </div>
        {
            showSmallPic ? (
                <div className={styles.row}>
                    <span className={styles.label}>Image URL</span>
                    <Input 
                        value={smallPicUrl} 
                        className={styles.content} 
                        placeholder="Enter the url of image" 
                        onChange={(e) => {changeAttributes({ smallPicUrl: e.target.value })}}
                    />
                </div>
            ) : null
        }
        <div className={styles.row}>
            <span className={styles.label}>Background URL</span>
            <Input 
                value={backgroundUrl} 
                className={styles.content} 
                placeholder="Enter the url of background" 
                onChange={(e) => {changeAttributes({ backgroundUrl: e.target.value })}}
            />
        </div>
        <div className={styles.row}>
            <span className={styles.label}>Background Height</span>
            <Input 
                type="number"
                value={backgroundHeight} 
                className={styles.content} 
                placeholder="Enter the height of background" 
                onChange={(e) => {changeAttributes({ backgroundHeight: e.target.value })}}
            />
        </div>
    </div>
    )
}

export default Banner;