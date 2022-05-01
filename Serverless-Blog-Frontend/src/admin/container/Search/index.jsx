import { useState } from 'react';
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import styles from './style.module.scss'

const useSearched = (value) => {
  const [ searched, setSearched ] = useState(false)
  const toggleSearched = () => { setSearched(!searched) };
  return { searched, toggleSearched }
}

const Search = () => {
  const { Search } = Input;
  const { Content } = Layout;
  
  const { searched, toggleSearched } = useSearched();

  const suffix = (
    <AudioOutlined style={{ fontSize: 16, color: '#1890ff'}}/>
  );

  return (
    <div>
      <div className={styles.search}>
        <Space direction="vertical">
          <Search
            placeholder="Please Input Search Content"
            enterButton="Search"
            size="large"
            suffix={suffix}
            style = {{ width: 700 }}
            onSearch={toggleSearched}
          />
        </Space>
      </div>
      <div className={styles.content}>
        <Content>
          {
            searched
            ? <span>This is the result</span>
            : <span></span>
          }
        </Content>
      </div>
    </div>
  );
}

export default Search;