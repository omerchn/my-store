/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientUnaryCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from '@grpc/grpc-js'
import _m0 from 'protobufjs/minimal'
import { Empty } from '../google/protobuf/empty'

export const protobufPackage = 'itemsPackage'

export interface Item {
  id: string
  name: string
  description: string
  price: number
  isBought: boolean
}

export interface ItemNoId {
  name: string
  description: string
  price: number
  isBought: boolean
}

export interface Items {
  items: Item[]
}

function createBaseItem(): Item {
  return { id: '', name: '', description: '', price: 0, isBought: false }
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id)
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name)
    }
    if (message.description !== '') {
      writer.uint32(26).string(message.description)
    }
    if (message.price !== 0) {
      writer.uint32(37).float(message.price)
    }
    if (message.isBought === true) {
      writer.uint32(40).bool(message.isBought)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseItem()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string()
          break
        case 2:
          message.name = reader.string()
          break
        case 3:
          message.description = reader.string()
          break
        case 4:
          message.price = reader.float()
          break
        case 5:
          message.isBought = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Item {
    return {
      id: isSet(object.id) ? String(object.id) : '',
      name: isSet(object.name) ? String(object.name) : '',
      description: isSet(object.description) ? String(object.description) : '',
      price: isSet(object.price) ? Number(object.price) : 0,
      isBought: isSet(object.isBought) ? Boolean(object.isBought) : false,
    }
  },

  toJSON(message: Item): unknown {
    const obj: any = {}
    message.id !== undefined && (obj.id = message.id)
    message.name !== undefined && (obj.name = message.name)
    message.description !== undefined && (obj.description = message.description)
    message.price !== undefined && (obj.price = message.price)
    message.isBought !== undefined && (obj.isBought = message.isBought)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem()
    message.id = object.id ?? ''
    message.name = object.name ?? ''
    message.description = object.description ?? ''
    message.price = object.price ?? 0
    message.isBought = object.isBought ?? false
    return message
  },
}

function createBaseItemNoId(): ItemNoId {
  return { name: '', description: '', price: 0, isBought: false }
}

export const ItemNoId = {
  encode(
    message: ItemNoId,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name)
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description)
    }
    if (message.price !== 0) {
      writer.uint32(29).float(message.price)
    }
    if (message.isBought === true) {
      writer.uint32(32).bool(message.isBought)
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemNoId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseItemNoId()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string()
          break
        case 2:
          message.description = reader.string()
          break
        case 3:
          message.price = reader.float()
          break
        case 4:
          message.isBought = reader.bool()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): ItemNoId {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      description: isSet(object.description) ? String(object.description) : '',
      price: isSet(object.price) ? Number(object.price) : 0,
      isBought: isSet(object.isBought) ? Boolean(object.isBought) : false,
    }
  },

  toJSON(message: ItemNoId): unknown {
    const obj: any = {}
    message.name !== undefined && (obj.name = message.name)
    message.description !== undefined && (obj.description = message.description)
    message.price !== undefined && (obj.price = message.price)
    message.isBought !== undefined && (obj.isBought = message.isBought)
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<ItemNoId>, I>>(object: I): ItemNoId {
    const message = createBaseItemNoId()
    message.name = object.name ?? ''
    message.description = object.description ?? ''
    message.price = object.price ?? 0
    message.isBought = object.isBought ?? false
    return message
  },
}

function createBaseItems(): Items {
  return { items: [] }
}

export const Items = {
  encode(message: Items, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.items) {
      Item.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Items {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input)
    let end = length === undefined ? reader.len : reader.pos + length
    const message = createBaseItems()
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.items.push(Item.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Items {
    return {
      items: Array.isArray(object?.items)
        ? object.items.map((e: any) => Item.fromJSON(e))
        : [],
    }
  },

  toJSON(message: Items): unknown {
    const obj: any = {}
    if (message.items) {
      obj.items = message.items.map((e) => (e ? Item.toJSON(e) : undefined))
    } else {
      obj.items = []
    }
    return obj
  },

  fromPartial<I extends Exact<DeepPartial<Items>, I>>(object: I): Items {
    const message = createBaseItems()
    message.items = object.items?.map((e) => Item.fromPartial(e)) || []
    return message
  },
}

export type ItemsServiceService = typeof ItemsServiceService
export const ItemsServiceService = {
  addOne: {
    path: '/itemsPackage.ItemsService/addOne',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Item.decode(value),
    responseSerialize: (value: Item) =>
      Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  getOne: {
    path: '/itemsPackage.ItemsService/getOne',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) =>
      Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Item) =>
      Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  getAll: {
    path: '/itemsPackage.ItemsService/getAll',
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: Empty) =>
      Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Items) =>
      Buffer.from(Items.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Items.decode(value),
  },
} as const

export interface ItemsServiceServer extends UntypedServiceImplementation {
  addOne: handleUnaryCall<Item, Item>
  getOne: handleUnaryCall<Empty, Item>
  getAll: handleUnaryCall<Empty, Items>
}

export interface ItemsServiceClient extends Client {
  addOne(
    request: Item,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  addOne(
    request: Item,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  addOne(
    request: Item,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  getOne(
    request: Empty,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  getOne(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  getOne(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void
  ): ClientUnaryCall
  getAll(
    request: Empty,
    callback: (error: ServiceError | null, response: Items) => void
  ): ClientUnaryCall
  getAll(
    request: Empty,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Items) => void
  ): ClientUnaryCall
  getAll(
    request: Empty,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Items) => void
  ): ClientUnaryCall
}

export const ItemsServiceClient = makeGenericClientConstructor(
  ItemsServiceService,
  'itemsPackage.ItemsService'
) as unknown as {
  new (
    address: string,
    credentials: ChannelCredentials,
    options?: Partial<ClientOptions>
  ): ItemsServiceClient
  service: typeof ItemsServiceService
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>

type KeysOfUnion<T> = T extends T ? keyof T : never
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never
    }

function isSet(value: any): boolean {
  return value !== null && value !== undefined
}
