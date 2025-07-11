import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Path to our .proto file
const PROTO_PATH = './proto/greeter.proto';

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

// Create a client for the Greeter service
// Again, in a real app, you'd use generated types here.
const client = new (greeterProto as any).Greeter(
  'localhost:50051', // The address of the server
  grpc.credentials.createInsecure() // Connect without SSL
);

// Get the name from the command line, or use a default
const name = process.argv[2] || 'world';

// Call the SayHello method on the server
console.log(`Sending request for name: ${name}`);
client.SayHello({ name: name }, (err: grpc.ServiceError | null, response: { message: string }) => {
  if (err) {
    console.error(`Error calling SayHello: ${err.message}`);
    return;
  }
  console.log(`Received response: "${response.message}"`);
}); 