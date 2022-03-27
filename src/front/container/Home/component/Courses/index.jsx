import styles from './style.module.scss'

const Courses = () => {
    return (
      <div className="wrapper">
        <ul className={styles.list}>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>
              This is the description, This is the description, This is the description, This is the description, This is the description
              This is the description, This is the description, This is the description, This is the description, This is the description
              This is the description, This is the description, This is the description, This is the description, This is the description
            </p>
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>desc</p>
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>desc</p>
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>desc</p>
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>desc</p>
          </li>
          <li className={styles.item}>
            <img className={styles.img} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/dino.png" height="100" width="400" alt="Dino Game" />
            <h4 className={styles.title}>This is title</h4>
            <p className={styles.desc}>desc</p>
          </li>
        </ul>
      </div>
    );
  }
  
export default Courses;