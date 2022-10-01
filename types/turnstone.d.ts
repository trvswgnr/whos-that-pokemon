declare module 'turnstone' {
  export interface TurnstoneProps {
    [key: string]: string | number | boolean | Record<string, unknown> | React.FC<Record> | CallableFunction;
  }
  const Turnstone: React.FC<TurnstoneProps>
  export default Turnstone
}
