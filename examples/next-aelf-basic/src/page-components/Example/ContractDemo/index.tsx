import { Card, Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { AElfReactProvider, getSignatureByBridge, useAElfReact } from '@aelf-react/core';
import AElf from 'aelf-sdk';
import { checkAElfBridge } from 'utils/checkAElfBridge';
function ContractApp() {
  // defaultAElfBridge is the first node, which is tDVW
  const { account, activate, deactivate, pubKey, defaultAElfBridge, aelfBridges } = useAElfReact();
  const [blockHeight, setBlockHeight] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [tokenInfo, setTokenInfo] = useState<any>();
  const [signature, setSignature] = useState<any>();
  const changeWallet = useCallback(async () => {
    await deactivate();
    activate();
  }, [activate, deactivate]);
  useEffect(() => {
    activate();
  }, [activate]);
  const childrenList = () => {
    const list = [];
    account && list.push(`account:${account}`);
    pubKey && list.push(`pubKey:${pubKey}`);
    blockHeight && list.push(`blockHeight:${JSON.stringify(blockHeight)}`);
    contract && list.push(`contract methods:${JSON.stringify(Object.keys(contract))}`);
    tokenInfo && list.push(`ELF tokenInfo:${JSON.stringify(tokenInfo)}`);
    signature && list.push(`signature example:${signature}`);
    return list;
  };
  return (
    <>
      {childrenList().map((i, k) => (
        <p key={k}>{i}</p>
      ))}
      <Button onClick={() => activate()}>activate</Button>
      <Button onClick={() => deactivate()}>deactivate</Button>
      <Button onClick={() => changeWallet()}>changeWallet</Button>
      <Button
        onClick={async () => {
          if (!aelfBridges) return;
          try {
            // aelf-bridge only supports one node and needs to check whether it is connected
            // NightElf does not require this function
            await checkAElfBridge(aelfBridges.tDVW);
            const tDVWReq = await aelfBridges.tDVW.chain.getBlockHeight();
            // aelf-bridge returns the result directly NightElf will return the result in the result
            setBlockHeight({
              tDVWBlockHeight: tDVWReq.result || tDVWReq,
            });
          } catch (error) {
            setBlockHeight(`${error}`);
          }
        }}>
        getBlockHeight
      </Button>
      <Button
        onClick={async () => {
          if (!defaultAElfBridge || !account) return;
          const req = await defaultAElfBridge.chain.contractAt('ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx', {
            address: account,
          });
          setContract(req.result || req);
        }}>
        contractAt Token contract
      </Button>
      <Button
        onClick={async () => {
          if (!contract) return;
          const req = await contract.GetTokenInfo.call({ symbol: 'ELF' });
          setTokenInfo(req.result || req);
        }}>
        GetTokenInfo
      </Button>
      <Button
        onClick={async () => {
          if (!defaultAElfBridge || !account) return;
          const signature = await getSignatureByBridge(defaultAElfBridge, account, AElf.utils.sha256('example'));
          setSignature(signature);
        }}>
        Signature
      </Button>
    </>
  );
}
export default function ContractDemo() {
  return (
    <Card title="get contract">
      <AElfReactProvider
        appName="example"
        nodes={{
          tDVW: { rpcUrl: 'https://tdvw-test-node.aelf.io', chainId: 'tDVW' },
        }}>
        <ContractApp></ContractApp>
      </AElfReactProvider>
    </Card>
  );
}
