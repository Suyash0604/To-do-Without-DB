# Smart Notes - Modern Note Taking App

A beautiful, modern note-taking application built with React, featuring both light and dark themes, smooth animations, and a professional design.

## Features

✨ **Modern Design**
- Clean, professional interface
- Smooth animations and transitions
- Responsive design for all devices

🌓 **Theme Support**
- Light and dark themes
- Automatic theme persistence
- Smooth theme transitions

📝 **Full CRUD Operations**
- Create new notes
- Edit existing notes
- Delete notes
- View all notes

🎨 **Beautiful UI Components**
- Animated note cards
- Interactive forms
- Loading states
- Empty states

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd "D:\Cohort\Backend\To-do Without DB"
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
node server.js
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd "D:\Cohort\Backend\To-do Without DB\frontend"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

- `GET /` - Health check
- `POST /create` - Create a new note
- `GET /notes` - Get all notes
- `PATCH /update/:id` - Update a note by ID
- `DELETE /delete/:id` - Delete a note by ID

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # App header with theme toggle
│   │   ├── NoteCard.jsx        # Individual note card component
│   │   ├── NoteForm.jsx        # Form for creating/editing notes
│   │   └── NotesList.jsx       # List of all notes
│   ├── contexts/
│   │   └── ThemeContext.jsx    # Theme management context
│   ├── services/
│   │   └── api.js              # API service functions
│   ├── App.jsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles and Tailwind
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js             # Vite configuration
└── package.json               # Dependencies and scripts
```

## Features in Detail

### Theme System
- Automatic detection of system preference
- Manual theme toggle in header
- Theme persistence in localStorage
- Smooth transitions between themes

### Animations
- Page load animations
- Card hover effects
- Button interactions
- Modal transitions
- List item animations

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Flexible grid layouts
- Touch-friendly interactions

### Error Handling
- API error handling
- Loading states
- Empty states
- User feedback

## Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`. You can modify the colors in the `colors` section:

```javascript
colors: {
  primary: {
    // Primary color variations
  },
  dark: {
    // Dark theme colors
  }
}
```

### Animations
Custom animations are defined in the Tailwind config and can be modified or extended as needed.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
