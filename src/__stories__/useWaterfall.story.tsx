import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useBoolean } from 'react-use';
import { useWaterfall } from '..';

const { useState, useEffect } = React;

function DemoInner(props: { wrappedPromises: ((param?: any) => Promise<any>)[] }) {
  const { wrappedPromises } = props;
  const waterfall = useWaterfall();
  const [value, setValue] = useState<number>(-1);
  useEffect(() => {
    waterfall(wrappedPromises).then(setValue);
  }, [wrappedPromises]);
  return <div>{value === -1 ? 'Resolving value...' : 'Value: ' + value} </div>;
}

const Demo = () => {
  const [mounted, toggleMounted] = useBoolean(true);
  const wrappedPromises = [
    () => Promise.resolve(1),
    (previousValue: number) => Promise.resolve(1 + previousValue),
    (previousValue: number) => Promise.resolve(1 + previousValue),
    (previousValue: number) => Promise.resolve(1 + previousValue),
    (previousValue: number) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(previousValue + 1);
        }, 2000);
      });
    },
  ];

  return (
    <div>
      <br />
      {mounted && <DemoInner wrappedPromises={wrappedPromises} />}
    </div>
  );
};

storiesOf('Lifecycle|useWaterfall', module).add('Demo', () => <Demo />);
