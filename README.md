# User Management System

A React-based Single Page Application (SPA) for user list management with full CRUD operations, built with modern web technologies.

## 🚀 Features

### Core Functionality
- **Authentication System**: Secure login with token-based authentication
- **User Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Search & Filter**: Real-time search by name or email
- **Pagination**: Client-side pagination for better performance
- **View Modes**: Toggle between List and Card view layouts
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS

### Technical Features
- **TypeScript**: Full type safety and better developer experience
- **Redux Toolkit**: Modern state management with Redux
- **React Router**: Protected routes and navigation
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Loading States**: Smooth loading indicators and user feedback
- **Form Validation**: Client-side validation with error messages

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit with Redux Thunk
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Create React App
- **Testing**: Jest & React Testing Library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recruitment-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Default Login Credentials

```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ErrorBoundary.tsx
│   ├── Layout.tsx
│   ├── LoadingSpinner.tsx
│   ├── ProtectedRoute.tsx
│   ├── UserCard.tsx
│   ├── UserListItem.tsx
│   └── UserModal.tsx
├── pages/              # Page components
│   ├── LoginPage.tsx
│   └── UsersPage.tsx
├── store/              # Redux store and slices
│   ├── authSlice.ts
│   ├── usersSlice.ts
│   └── index.ts
├── services/           # API services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 🔌 API Integration

The application integrates with the [ReqRes API](https://reqres.in/) for demonstration purposes:

### Endpoints Used:
- `POST /api/login` - User authentication
- `GET /api/users?page={page}` - Fetch users with pagination
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update existing user
- `DELETE /api/users/{id}` - Delete user

## ✨ Key Features Implementation

### Authentication
- Token-based authentication with localStorage persistence
- Protected routes that redirect to login when unauthenticated
- Automatic token injection in API requests
- Logout functionality with token cleanup

### User Management
- **Create**: Modal form with validation for adding new users
- **Read**: Display users in both list and card formats
- **Update**: Edit existing users through modal interface
- **Delete**: Confirmation dialog before user deletion

### Search & Pagination
- Real-time client-side search across user names and emails
- Client-side pagination with configurable page size
- Search results are paginated automatically
- Page state management through Redux

### UI/UX Features
- Loading spinners during API operations
- Error messages with auto-dismissal
- Form validation with inline error messages
- Responsive design for mobile and desktop
- Smooth transitions and hover effects

## 🎨 Design Patterns

### Component Architecture
- **Separation of Concerns**: Clear separation between UI, state, and business logic
- **Reusable Components**: Modular components for better maintainability
- **Custom Hooks**: Redux hooks for type-safe state management
- **Error Boundaries**: Graceful error handling at the component level

### State Management
- **Normalized State**: Users stored in a normalized format
- **Async Actions**: Thunk-based async operations
- **Error Handling**: Centralized error state management
- **Loading States**: Request lifecycle management

### Code Quality
- **TypeScript**: Full type safety and IntelliSense support
- **ESLint**: Code linting for consistency
- **Modular Structure**: Clear file organization and imports
- **Clean Code**: Readable and maintainable code practices

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect your Git repository for automatic deployments
- **Netlify**: Drag and drop the build folder or connect via Git
- **GitHub Pages**: Use `gh-pages` package for GitHub Pages deployment
- **AWS S3**: Upload build files to S3 bucket with CloudFront

## 🧪 Testing

Run the test suite:
```bash
npm test
```

The project includes:
- Unit tests for components
- Integration tests for user workflows
- API service tests
- Redux store tests

## 📈 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Memoization**: React.memo for component optimization
- **Debounced Search**: Optimized search input handling
- **Efficient Pagination**: Client-side pagination reduces API calls
- **Error Boundaries**: Prevent entire app crashes

## 🔮 Future Enhancements

- [ ] Server-side pagination for large datasets
- [ ] Advanced filtering options (role, status, etc.)
- [ ] Bulk operations (delete multiple users)
- [ ] Export functionality (CSV, PDF)
- [ ] User profile images upload
- [ ] Advanced search with filters
- [ ] Real-time updates with WebSocket
- [ ] Offline support with service workers

## 📄 License

This project is created for demonstration purposes as part of a recruitment task.

## 🤝 Contributing

This is a recruitment project, but feedback and suggestions are welcome!

---

**Built with ❤️ using React, TypeScript, and modern web technologies**