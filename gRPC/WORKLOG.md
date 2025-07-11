# GraphQL API Development Worklog

## Project: Educational GraphQL API
**Start Date**: December 11, 2025  
**Objective**: Create a simple, well-documented GraphQL API for educational purposes

---

## Session 1: Initial Setup and Configuration

### 1. Project Initialization
**Time**: Initial setup  
**Task**: Initialize Node.js project and install dependencies

**Actions Taken**:
- Created new directory structure
- Ran `npm init -y` to create `package.json`
- Installed core dependencies:
  ```bash
  npm install express graphql @apollo/server
  ```
- Installed development dependencies:
  ```bash
  npm install --save-dev typescript ts-node @types/node nodemon
  ```

**Outcome**: ✅ Basic project structure established

### 2. Project Structure Setup
**Time**: After dependency installation  
**Task**: Create organized file structure

**Actions Taken**:
- Created `src/` directory for source code
- Created empty files:
  - `src/index.ts` - Server entry point
  - `src/schema.ts` - GraphQL schema definitions
  - `src/resolvers.ts` - GraphQL resolver functions

**Outcome**: ✅ Clean project structure established

### 3. Basic Schema and Resolver Implementation
**Time**: After structure setup  
**Task**: Implement simple "Hello World" GraphQL API

**Actions Taken**:
- **Schema Definition** (`src/schema.ts`):
  ```typescript
  export const typeDefs = `#graphql
    type Query {
      hello: String
    }
  `;
  ```

- **Resolver Implementation** (`src/resolvers.ts`):
  ```typescript
  export const resolvers = {
    Query: {
      hello: () => 'Hello world!',
    },
  };
  ```

**Outcome**: ✅ Basic GraphQL schema and resolver created

### 4. Server Configuration
**Time**: After schema/resolver setup  
**Task**: Configure Apollo Server with Express

**Actions Taken**:
- Implemented server in `src/index.ts`:
  - Imported Apollo Server and Express
  - Created Express app and HTTP server
  - Configured Apollo Server with schema and resolvers
  - Applied GraphQL middleware at `/graphql` endpoint
  - Added CORS support
  - Started server on port 4000

**Issues Encountered**:
- Missing `cors` dependency
- Missing type definitions for `cors` and `express`

**Resolution**:
- Installed missing dependencies:
  ```bash
  npm install cors @types/cors @types/express
  ```

**Outcome**: ✅ Server configuration completed

### 5. TypeScript Configuration
**Time**: After server setup  
**Task**: Configure TypeScript for modern ES modules

**Actions Taken**:
- Created `tsconfig.json` with initial configuration:
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "module": "NodeNext",
      "moduleResolution": "NodeNext",
      "esModuleInterop": true,
      "strict": true,
      "skipLibCheck": true,
      "outDir": "dist",
      "rootDir": "src"
    }
  }
  ```

- Updated `package.json`:
  - Added `"type": "module"` for ES modules
  - Added `start` script: `"nodemon src/index.ts"`

**Outcome**: ✅ TypeScript configuration established

---

## Session 2: Debugging and Modernization

### 6. First Run Attempt
**Time**: After initial setup  
**Task**: Test the server startup

**Issues Encountered**:
- `TypeError: Unknown file extension ".ts"`
- ES modules not recognizing TypeScript files
- `nodemon` trying to run TypeScript directly

**Root Cause**: ES modules + TypeScript execution incompatibility

**Debugging Steps**:
1. Identified that `"type": "module"` in `package.json` was causing issues
2. Researched modern TypeScript execution methods
3. Found that `ts-node` with `--loader` flag was needed

**Resolution Attempt 1**:
- Updated start script to: `"nodemon --exec node --loader ts-node/esm src/index.ts"`

**Outcome**: ❌ Still encountering issues

### 7. Deprecation Warnings and Crashes
**Time**: After first resolution attempt  
**Task**: Fix deprecation warnings and server crashes

**Issues Encountered**:
- `ExperimentalWarning: --experimental-loader may be removed in the future`
- `DeprecationWarning: fs.Stats constructor is deprecated`
- Server crashes with cryptic error messages
- Unstable server startup

**Analysis**:
- Node.js v22.14.0 showing deprecation warnings for `--loader` flag
- `ts-node` using deprecated Node.js features
- ES modules + TypeScript + newer Node.js versions causing compatibility issues

**Research Phase**:
- Investigated modern alternatives to `ts-node`
- Found `tsx` as a modern replacement
- Learned about new `--import` flag replacing `--loader`

**Resolution**:
1. Installed `tsx`:
   ```bash
   npm install --save-dev tsx
   ```

2. Updated start script:
   ```json
   "start": "nodemon --exec \"node --import tsx src/index.ts\""
   ```

**Outcome**: ✅ Deprecation warnings eliminated

### 8. Express Version Conflicts
**Time**: After tsx installation  
**Task**: Resolve type conflicts between Express versions

**Issues Encountered**:
- Type conflicts between Express v5 and Apollo Server
- `RequestHandler` type incompatibilities
- CORS middleware type errors

**Root Cause**: Express v5 has breaking changes in type definitions

**Resolution**:
- Downgraded to Express v4.18.x:
  ```bash
  npm install express@^4.18.0 @types/express@^4.17.0
  ```

**Outcome**: ✅ Type conflicts resolved

### 9. TypeScript Configuration Refinement
**Time**: After Express downgrade  
**Task**: Optimize TypeScript configuration for stability

**Actions Taken**:
- Updated `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "target": "ES2022",
      "module": "ES2022",
      "moduleResolution": "node",
      "allowSyntheticDefaultImports": true,
      "esModuleInterop": true,
      "strict": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true,
      "outDir": "dist",
      "rootDir": "src",
      "declaration": true,
      "sourceMap": true
    }
  }
  ```

**Rationale**:
- Simplified module resolution to `"node"` for better compatibility
- Added source maps for debugging
- Enabled declaration files for potential library use

**Outcome**: ✅ Stable TypeScript configuration

### 10. Final Server Startup
**Time**: After all configurations  
**Task**: Verify server starts successfully

**Test Results**:
- Server starts without deprecation warnings
- No crashes or error messages
- Apollo Sandbox accessible at `http://localhost:4000/graphql`
- GraphQL query `{ hello }` returns `{"data":{"hello":"Hello world!"}}`

**Outcome**: ✅ Server running successfully

---

## Session 3: Documentation and Best Practices

### 11. Error Handling Enhancement
**Time**: After successful startup  
**Task**: Improve error handling and logging

**Actions Taken**:
- Added proper error handling to server startup:
  ```typescript
  startServer().catch(error => {
    console.error('Error starting server:', error);
    process.exit(1);
  });
  ```

- Simplified CORS configuration to avoid type issues

**Outcome**: ✅ Better error handling implemented

### 12. Documentation Creation
**Time**: Final phase  
**Task**: Create comprehensive documentation

**Actions Taken**:
- Created `DESIGN.md` with:
  - Architecture overview
  - Technology stack rationale
  - Design decisions and trade-offs
  - Future considerations
  
- Created `WORKLOG.md` (this document) with:
  - Chronological development process
  - Issues encountered and resolutions
  - Lessons learned
  - Technical decisions

**Outcome**: ✅ Comprehensive documentation completed

---

## Key Lessons Learned

### 1. Modern Node.js + TypeScript Complexity
**Lesson**: ES modules + TypeScript + newer Node.js versions require careful configuration
**Impact**: Spent significant time debugging module system issues
**Future Approach**: Research compatibility before choosing module system

### 2. Dependency Version Management
**Lesson**: Bleeding-edge versions can cause unexpected type conflicts
**Impact**: Express v5 caused type incompatibilities with Apollo Server
**Future Approach**: Use stable, well-tested versions for educational projects

### 3. Tool Evolution
**Lesson**: Development tools evolve rapidly; older tutorials may use deprecated approaches
**Impact**: `ts-node` with `--loader` is being deprecated in favor of `tsx` and `--import`
**Future Approach**: Always check for modern alternatives and deprecation warnings

### 4. Error Message Analysis
**Lesson**: Cryptic error messages often indicate configuration issues
**Impact**: Server crashes with minimal error information required deep debugging
**Future Approach**: Start with simpler configurations and add complexity gradually

---

## Technical Decisions Summary

| Decision | Alternative | Rationale | Trade-offs |
|----------|-------------|-----------|------------|
| TypeScript | JavaScript | Better DX, type safety | More complex setup |
| Apollo Server | GraphQL.js | Better DX, tooling | Vendor lock-in |
| Express v4 | Express v5 | Type compatibility | Missing newer features |
| ES Modules | CommonJS | Modern standard | Setup complexity |
| tsx | ts-node | No deprecation warnings | Newer, less documented |

---

## Current Status

✅ **Completed**:
- Basic GraphQL API with "Hello World" query
- Modern TypeScript + ES modules setup
- Apollo Server + Express integration
- Development environment with auto-restart
- Comprehensive documentation

🔄 **Next Steps**:
- Expand schema with more complex data types
- Add mutations and subscriptions
- Implement data persistence
- Add authentication and authorization
- Create comprehensive test suite

---

## Performance Metrics

- **Server Startup Time**: ~2-3 seconds (including TypeScript compilation)
- **Memory Usage**: ~50MB baseline
- **Dependencies**: 211 packages (including dev dependencies)
- **Bundle Size**: Minimal (development only)

---

## Development Environment

- **Node.js Version**: v22.14.0
- **npm Version**: Latest
- **Operating System**: Windows 10
- **IDE**: VS Code (recommended)
- **Terminal**: PowerShell

---

## Troubleshooting Guide

### Common Issues and Solutions

1. **"Unknown file extension .ts"**
   - **Cause**: ES modules not recognizing TypeScript
   - **Solution**: Use `tsx` instead of `ts-node`

2. **Deprecation warnings**
   - **Cause**: Using `--loader` flag
   - **Solution**: Use `--import` flag with `tsx`

3. **Type conflicts**
   - **Cause**: Version mismatches between packages
   - **Solution**: Use compatible versions (Express v4 + Apollo Server v4)

4. **Server crashes on startup**
   - **Cause**: Configuration issues
   - **Solution**: Check `tsconfig.json` and `package.json` settings

---

*This worklog serves as a reference for future development and a guide for others facing similar setup challenges.* 

---

## 2025-07-11: gRPC API Implementation

### Summary
Transitioned the project from a GraphQL focus to a gRPC implementation to create a didactic example of modern, high-performance API development. The goal was to build a simple, well-documented gRPC service from scratch, covering the full development lifecycle from project setup to client-server implementation.

### Key Activities

1.  **Project Scaffolding**:
    *   Initialized a new Node.js project (`package.json`).
    *   Configured TypeScript (`tsconfig.json`) for a modern ES Modules setup.
    *   Installed core dependencies: `@grpc/grpc-js`, `@grpc/proto-loader`.
    *   Installed development dependencies: `typescript`, `tsx`, `nodemon`.

2.  **Service Definition (Contract-First)**:
    *   Created the `proto/` directory to hold the service definition.
    *   Wrote `greeter.proto`, defining a simple `Greeter` service with a `SayHello` RPC. This establishes the API's contract.
    *   Defined the `HelloRequest` and `HelloReply` messages for the RPC call.

3.  **Server Implementation**:
    *   Created `src/server.ts`.
    *   Implemented logic to load the `.proto` file at runtime.
    *   Wrote the `sayHello` service handler, which contains the logic for the `SayHello` RPC.
    *   Instantiated a new gRPC server, added the `Greeter` service, and bound it to port `50051`.

4.  **Client Implementation**:
    *   Created `src/client.ts` to act as a consumer of the gRPC service.
    *   The client also loads the `.proto` file to understand the service contract.
    *   Implemented a client stub that connects to the server and calls the `SayHello` method.
    *   Added logic to process command-line arguments to allow for dynamic requests.

5.  **Documentation and Scripts**:
    *   Added `start:server` and `start:client` scripts to `package.json` for easy execution.
    *   Created a comprehensive `README.md` explaining the project, gRPC concepts, and how to run the server and client.
    *   Updated this `WORKLOG.md`, `DESIGN.md`, and `STUDY_GUIDE.md` to reflect the new gRPC project.

### Outcome
The result is a complete, self-contained, and didactic gRPC project. It serves as a strong educational tool for understanding the core principles of gRPC, contrasting them with GraphQL, and demonstrating a modern development workflow. 