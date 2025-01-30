# 🚀 AI-Powered To-Do App 🧠 ✅  

A smart task management application built with **Node.js**, **Express.js**, **MongoDB**, and **OpenAI API** to **prioritize tasks using AI** and provide productivity tips.

---

## 🌟 Features
- 📝 **Task Management**: Add, update, delete, and manage tasks.  
- 🏷️ **AI-Based Task Prioritization**: AI assigns **High, Normal, or Low** priority based on the task description.  
- 💡 **AI Productivity Tips**: Get AI-generated suggestions for better task management.  
- 🌐 **RESTful API**: Fully structured backend with Express.js and MongoDB.  
- 🔐 **Secure Environment**: Uses `.env` for API keys and database security.  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)  
- **AI Integration:** OpenAI API (`gpt-3.5-turbo`)  
- **Environment Variables:** `dotenv`  
- **Error Handling & Validation:** Express error handlers  

---

## 📌 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ai-todo-app.git
cd ai-todo-app
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the project root and add:
```ini
MONGO_URI=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

### 4️⃣ Start the Server
```bash
npm run dev
```

---

## 🔥 API Endpoints

### 📌 Task Management
| Method | Endpoint        | Description |
|--------|----------------|-------------|
| `GET`  | `/api/tasks`   | Get all tasks |
| `POST` | `/api/tasks`   | Add a new task (AI assigns priority) |
| `PUT`  | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

### 📌 AI Features
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/tasks/ai/productivity-tip` | Get an AI-generated productivity tip |

---

## 🛠️ Usage Example

### ✅ Adding a New Task
```bash
curl -X POST http://localhost:5000/api/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Submit project", "description": "Final submission due tomorrow."}'
```
🔹 **AI will analyze the description and assign priority** (e.g., `"high"`, `"normal"`, `"low"`).

---

## 📜 License
This project is open-source under the **MIT License**.  

---

## 🎯 Contributing
Feel free to **fork, submit issues, or create PRs** to improve the project! 🚀  
If you find this project useful, consider **starring ⭐ the repository**.

---

## 🎉 Contact & Support
If you have any questions or suggestions, feel free to **open an issue** on GitHub or reach out via email.

Happy coding! 🚀🔥
```
