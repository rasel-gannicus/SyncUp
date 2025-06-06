

<p align="center">
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/img/syncup%20logo.png?raw=truehttps://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/todolist%20darkmode.png?raw=true" alt="Image" width="300" />
</p>

# SyncUp - Multi-App Productivity Suite

A comprehensive full-stack web application offering a suite of productivity tools integrated into a single platform. SyncUp includes a AI powered Text Processor with 50+ AI models, Finance Tracker, Habit Tracker, Notepad, and TodoList all organized under each user’s document in a unified database structure.

## Features

### **Text Processor**

- Delivered smart text functionalities such as summarization, analysis, rephrasing, and grammar correction by leveraging multiple advanced AI models. Users can access 52 AI models, including Mistral, Deepseek, ChatGPT, Gemini, Meta Llama, Qwen, Olympic Coder, and more.
- Enhances productivity with intelligent text handling options.

### **Finance Tracker**

- Record daily expenses with categories.
- Generate reports to view spending patterns with charts.
- Budget management and tracking for better financial insights.

### **Habit Tracker**

- Create and track habits with daily goals.
- View history of habit completion over time.
- Toggle completion status for each day and visualize progress.

### **Notepad**

- Create, edit, and delete notes.
- Markdown support for enhanced note-taking.
- Auto-save functionality for uninterrupted note-taking experience.

### **TodoList**

- Add, manage, and track tasks .
- Filter tasks by completion status (Pending, Completed).
- Set deadlines and receive visual indicators for due tasks.

## Tech Stack

- **Frontend:** NextJs, Typescript, Redux, React, Tailwind Css, HTML, CSS, Javascript,  React icons, React Hot Toast, 
- **Backend:** Node.js, Express, MongoDB, Firebase, RTK Query, Google Gemini API
<!-- - **Authentication:** JWT Token , Firebase Auth -->
<!-- - **State Management:** RTK Query, Redux -->

## Key Highlights

- **Unified User Data**: All data for Text Processor, Notepad, TodoList, Expense Tracker, and Habit Tracker is stored under one user document in the database, minimizing complexity and reducing overhead.
- **AI-Enhanced Text Processing:**: Integrated 50+ AI Model's API to provide text summarization, analysis, rephrasing, and grammar-checking capabilities in the Text Processor app.
- **Scalability**: Designed for scalability with modular components, making it easy to add new apps or features in the future.
- **Optimized Performance**: Leveraging Next.js for server-side rendering and improved SEO.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS to ensure seamless usability across devices.
- **Dark Mode Support**: Toggle between light and dark themes or use the system theme for enhanced user experience.

### Live Site

Live site: [SyncUp](https://syncup-rasel.vercel.app/).

### GitHub Repository

- Client: [here](https://github.com/rasel-gannicus/SyncUp).
- Server: [here](https://github.com/rasel-gannicus/Server-for-SyncUp).

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

- **GET /api/v1/users** - Get a user info from the database.
- **POST /api/v1/addUserToDB** - Add a user to the database after authentication with firebase .

- **POST /api/v1/addNote** - Add a new note.
- **PUT /api/v1/editNote** - Edit an existing note.
- **DELETE /api/v1/deleteNote** - Delete a note.

- **POST /api/v1/addTodo** - Add a new todo.
- **PUT /api/v1/editTodo** - Edit a todo.
- **DELETE /api/v1/deleteTodo** - Delete a todo.

- **POST /api/v1/addTransaction** - Add a new transaction. It might be an expense or an income.
- **PUT /api/v1/editTransaction** - Edit an existing transaction.
- **DELETE /api/v1/deleteTransaction** - Delete a transaction.

- **POST /api/v1/addHabit** - Create a new habit.
- **POST /api/v1/deleteHabit** - Delete a habit.
- **POST /api/v1/toggleHabit** - Toggle a habit. Make it marked or unmarked.

## Future Enhancements

- Integration of **calendars** and **reminders** to enhance the TodoList, Notepad and Finance Tracker
- **Analytics Dashboard**: Provide users with insights into their habits, expenses, and productivity.
- **Collaborative Features**: Share notes and tasks with other users for improved teamwork.
- **Adding more apps**: Add more productivity apps to the platform. 

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For inquiries or support, reach out at:  
**Email:** [shafikrasel5@gmail.com](mailto:shafikrasel5@gmail.com)  
**GitHub:** [https://github.com/rasel-gannicus](https://github.com/rasel-gannicus)

### Previews 

<p align="center">
  <em>Home page</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/homepage.png?raw=true" width="100%" alt="Homepage">
</p>

<p align="center">
  <em>Finance Tracker</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/syncup%20-%20finance%20tracker.png?raw=true" width="100%" alt="Finance Tracker">
</p>

<p align="center">
  <em>Habit Tracker</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/habit%20tracker.png?raw=true" width="100%" alt="Habit Tracker">
</p>

<p align="center">
  <em>Notepad</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/notepad.png?raw=true" width="100%" alt="Notepad">
</p>

<p align="center">
  <em>Todo List</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/todolist.png?raw=true" width="100%" alt="Todo List">
</p>

### Dark Mode  

<p align="center">
  <em>Home page</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/homepage%20dark.png?raw=true" width="100%" alt="Homepage Dark">
</p>

<p align="center">
  <em>Finance Tracker</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/finance%20tracker%20dark%20mode.png?raw=true" width="100%" alt="Finance Tracker Dark">
</p>

<p align="center">
  <em>Habit Tracker</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/habit%20tracker%20dark%20mode.png?raw=true" width="100%" alt="Habit Tracker Dark">
</p>

<p align="center">
  <em>Notepad</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/notepad%20darkmode.png?raw=true" width="100%" alt="Notepad Dark">
</p>

<p align="center">
  <em>Todo List</em><br/>
  <img src="https://github.com/rasel-gannicus/SyncUp/blob/main/src/assets/Hosting%20for%20github%20readme/DarkMode/todolist%20darkmode.png?raw=true" width="100%" alt="Todo List Dark">
</p>
