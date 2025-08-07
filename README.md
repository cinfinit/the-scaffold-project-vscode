
# 🏗️ Project Scaffold — VS Code Extension

> *Because manually typing `mkdir src && touch index.js` is so 2008.*

**Project Scaffold** is a VS Code extension that turns a simple YAML file (`setup.yaml`) into a fully structured project in just one command.
No more boilerplate fatigue, no more folder-naming debates — just open VS Code and let the YAML do the heavy lifting.

---

## ✨ What Does It Do?

This extension reads a `setup.yaml` in your project directory and instantly scaffolds a project structure with:

* 📁 Nested folders
* 📄 Files (empty or pre-filled)
* 🧙‍♂️ Magic (optional, but encouraged)

All you have to do is open your workspace and run the command:
`Scaffold: Generate Project from setup.yaml`
Boom — structure built. Brainpower saved.

---

## 🔧 Example `setup.yaml`

```yaml
project_name: my_awesome_project
structure:
  src:
    - index.js: |
        console.log("Hello from the scaffold!");
    - utils.js
  README.md: |
    # My Awesome Project
    Generated with ❤️ by VS Code + YAML.
```

🔨 This will create:

```
my_awesome_project/
├── src/
│   ├── index.js    // with content
│   └── utils.js    // empty
└── README.md       // with content
```

---

## 🚀 How to Use It

1. Open a folder in VS Code.
2. Create a `setup.yaml` file in the root with your desired structure.
3. Open the **Command Palette** (`Ctrl+Shift+P` / `Cmd+Shift+P`)
4. Run: `Scaffold: Generate Project from setup.yaml`
5. Done. Structure is ready, and you're 8% more powerful.

---

## 💡 Why You'll Love It

* 🧼 No more repetitive boilerplate setup
* 💾 Setup lives in version control (via YAML)
* 🧪 Great for workshops, templates, and onboarding
* 🔁 Reusable across projects or teams
* 💥 Gives your `mkdir` PTSD a break

---

## 🧙 Author Bio

Built by [cinfinit](https://github.com/cinfinit), a dev who'd rather write one tool than five tutorials on how to set up the same folders and decided to just **automate their way out of folder hell**.

---

