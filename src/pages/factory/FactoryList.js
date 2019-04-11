import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { List, Card, Form } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import styles from './FactoryList.less';

@connect(({ factory, loading }) => ({
  factory,
  loading: loading.models.factory,
}))
@Form.create()
class FactoryList extends PureComponent {
  state = {};

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'factory/fetch',
      payload: {
        pagesize: 5,
        pagenumber: 0,
      },
    });
  }

  render() {
    const {
      factory: { list },
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
            <FormattedMessage id="factory.openTime" defaultMessage="OpenTime" />
          </span>
          <p>{data.openTime}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="factory.closeTime" defaultMessage="CloseTime" />
          </span>
          <p>{data.closeTime}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>
            <FormattedMessage id="factory.status" defaultMessage="Status" />
          </span>
          <p>{data.status}</p>
        </div>
      </div>
    );
    const ListID = ({ data }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentID}>
          <span>
            <FormattedMessage id="factory.id" defaultMessage="ID" />
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
            title="标准列表"
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
                <List.Item
                  actions={[
                    <a
                      onClick={e => {
                        e.preventDefault();
                        this.showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                  ]}
                >
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

export default FactoryList;
