# gRPC API Design Document

## Overview

This document outlines the design decisions, architecture, and technical choices made for our educational gRPC API project. The primary goal is to create a simple, well-structured gRPC server that demonstrates best practices and modern development approaches.

## Architecture

### Technology Stack

#### Core Dependencies
- **Node.js**: Runtime environment for JavaScript/TypeScript
- **@grpc/grpc-js**: The core gRPC library for Node.js
- **@grpc/proto-loader**: A utility for loading `.proto` files
- **TypeScript**: Static type checking for JavaScript

#### Development Dependencies
- **tsx**: Modern TypeScript execution tool (replaces ts-node)
- **nodemon**: Development server with auto-restart
- **@types/node**: Node.js type definitions

### Project Structure

```
gRPC/
├── proto/
│   └── greeter.proto   # Service definition (the "contract")
├── src/
│   ├── server.ts       # Server implementation
│   └── client.ts       # Client for testing the server
├── package.json        # Project configuration and dependencies
├── tsconfig.json       # TypeScript configuration
├── DESIGN.md           # This design document
└── WORKLOG.md          # Development worklog
```

## Design Decisions and Trade-offs

### 1. TypeScript over JavaScript

**Decision**: Use TypeScript for all source code
**Rationale**: 
- Provides static type checking to catch errors at compile time
- Improves code documentation and IDE support
- Industry standard for modern Node.js applications
- Better maintainability for larger projects

**Trade-offs**:
- ✅ Better developer experience and error prevention
- ✅ Enhanced IDE support and autocomplete
- ❌ Additional compilation step
- ❌ Slightly more complex setup

### 2. gRPC over REST/GraphQL

**Decision**: Use gRPC for communication
**Rationale**:
- **Performance**: gRPC uses Protocol Buffers (a binary format) and HTTP/2, which is significantly faster than JSON over HTTP/1.1.
- **Strict Contracts**: The `.proto` file defines a strict, strongly-typed contract between the client and server.
- **Streaming**: Native support for bidirectional streaming.
- **Ideal for Microservices**: Its performance and strict contracts make it a popular choice for inter-service communication.

**Trade-offs**:
- ✅ High performance and low latency
- ✅ Strongly typed, language-agnostic contracts
- ✅ Excellent for internal microservices
- ❌ Binary protocol is not human-readable
- ❌ Less browser support compared to REST/GraphQL
- ❌ Steeper learning curve for beginners

### 3. ES Modules over CommonJS

**Decision**: Use ES Modules (`"type": "module"`)
**Rationale**:
- Modern JavaScript standard
- Better tree-shaking and optimization
- Consistent with frontend development practices
- Future-proof approach

**Trade-offs**:
- ✅ Modern and standardized
- ✅ Better performance characteristics
- ✅ Consistent with web standards
- ❌ More complex setup with TypeScript
- ❌ Some compatibility issues with older packages

### 4. tsx over ts-node

**Decision**: Use tsx instead of ts-node for TypeScript execution
**Rationale**:
- Modern replacement for ts-node
- Better ES modules support
- No deprecated Node.js features
- Faster startup and execution
- Active development and maintenance

**Trade-offs**:
- ✅ No deprecation warnings
- ✅ Better ES modules support
- ✅ Faster execution
- ❌ Newer tool with smaller community
- ❌ Less documentation compared to ts-node

## Module System Configuration

### TypeScript Configuration

The `tsconfig.json` is configured for modern ES modules:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"]
}
```

### Package.json Configuration

```json
{
  "type": "module",
  "scripts": {
    "start:server": "nodemon --exec \"node --import tsx src/server.ts\"",
    "start:client": "node --import tsx src/client.ts"
  }
}
```

**Key decisions**:
- `"type": "module"` enables ES modules
- `--import tsx` uses modern Node.js module registration
- `nodemon` for development auto-restart

## Server Architecture

### Protocol Buffer Definition (`proto/greeter.proto`)

Uses Protocol Buffer 3 (proto3) syntax:
- **Contract-First**: The `.proto` file is the single source of truth for the API's contract.
- **Language-Agnostic**: Can be used to generate client and server code in many different languages.
- **Efficient**: Defines messages in a compact, binary format.

### Server Implementation (`src/server.ts`)

The server follows a clean initialization pattern:
1. **Load Proto Definition**: The `.proto` file is loaded at runtime.
2. **Implement Service Handlers**: Functions are created to handle incoming RPCs (e.g., `sayHello`).
3. **Create Server Instance**: A new gRPC server is instantiated.
4. **Add Service to Server**: The service implementation is attached to the server.
5. **Bind and Start**: The server is bound to a port and starts listening for requests.

### Client Implementation (`src/client.ts`)

The client demonstrates the consumer side of the API:
1. **Load Proto Definition**: The client also loads the `.proto` to understand the API contract.
2. **Create Client Stub**: A client object is created, pointing to the server's address.
3. **Make RPC Call**: The client calls a method on the server as if it were a local function.
4. **Handle Response**: The client processes the response or error from the server in a callback.

## Future Considerations

### Type Generation
For larger projects, using a tool like `grpc-tools` or `ts-proto` to generate TypeScript types from the `.proto` file would provide full, end-to-end type safety. We avoided this for simplicity in this didactic example.

### Scalability
- Implement more complex services and RPCs.
- Explore different gRPC patterns like server-side, client-side, and bidirectional streaming.

### Security
- Implement SSL/TLS for secure communication using `ServerCredentials.createSsl()`.
- Add authentication and authorization logic using gRPC metadata.

### Monitoring
- Add logging (Winston, Pino).
- Implement health check endpoints using the gRPC Health Checking Protocol.

## Conclusion

This design prioritizes a clear, educational demonstration of gRPC concepts. The choices made provide a solid foundation for learning how gRPC works while using modern, industry-standard tools and patterns. The architecture is simple enough for educational purposes but is based on patterns that can be scaled for real-world applications. 