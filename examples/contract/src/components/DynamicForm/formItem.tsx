// Every item made up with title, params input and query button.

import { Col, Row, Form, Input, Button } from 'antd';
import { useState } from 'react';
import { IMethod } from 'types';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './styles.module.less';
export default function FormItem({ name, input, fn }: IMethod) {
  const [form] = Form.useForm();
  const [toggle, setToggle] = useState(false);
  const [res, setRes] = useState('');
  const query = async () => {
    // get all fileds value with param true
    const filedsValue = form.getFieldsValue(true);
    try {
      const result = await fn(filedsValue);
      setRes(result);
    } catch (e: any) {
      setRes(e);
    }
  };
  return (
    <>
      <Row onClick={() => setToggle(!toggle)} justify="space-between" className={styles['form-item-title-container']}>
        <Col span={23}>{name}</Col>
        <Col span={1}>{toggle ? <DownOutlined /> : <UpOutlined />}</Col>
      </Row>
      {toggle && (
        <Form form={form} name={name} key={name}>
          {input?.map((ele) => (
            <Form.Item key={ele} label={ele} name={ele}>
              <Input />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" onClick={query}>
              Query
            </Button>
          </Form.Item>
        </Form>
      )}
      {toggle && res && (
        <>
          <div>Response Body</div>
          <div className={styles['form-item-res-content']}>
            <code>{JSON.stringify(res)}</code>
          </div>
        </>
      )}
    </>
  );
}
