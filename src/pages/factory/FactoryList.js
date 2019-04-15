import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { List, Card, Form, Modal, Input, Dropdown, Button, TimePicker } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { FormattedMessage } from 'umi/locale';
import Result from '@/components/Result';
import styles from './FactoryList.less';

const FormItem = Form.Item;

@connect(({ factory, loading }) => ({
  factory,
  loading: loading.models.factory,
}))
@Form.create()
class FactoryList extends PureComponent {
  state = { visible: false, done: false };

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

  showModal = () => {
    this.setState({
      visible: true,
      current: undefined,
    });
  };

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });

      console.log(fieldsValue);
      /* eslint-disable */
      fieldsValue.openTime = fieldsValue.openTime.format('HH:mm:ss');
      fieldsValue.closeTime = fieldsValue.closeTime.format('HH:mm:ss');
      /* eslint-enable */
      if (current) {
        dispatch({
          type: 'factory/update',
          payload: { id, ...fieldsValue },
        });
      } else {
        dispatch({
          type: 'factory/submit',
          payload: { ...fieldsValue },
        });
      }
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'factory/submit',
      payload: { id },
    });
  };

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
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { visible, done, current = {} } = this.state;

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="名称" {...this.formLayout}>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入名称' }],
              initialValue: current.name,
            })(<Input placeholder="请输入名称" />)}
          </FormItem>
          <FormItem label="头像" {...this.formLayout}>
            {getFieldDecorator('headPortrait', {
              rules: [{ required: true, message: '请输入电话' }],
              initialValue: current.headPortrait,
            })(<Input placeholder="请输入头像" />)}
          </FormItem>
          <FormItem label="电话" {...this.formLayout}>
            {getFieldDecorator('telephone', {
              rules: [{ required: true, message: '请输入电话' }],
              initialValue: current.telephone,
            })(<Input placeholder="请输入电话" />)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('openTime', {
              rules: [{ required: true, message: '请选择开始时间' }],
              initialValue: current.openTime ? moment(current.openTime, 'HH:mm:ss') : null,
            })(
              <TimePicker
                showTime
                placeholder="请选择请选择开始时间"
                format="HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('closeTime', {
              rules: [{ required: true, message: '请选择结束时间' }],
              initialValue: current.closeTime ? moment(current.closeTime, 'HH:mm:ss') : null,
            })(
              <TimePicker
                showTime
                placeholder="请选择结束时间"
                format="HH:mm:ss"
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem label="数量" {...this.formLayout}>
            {getFieldDecorator('maxQuantity', {
              rules: [{ required: true, message: '请输入数量' }],
              initialValue: current.maxQuantity,
            })(<Input placeholder="请输入数量" type="number" />)}
          </FormItem>
          <FormItem label="地址" {...this.formLayout}>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入地址' }],
              initialValue: current.address,
            })(<Input placeholder="请输入地址" />)}
          </FormItem>
        </Form>
      );
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
            title="工厂列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
          >
            <Button
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.showModal}
              ref={component => {
                /* eslint-disable */
                this.addBtn = findDOMNode(component);
                /* eslint-enable */
              }}
            >
              添加
            </Button>
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
        <Modal
          title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default FactoryList;
