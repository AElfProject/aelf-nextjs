import { Card } from 'antd';
import DynamicForm from 'components/DynamicForm';
import { useEffect, useState } from 'react';
// just fetch api once in strict mode when using `react-query`
import { useQuery } from 'react-query';
import { IMethod } from 'types';
import { getContractInstance, getTokenContractAddress } from 'utils/contractInstance';

export default function ContractDemo({ status }: { status: string }) {
  const fetchAddress = async () => {
    const address = await getTokenContractAddress();
    return address;
  };
  const { data: tokenContractAddress } = useQuery('address', fetchAddress);
  const [readMethods, setReadMethods] = useState<IMethod[]>([]);
  const [writeMethods, setWriteMethods] = useState<IMethod[]>([]);
  const getInfo = async () => {
    if (!tokenContractAddress) return;
    const tokenContract = await getContractInstance(tokenContractAddress);
    const methods = adjustMethods(tokenContract);
    setReadMethods(methods.readRes);
    setWriteMethods(methods.writeRes);
  };

  const adjustMethods = (methodsObj: any) => {
    const readRes = [],
      writeRes = [];
    const keysArr = Object.keys(methodsObj);
    for (let i = 0; i < keysArr.length; i++) {
      if (!methodsObj[keysArr[i]].inputTypeInfo) {
        continue;
      }
      const temp: IMethod = {};
      temp.name = keysArr[i];
      temp.input = Object.keys(methodsObj[keysArr[i]].inputTypeInfo.fields);
      temp.fn = methodsObj[keysArr[i]].call;
      if (keysArr[i].startsWith('Get') || keysArr[i].startsWith('Is')) {
        writeRes.push(temp);
      } else {
        readRes.push(temp);
      }
    }
    return {
      readRes,
      writeRes,
    };
  };

  useEffect(() => {
    getInfo();
  }, [tokenContractAddress]);

  return (
    <Card title="get contract">
      <DynamicForm methods={status === 'read' ? readMethods : writeMethods}></DynamicForm>
    </Card>
  );
}
