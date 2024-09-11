## Express API App

This TypeScript application leverages the Next.js framework to build a dynamic, server-side rendered (SSR) product website. The site features a full CRUD (Create, Read, Update, Delete) API, with MongoDB as the backend database for storing product information. Each product is uniquely identified by an ID.

For authentication, the app utilizes Kinde Auth for secure user login and management, replacing JWT-based authentication. The application also supports user roles and permissions to control access to various API functions.

Images associated with products are uploaded and managed using the UploadThing service.

The app is fully server-side rendered with Next.js, ensuring fast performance and SEO optimization. Node.js is used on the backend to manage server-side logic and handle API requests.

## About the Stack

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![REST API](https://img.shields.io/badge/REST_API-000000?style=for-the-badge)](https://en.wikipedia.org/wiki/Representational_state_transfer)
[![nodejs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)][![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)

---

## Setting up the Backend

`navigate to /server to see setup instructions`

---

## Setting up the Frontend

`navigate to /client to see setup instructions`

### File struture of important files

```sh
express_app/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── globals.css
│   │   │   ├── assets/
│   │   │   ├── about-us/
│   │   │   │   └── page.tsx
│   │   │   ├── action/
│   │   │   ├── admin/
│   │   │   │   └── page.tsx
│   │   │   ├── api/
│   │   │   ├── components/
│   │   │   ├── contact-us/
│   │   │   │   └── page.tsx
│   │   │   ├── context/
│   │   │   ├── products/
│   │   │   │   └── page.tsx
│   │   │   ├── utils/
│   │   │
│   │   │
└── server/
├── src/
│ ├── authenticateToken.ts
│ ├── index.ts
│ ├── controller/
│ │ └── controller.ts
│ ├── middlewares/
│ │ └── errorHandler.ts
│ │ └── errors.ts
│ ├── router/
│ │ └── routes.ts
│ └── schema/
│ └── ProductSchema.ts
```
