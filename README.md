# SyncUp - Multi-App Productivity Suite

A comprehensive **full-stack web application** that provides multiple productivity tools integrated into a single platform. This project includes **Expense Tracker**, **Habit Tracker**, **Notepad** and **TodoList** all organized under each user's document in a unified database structure.

## Features

### 3. **Finance Tracker**

- Record daily expenses with categories.
- Generate reports to view spending patterns.
- Budget management and tracking for better financial insights.

### 4. **Habit Tracker**

- Create and track habits with daily goals.
- View history of habit completion over time.
- Toggle completion status for each day and visualize progress.

### 1. **Notepad**

- Create, edit, and delete notes.
- Markdown support for enhanced note-taking.
- Auto-save functionality for uninterrupted note-taking experience.

### 2. **TodoList**

- Add, manage, and track tasks .
- Filter tasks by completion status (Pending, Completed).
- Set deadlines and receive visual indicators for due tasks.

## Tech Stack

### **Frontend**

- **Next.js**: React-based framework for server-side rendering and optimized performance.
- **TypeScript**: Ensuring type safety and reducing errors in development.
- **Redux Toolkit**: Centralized state management for seamless data flow between components.
- **Tailwind CSS**: Utility-first CSS framework for fast and responsive UI design.
- **Shadcn Components**: For a polished, modern UI experience.

### **Backend**

- **Node.js & Express.js**: Efficient server-side framework to handle API requests.
- **MongoDB**: Document-based NoSQL database for storing all app data under a single user's document.
- **RTK Query**: For efficient API integration and data fetching.

## Key Highlights

- **Unified User Data**: All data for Notepad, TodoList, Expense Tracker, and Habit Tracker is stored under one user document in the database, minimizing complexity and reducing overhead.
- **Scalability**: Designed for scalability with modular components, making it easy to add new apps or features in the future.
- **Optimized Performance**: Leveraging Next.js for server-side rendering and improved SEO.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS to ensure seamless usability across devices.
- **Dark Mode Support**: Toggle between light and dark themes for enhanced user experience.

## Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/rasel-gannicus/SyncUp
   cd syncUp
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the root directory and add the following secrets retrieved from Google Firebase:
   ```env
   NEXT_PUBLIC_apiKey= 
   NEXT_PUBLIC_authDomain= 
   NEXT_PUBLIC_projectId=
   NEXT_PUBLIC_storageBucket=
   NEXT_PUBLIC_messagingSenderId=
   NEXT_PUBLIC_appId=
   NEXT_PUBLIC_GITHUB_ID=
   NEXT_PUBLIC_GITHUB_SECRET=
   NEXT_PUBLIC_GOOGLE_ID=
   NEXT_PUBLIC_GOOGLE_SECRET=
   ```

````

4. **Run the Application:**
```bash
npm run dev
````

5. **Build for Production:**
   ```bash
   npm run next build
   ```

## API Endpoints
- **POST /api/v1/users** - Get a user info from the database.
- **POST /api/v1/addUserToDB** - Add a user to the database after  authentication with firebase .

- **POST /api/v1/addNote** - Add a new note.
- **POST /api/v1/editNote** - Edit an existing note. 
- **POST /api/v1/deleteNote** - Delete a note.

- **POST /api/v1/addTransaction** -   Add a new transaction. It might be an expense or an income.
- **POST /api/v1/editTransaction** -  Edit an existing transaction.
- **POST /api/v1/deleteTransaction** - Delete a transaction.

- **POST /api/v1/addHabit** - Create a new habit.
- **POST /api/v1/deleteHabit** -  Delete a habit.
- **POST /api/v1/toggleHabit** -  Toggle a habit. Make it marked or unmarked.

## Future Enhancements

- Integration of **calendars** and **reminders** to enhance the TodoList and Habit Tracker.
- **Analytics Dashboard**: Provide users with insights into their habits, expenses, and productivity.
- **Collaborative Features**: Share notes and tasks with other users for improved teamwork.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries or support, reach out at:  
**Email:** [shafikrasel5@gmail.com](mailto:shafikrasel5@gmail.com)  
**GitHub:** [https://github.com/rasel-gannicus](https://github.com/rasel-gannicus)
