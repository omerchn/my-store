/* eslint-disable */
import {
  CallOptions,
  ChannelCredentials,
  Client,
  ClientOptions,
  ClientReadableStream,
  ClientUnaryCall,
  handleServerStreamingCall,
  handleUnaryCall,
  makeGenericClientConstructor,
  Metadata,
  ServiceError,
  UntypedServiceImplementation,
} from "@grpc/grpc-js";
import _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";

export const protobufPackage = "itemsService";

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  isBought: boolean;
}

export interface ItemInput {
  name: string;
  description: string;
  price: number;
}

export interface ItemId {
  id: string;
}

function createBaseItem(): Item {
  return { id: "", name: "", description: "", price: 0, isBought: false };
}

export const Item = {
  encode(message: Item, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.price !== 0) {
      writer.uint32(33).double(message.price);
    }
    if (message.isBought === true) {
      writer.uint32(40).bool(message.isBought);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Item {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItem();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.price = reader.double();
          break;
        case 5:
          message.isBought = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Item {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
      isBought: isSet(object.isBought) ? Boolean(object.isBought) : false,
    };
  },

  toJSON(message: Item): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.price !== undefined && (obj.price = message.price);
    message.isBought !== undefined && (obj.isBought = message.isBought);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Item>, I>>(object: I): Item {
    const message = createBaseItem();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.price = object.price ?? 0;
    message.isBought = object.isBought ?? false;
    return message;
  },
};

function createBaseItemInput(): ItemInput {
  return { name: "", description: "", price: 0 };
}

export const ItemInput = {
  encode(message: ItemInput, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.price !== 0) {
      writer.uint32(25).double(message.price);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemInput {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.price = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemInput {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      price: isSet(object.price) ? Number(object.price) : 0,
    };
  },

  toJSON(message: ItemInput): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.price !== undefined && (obj.price = message.price);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemInput>, I>>(object: I): ItemInput {
    const message = createBaseItemInput();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.price = object.price ?? 0;
    return message;
  },
};

function createBaseItemId(): ItemId {
  return { id: "" };
}

export const ItemId = {
  encode(message: ItemId, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ItemId {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseItemId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ItemId {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: ItemId): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ItemId>, I>>(object: I): ItemId {
    const message = createBaseItemId();
    message.id = object.id ?? "";
    return message;
  },
};

export type ItemsService = typeof ItemsService;
export const ItemsService = {
  addOne: {
    path: "/itemsService.Items/addOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ItemInput) => Buffer.from(ItemInput.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ItemInput.decode(value),
    responseSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  getOne: {
    path: "/itemsService.Items/getOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ItemId) => Buffer.from(ItemId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ItemId.decode(value),
    responseSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
  deleteOne: {
    path: "/itemsService.Items/deleteOne",
    requestStream: false,
    responseStream: false,
    requestSerialize: (value: ItemId) => Buffer.from(ItemId.encode(value).finish()),
    requestDeserialize: (value: Buffer) => ItemId.decode(value),
    responseSerialize: (value: ItemId) => Buffer.from(ItemId.encode(value).finish()),
    responseDeserialize: (value: Buffer) => ItemId.decode(value),
  },
  streamAll: {
    path: "/itemsService.Items/streamAll",
    requestStream: false,
    responseStream: true,
    requestSerialize: (value: Empty) => Buffer.from(Empty.encode(value).finish()),
    requestDeserialize: (value: Buffer) => Empty.decode(value),
    responseSerialize: (value: Item) => Buffer.from(Item.encode(value).finish()),
    responseDeserialize: (value: Buffer) => Item.decode(value),
  },
} as const;

export interface ItemsServer extends UntypedServiceImplementation {
  addOne: handleUnaryCall<ItemInput, Item>;
  getOne: handleUnaryCall<ItemId, Item>;
  deleteOne: handleUnaryCall<ItemId, ItemId>;
  streamAll: handleServerStreamingCall<Empty, Item>;
}

export interface ItemsClient extends Client {
  addOne(request: ItemInput, callback: (error: ServiceError | null, response: Item) => void): ClientUnaryCall;
  addOne(
    request: ItemInput,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  addOne(
    request: ItemInput,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  getOne(request: ItemId, callback: (error: ServiceError | null, response: Item) => void): ClientUnaryCall;
  getOne(
    request: ItemId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  getOne(
    request: ItemId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: Item) => void,
  ): ClientUnaryCall;
  deleteOne(request: ItemId, callback: (error: ServiceError | null, response: ItemId) => void): ClientUnaryCall;
  deleteOne(
    request: ItemId,
    metadata: Metadata,
    callback: (error: ServiceError | null, response: ItemId) => void,
  ): ClientUnaryCall;
  deleteOne(
    request: ItemId,
    metadata: Metadata,
    options: Partial<CallOptions>,
    callback: (error: ServiceError | null, response: ItemId) => void,
  ): ClientUnaryCall;
  streamAll(request: Empty, options?: Partial<CallOptions>): ClientReadableStream<Item>;
  streamAll(request: Empty, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<Item>;
}

export const ItemsClient = makeGenericClientConstructor(ItemsService, "itemsService.Items") as unknown as {
  new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): ItemsClient;
  service: typeof ItemsService;
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
