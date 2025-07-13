import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Load the proto file
const PROTO_PATH = path.join(__dirname, '../proto/a.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the package
const userProto = grpc.loadPackageDefinition(packageDefinition);

// Create gRPC client instance
const client = new userProto.UserService(
  'localhost:50051', // or user-service:50051 if in Docker
  grpc.credentials.createInsecure()
);

export default client;
