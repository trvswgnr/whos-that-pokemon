declare module 'turnstone' {
  export interface TurnstoneProps {
    [key: string]: string | number | boolean | Record<string, unknown> | React.FC<Record> | CallableFunction;
  }
  const Turnstone: React.FC<TurnstoneProps>
  export default Turnstone
}


declare module 'fluent-ffmpeg'
declare module 'request'

export global {
  export interface Pokemon {
    id:     number
    name:   string
    image:  string
  }
}
