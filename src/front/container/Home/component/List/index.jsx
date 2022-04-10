import styles from './style.module.scss'

const List = ({ schema }) => {
  const { children = [] } = schema;
  
  return (
    <div className="wrapper">
      <ul className={styles.list}>
        {
          children.map((item, index) => {
            const { attributes = {} } = item;
            const { title, description, imageUrl, link } = attributes;
            return(
              <li className={styles.item} key={index}>
                <a className={styles.link} href={link} target="_blank" rel="noreferrer">
                  <img className={styles.img} src={imageUrl} height="100" width="400" alt={title} />
                  <h4 className={styles.title}>{title || 'No Title'}</h4>
                  <p className={styles.desc}>{description || 'No Description'}</p>
                </a>
              </li>           
            )
          })
        }
      </ul>
    </div>
    );
  }
  
export default List;