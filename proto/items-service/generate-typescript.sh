#!/bin/bash

OUT_DIR="./__generated__/items-service"
PROTO_DIR="../../proto/items-service"

mkdir -p ${OUT_DIR}

grpc_tools_node_protoc \
--plugin=../../node_modules/.bin/protoc-gen-ts_proto.cmd \
--ts_proto_out=${OUT_DIR} \
--ts_proto_opt=esModuleInterop=true \
--ts_proto_opt=env=node \
--ts_proto_opt=outputServices=grpc-js \
--proto_path=${PROTO_DIR} \
items.proto