# 🚀 Task Tracker CLI
Simple command line application (CLI) to manage tasks, built with Node.js and TypeScript.
This project was completed as part of the **[roadmap.sh](https://roadmap.sh/projects/task-tracker)**.
---

## ✅ Features
* **Add, update and delete** tasks.
* **List** all tasks or filter by status.
* **Mark tasks** as ‘all’, ‘in-progress’ or ‘done’.
* Data persistence in a 'tasks.json' file.
---

## ⚙️ Instructions for use
Follow these steps to run the project on your local machine.

**1. Clone the repository:**
```bash
git clone (https://github.com/jazzou28/task-tracker-cli.git)
cd task-tracker-cli
```

**2. Install the dependencies:**
```bash
npm install
```

**3. Execute the commands:**
Use npm start - followed by the command you want.

* Add a task:
```bash
npm start -- add "Buy milk and bread"
```

* List all tasks:
```bash
npm start -- list
```

* List tasks by state:
```bash
npm start -- list done
```

* Update a task:
```bash
npm start -- update <ID> "New task description"
```

* Mark a task as done:
```bash
npm start -- mark-done <ID>
```

* Delete a task:
```bash
npm start -- delete <ID>
```