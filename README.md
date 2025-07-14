# express-prisma
This is an API test using Express.js and Prisma.

## Getting Started
### 1. Install dependencies:
```bash
bun install
```

### 2. Setup Environment
```bash
DATABASE_URL= # Your URL/Link to databases
PORT= # Port of Express
JWT_SECRET= # JWT Secret Token (Fill it freely)
```
You need to fill those 3 environments.

### 3. Setup Prisma
Run this program : 
```bash
bun primsa init
bun prisma migrate dev --name init
bun prisma generate
```
> [!WARNING]
> Be Careful While regenerate or reset the migration. This can cause data loss.

Every changes in prisma, please generate it :)

### 4. Running program
```bash
bun run index.ts
```

## Notice
This project was created using `bun init` in bun v1.2.16. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
