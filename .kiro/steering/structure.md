---
inclusion: always
---

# Project Structure

```
/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers (business logic)
│   ├── middleware/      # Auth & error handling middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seed/            # Database seeding scripts
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # Reusable React components
│       ├── context/     # Context API providers
│       ├── pages/       # Page components
│       ├── services/    # API service layer
│       ├── App.js       # Main app component
│       └── index.js     # Entry point
│
└── .kiro/
    └── steering/        # AI assistant guidance
```

## Architecture Pattern

Backend follows MVC (Model-View-Controller) architecture:
- Models: Data schemas and database interaction
- Controllers: Business logic and request handling
- Routes: API endpoint definitions
- Middleware: Authentication and error handling

Frontend uses component-based architecture with Context API for global state management.
