import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Form } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import styles from './UserList.less';

@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
class UserList extends PureComponent {
  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetch',
      payload: {
        pagesize: 5,
        pagenumber: 0,
      },
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      console.log(fieldsValue);
      /* eslint-disable */
      fieldsValue.openTime = fieldsValue.openTime.format('HH:mm:ss');
      fieldsValue.closeTime = fieldsValue.closeTime.format('HH:mm:ss');
      /* eslint-enable */
      if (current) {
        dispatch({
          type: 'user/update',
          payload: { id, ...fieldsValue },
        });
      } else {
        dispatch({
          type: 'user/submit',
          payload: { ...fieldsValue },
        });
      }
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/submit',
      payload: { id },
    });
  };

  render() {
    const {
      user: { list },
      loading,
    } = this.props;
    console.log(list);

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="user.account" defaultMessage="Account" />
          </span>
          <p>{data.account}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="user.wechat" defaultMessage="Wechat" />
          </span>
          <p>{data.wechat}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="user.qq" defaultMessage="QQ" />
          </span>
          <p>{data.qq}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="user.address" defaultMessage="Address" />
          </span>
          <p>{data.address}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="user.telephone" defaultMessage="Telephone" />
          </span>
          <p>{data.telephone}</p>
        </div>
      </div>
    );
    const ListID = ({ data }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentID}>
          <span>
            <FormattedMessage id="user.id" defaultMessage="ID" />
          </span>
          <p>{data.id}</p>
        </div>
      </div>
    );
    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card
            className={styles.listCard}
            bordered={false}
            title="用户列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item actions={[]}>
                  <List.Item.Meta
                    avatar={<ListID data={item} />}
                    title={item.name}
                    description={item.address}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default UserList;
