# Didactic gRPC API Example

Welcome! This project is a simple, educational gRPC API designed to teach the fundamentals of gRPC in a clear and straightforward way. It's inspired by the structure and goals of the GraphQL project you've been working on.

## 🎯 What This Project Demonstrates

This project shows you how to:
- Define a service with gRPC using a `.proto` file.
- Implement a gRPC server in Node.js and TypeScript.
- Create a client that communicates with the server.
- Understand the basic request/response flow of gRPC.

---

## 🏗️ Project Structure

```
gRPC/
├── proto/
│   └── greeter.proto   # Service definition (like a GraphQL schema)
├── src/
│   ├── server.ts       # The gRPC server (like GraphQL resolvers)
│   └── client.ts       # A script to test the server
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # This guide
```

---

## 🤔 gRPC vs. GraphQL: A Simple Analogy

To help connect this to what you already know, here's a simple comparison:

| Concept | GraphQL | gRPC |
| :--- | :--- | :--- |
| **Schema** | You define `types` and `queries` in a `.graphql` or `.ts` file. | You define `services` and `messages` in a `.proto` file. |
| **Logic** | You write `resolvers` to provide the data for your schema fields. | You implement `service handlers` that contain the logic for your RPC calls. |
| **Data Format** | Uses JSON, which is text-based and human-readable. | Uses Protocol Buffers, which is a binary format. It's not human-readable but is very fast and efficient. |
| **Communication**| Typically runs over HTTP/1.1. | Runs on HTTP/2, which allows for more advanced features like streaming. |

**Analogy**: Think of **GraphQL** as a flexible, à la carte restaurant menu where you can pick exactly the fields you want. Think of **gRPC** as a high-efficiency kitchen that uses a secret, super-fast ordering system (binary protocol) to deliver meals (data) with incredible speed.

---

## 🔧 How It Works: The Flow

1.  **`proto/greeter.proto`**: This is the "contract". It defines the `Greeter` service, the `SayHello` method (RPC), and the `HelloRequest` and `HelloReply` message structures.

2.  **`src/server.ts`**:
    *   Loads the `.proto` file.
    *   Implements the `SayHello` function. When a client calls `SayHello`, this is the code that runs.
    *   Starts a gRPC server and listens for incoming connections on port `50051`.

3.  **`src/client.ts`**:
    *   Also loads the same `.proto` file to know how to talk to the server.
    *   Creates a client that connects to the server at `localhost:50051`.
    *   Calls the `SayHello` method, sending a `HelloRequest` with a name.
    *   Receives a `HelloReply` from the server and prints the message.

---

## 🚀 How to Run This Project

You'll need two separate terminal windows to run this project: one for the server and one for the client.

### 1. Start the Server

In your first terminal, run this command:

```bash
npm run start:server
```

You should see the following output, and the server will be running:

```
> nodemon --exec "node --import tsx src/server.ts"

[nodemon] starting `node --import tsx src/server.ts`
Server listening on port 50051
```

### 2. Run the Client

In your second terminal, you can now run the client.

**To send a default request:**

```bash
npm run start:client
```

The server window will log `Received greeting request for: world`, and your client window will show:
```
Sending request for name: world
Received response: "Hello, world"
```

**To send a request with your name:**

You can pass a name as a command-line argument.

```bash
npm run start:client -- YourName
```
*(Note: The `--` is important! It tells npm to pass the argument to the script.)*

The server window will log `Received greeting request for: YourName`, and your client window will show:
```
Sending request for name: YourName
Received response: "Hello, YourName"
```

---

## 🎯 Key Takeaways

-   **Contract-First**: With gRPC, you start with the `.proto` file, which defines the API's contract.
-   **Strongly Typed**: The service and message definitions in the `.proto` file create a strongly-typed contract between the client and server.
-   **High Performance**: gRPC is designed for high-performance communication, making it a great choice for microservices.

This simple example is the "Hello, World" of gRPC. From here, you can explore more advanced concepts like streaming, deadlines, and metadata. 