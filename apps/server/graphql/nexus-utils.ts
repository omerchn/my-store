import { OutputDefinitionBlock, InputDefinitionBlock } from 'nexus/dist/core'

type DefTypes = {
  string: 'string' | 'id'
  number: 'int' | 'float'
  boolean: 'boolean'
}

type DefObj<I> = {
  [Key in keyof I]: I[Key] extends string | undefined
    ? DefTypes['string']
    : I[Key] extends number | undefined
    ? DefTypes['number']
    : I[Key] extends boolean | undefined
    ? DefTypes['boolean']
    : DefTypes['string'] | DefTypes['number'] | DefTypes['boolean']
}

export function def<I>(
  t:
    | OutputDefinitionBlock<any>
    | InputDefinitionBlock<any>
    | Omit<OutputDefinitionBlock<any>, 'nonNull' | 'nullable'>
    | Omit<InputDefinitionBlock<any>, 'nonNull' | 'nullable'>,
  defObj: DefObj<I>
): void {
  for (let key in defObj) {
    t[defObj[key]](key)
  }
}
