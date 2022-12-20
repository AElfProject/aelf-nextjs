import styles from './styles.module.less';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import React, { useState } from 'react';
import Contract from './ContractDemo';
const options = [
  { label: 'Read Contract', value: 'read' },
  { label: 'Write Contract', value: 'write' },
];
export default function Home() {
  const [value, setValue] = useState('read');

  const onChange = ({ target: { value } }: RadioChangeEvent) => {
    setValue(value);
  };

  return (
    <div className={styles.body}>
      <Radio.Group options={options} onChange={onChange} value={value} optionType="button" />
      <br />
      <Contract status={value}></Contract>
    </div>
  );
}
