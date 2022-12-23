import { Button, Card } from 'antd';
import DynamicForm from 'components/DynamicForm';
import { useState, useCallback } from 'react';
// just fetch api once in strict mode when using `react-query`
import { IMethod } from 'types';
import { getContractInstance } from 'utils/contractInstance';
import { useAElfReact } from '@aelf-react/core';
import styles from '../styles.module.less';
import { useEffectOnce } from 'react-use';
export default function ContractDemo() {
  const { account, activate, deactivate } = useAElfReact();
  const [methods, setMethods] = useState<IMethod[]>([]);
  const getInfo = async () => {
    const tokenContract = await getContractInstance('JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE');
    const tokenMethods = adjustMethods(tokenContract);
    setMethods(tokenMethods);
  };
  const changeWallet = useCallback(async () => {
    await deactivate();
    activate();
  }, [activate, deactivate]);
  const adjustMethods = (methodsObj: any) => {
    const res = [];
    const keysArr = Object.keys(methodsObj);
    for (let i = 0; i < keysArr.length; i++) {
      if (!methodsObj[keysArr[i]].inputTypeInfo) {
        continue;
      }
      const temp: any = {};
      temp.name = keysArr[i];
      temp.input = Object.keys(methodsObj[keysArr[i]].inputTypeInfo.fields);
      temp.fn = methodsObj[keysArr[i]];
      res.push(temp);
    }
    return res;
  };

  useEffectOnce(() => {
    activate();
    getInfo();
  });

  return (
    <Card title="Contract Demo">
      <Card type="inner" title="Wallet" className={styles['contract-wallet']}>
        <Button className={styles['contract-wallet-btn']} onClick={() => activate()}>
          activate
        </Button>
        <Button className={styles['contract-wallet-btn']} onClick={() => changeWallet()}>
          changeWallet
        </Button>
        <div className={styles['contract-wallet-account']}>account: {account}</div>
      </Card>
      <Card type="inner" title="Dynamic Form" className={styles['contract-methods']}>
        <DynamicForm methods={methods}></DynamicForm>
      </Card>
    </Card>
  );
}
