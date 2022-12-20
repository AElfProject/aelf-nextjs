import { IMethod } from 'types';
import FormItem from './formItem';
export default function DynamicForm({ methods }: { methods: IMethod[] }) {
  return (
    <div>
      {methods.map((ele) => {
        return <FormItem key={ele.name} name={ele.name} input={ele.input} fn={ele.fn}></FormItem>;
      })}
    </div>
  );
}
