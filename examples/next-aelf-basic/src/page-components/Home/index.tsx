import React from 'react';
import Link from 'next/link';
import styles from './styles.module.less';
export default function Home() {
  return (
    <div className={styles.body}>
      <Link href={`/example`}>Framework Usage - demo code</Link>
      <br />
      <Link href={`/micro-app`}>Micro Frontends - Micro-APP</Link>
      <br />
      <Link href={`/monitor`}>Monitor - Sentry & Firebase</Link>
    </div>
  );
}
