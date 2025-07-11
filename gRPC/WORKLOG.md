# gRPC API Development Worklog

## Project: Educational gRPC API
**Objective**: Create a simple, well-documented gRPC API to demonstrate high-performance, contract-first API development.

---

## Session 1: Initial Setup and Configuration

### 1. Project Initialization
**Task**: Initialize a Node.js project and install dependencies.

**Actions Taken**:
- Ran `npm init -y` to create `package.json`.
- Set `"type": "module"` in `package.json` for modern ES Modules support.
- Installed core dependencies for gRPC:
  ```bash
  npm install @grpc/grpc-js @grpc/proto-loader
  ```
- Installed development dependencies for a modern TypeScript workflow:
  ```bash
  npm install --save-dev typescript tsx nodemon @types/node
  ```

**Outcome**: ✅ Basic project structure and dependencies established.

### 2. TypeScript Configuration
**Task**: Configure TypeScript for the project.

**Actions Taken**:
- Created `tsconfig.json` with settings tailored for a modern Node.js environment with ES Modules.
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "ES2022",
      "moduleResolution": "node",
      "strict": true,
      "esModuleInterop": true,
      "outDir": "dist",
      "rootDir": "src"
    },
    "include": ["src/**/*"]
  }
  ```

**Outcome**: ✅ TypeScript configured for stable development.

### 3. NPM Scripts
**Task**: Create scripts for running the server and client.

**Actions Taken**:
- Added `start:server` and `start:client` scripts to `package.json`.
- Used `nodemon` for the server to auto-restart on file changes.
- Leveraged `tsx` with the `--import` flag for direct, efficient execution of TypeScript files without a separate build step.
  ```json
  "scripts": {
    "start:server": "nodemon --exec \"node --import tsx src/server.ts\"",
    "start:client": "node --import tsx src/client.ts"
  }
  ```

**Outcome**: ✅ Development workflow streamlined with convenient run scripts.

---

## Session 2: Contract-First Service Definition

### 4. Defining the Protocol Buffer
**Task**: Create the `.proto` file to define the API contract.

**Actions Taken**:
- Created the `proto/` directory.
- Wrote `greeter.proto` to define the structure of the API.
  - **Service**: Defined the `Greeter` service.
  - **RPC**: Defined the `SayHello` remote procedure call.
  - **Messages**: Defined the `HelloRequest` and `HelloReply` message types.

**`proto/greeter.proto`**:
```protobuf
syntax = "proto3";

package greeter;

// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

**Outcome**: ✅ A clear, language-agnostic API contract was established before any implementation code was written.

---

## Session 3: Server & Client Implementation

### 5. Implementing the gRPC Server
**Task**: Write the server-side logic to handle incoming RPCs.

**Actions Taken** (`src/server.ts`):
- Used `@grpc/proto-loader` to load the `greeter.proto` definition at runtime.
- Created a `grpc.Server` instance.
- Implemented the `sayHello` handler function, which contains the business logic for the `SayHello` RPC.
- Added the `Greeter` service to the server, mapping the `SayHello` RPC to the `sayHello` handler.
- Bound the server to `0.0.0.0:50051` using insecure credentials for this example.

**Outcome**: ✅ A functional gRPC server that correctly implements the service contract.

### 6. Implementing the gRPC Client
**Task**: Write a client to consume the gRPC service.

**Actions Taken** (`src/client.ts`):
- Loaded the same `greeter.proto` file to ensure the client adheres to the contract.
- Created a gRPC client stub for the `Greeter` service, pointing to the server's address (`localhost:50051`).
- Implemented logic to call the `SayHello` method, sending a `HelloRequest`.
- Added a simple callback to process the server's `HelloReply` or handle any errors.
- Included logic to pass a name from the command-line arguments for dynamic requests.

**Outcome**: ✅ A functional gRPC client capable of communicating with the server.

---

## Session 4: Documentation

### 7. Creating Educational Materials
**Task**: Document the project to make it a useful learning resource.

**Actions Taken**:
- Created `README.md` with a project overview and setup instructions.
- Created `STUDY_GUIDE.md` to explain the core technologies (gRPC, Protobuf, Node.js, tsx) in simple terms.
- Created `DESIGN.md` to outline the architecture and design decisions.
- Updated this `WORKLOG.md` to provide a chronological log of the development process.

**Outcome**: ✅ Comprehensive documentation makes the project highly educational and easy to understand.

---

## Key Lessons Learned

1.  **The Power of Contract-First**: Defining the service in a `.proto` file first provides a clear, unambiguous source of truth for the API. This minimizes integration issues between client and server.
2.  **Modern TypeScript Execution**: Tools like `tsx` simplify the development workflow by allowing direct execution of `.ts` files, eliminating the need for a separate compilation step and avoiding deprecation warnings associated with older tools like `ts-node`.
3.  **Performance by Default**: gRPC's use of Protocol Buffers and HTTP/2 provides significant performance benefits over traditional JSON/REST APIs out of the box, which is ideal for server-to-server communication.

---

## Technical Decisions Summary

| Decision | Alternative(s) | Rationale | Trade-offs |
|---|---|---|---|
| **gRPC** | REST, GraphQL | **Performance & Strict Contracts**. Chosen for its efficiency and strong typing, making it ideal for microservices. | Less human-readable, browser support requires a proxy. |
| **Protocol Buffers** | JSON, XML | **Efficiency**. Binary format is smaller and faster to serialize/deserialize than text-based formats. | Not human-readable without tooling. |
| **`tsx`** | `ts-node` | **Modern & Stable**. Avoids deprecation warnings present with `ts-node`'s loader flags in newer Node.js versions. | Newer tool, but has excellent compatibility. |
| **Runtime Proto Loading** | Build-time Code Generation | **Simplicity**. Avoids a build step, making the project easier for beginners to understand. | Lacks compile-time type safety for RPCs and messages. |

---

## Current Status

✅ **Completed**:
- A simple, functional gRPC "Greeter" service.
- A client capable of calling the service.
- A modern, script-based development environment.
- Comprehensive documentation explaining the "why" behind the code.

🔄 **Next Steps**:
- Explore more complex gRPC features like streaming (client, server, and bidirectional).
- Implement error handling and status codes.
- Add metadata and authentication.
- Demonstrate generating TypeScript types from `.proto` files for full type safety.

---

## Development Environment

- **Node.js Version**: 22+
- **Key Dependencies**: `@grpc/grpc-js`, `@grpc/proto-loader`, `tsx`
- **IDE**: VS Code (recommended)
- **Terminal**: PowerShell / Bash 