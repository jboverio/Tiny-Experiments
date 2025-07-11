import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Path to our .proto file
const PROTO_PATH = './proto/greeter.proto';

// In a real application, you would use a tool like grpc-tools or ts-proto
// to generate TypeScript types from your .proto file. This gives you
// full type safety for your services and messages.
// For this didactic example, we'll use generic types to keep it simple.

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the package definition as a gRPC object
const greeterProto = grpc.loadPackageDefinition(packageDefinition).greeter;

// Create a gRPC server
const server = new grpc.Server();

// Implement the SayHello method
// This is our "resolver" for the SayHello RPC call
const sayHello = (call, callback) => {
  const name = call.request.name || 'World';
  console.log(`Received greeting request for: ${name}`);
  callback(null, { message: `Hello, ${name}` });
};

// Add the service to the server
// The greeterProto.Greeter.service object contains the service definition from the .proto file
// We're telling the server to use our `sayHello` function for the `SayHello` method.
server.addService((greeterProto as any).Greeter.service, { SayHello: sayHello });

// Start the server
server.bindAsync(
  '0.0.0.0:50051', // We'll listen on port 50051
  grpc.ServerCredentials.createInsecure(), // We're not using SSL for this example
  (err, port) => {
    if (err) {
      console.error(`Error starting server: ${err.message}`);
      return;
    }
    console.log(`Server listening on port ${port}`);
    server.start();
  }
); 