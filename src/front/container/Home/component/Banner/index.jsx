import styles from './style.module.scss'
import { parseJsonByString } from '../../../../../common/utils'

const schema = parseJsonByString(window.localStorage?.schema, []);
const bannerSchema = schema?.children?.[0] || {};

const Banner = () => {
  const title = bannerSchema?.attributes?.title || "Kevin's Personal Blog";
  const description = bannerSchema?.attributes?.description || "This is the description area"

    return (
      <div className="wrapper">
        <div className={styles.banner}>
          <div className={styles.person}>
            <img className={styles.avatar} src="https://serverless-project-static-files-2.oss-us-west-1.aliyuncs.com/images/avatar.jpeg" alt="Kevin" />
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    );
  }
  
export default Banner;