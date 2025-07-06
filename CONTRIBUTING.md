# 🤝 Contributing to MateraPro

Welcome! We're excited that you're interested in contributing to **MateraPro** — a multi-role marketplace platform built for scale, speed, and security. Whether you're fixing bugs, improving documentation, or building new features, your input helps us improve.

---

## 📦 Project Structure

MateraPro is a monorepo with:

- **backend/** — Django REST API
- **frontend/** — React (Vite) web client

---

## 🛠️ Getting Started

### 1. Clone Repository

```bash
git clone git@github.com:<your-username>/MateraPro.git
cd MateraPro
```

### 2. Set Up Your Environment

- Backend setup: see [backend/README.md](backend/README.md)
- Frontend setup: see [frontend/README.md](frontend/README.md)

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name dev
```

---

## 🌿 Branching Strategy

We follow a **feature-branch** strategy to maintain a clean and stable `main` branch.

### 📌 Branch Types:

- `main` — stable, production-ready code
- `dev` — integration branch for active development
- `feature/<name>` — new features
- `bugfix/<name>` — non-critical bug fixes
- `hotfix/<name>` — urgent production fixes

### 🗭 Workflow:

1. Branch from `dev`
2. Commit your changes regularly (see commit strategy below)
3. Push to your remote branch
4. Open a Pull Request (PR) to `dev`
5. After thorough testing, merge `dev` to `main`

---

## 💬 Commit Strategy

Use conventional, semantic messages:

```
type(scope): short description [(#<issue tag>) if applicable]
```

Examples:

- `feat(api): implement role-based auth (#3)`
- `fix(cart): prevent double-charging (#12)`
- `docs: update README`

### Types:

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `style:` — formatting, missing semi-colons, etc.
- `refactor:` — code restructuring without behavior change
- `test:` — adding or correcting tests
- `chore:` — maintenance tasks (deps, configs, etc.)

### Best Practices:

- Keep commits atomic and clear
- Use present tense ("add", not "added")
- Reference issues with `#<number>` (e.g. `#23`)
- **Prefer linking issues in PR descriptions**, not just in commits, for clearer context and automation

---

## 🔃 Push & Pull Best Practices

### Pull Before Work

```bash
git checkout dev
git pull origin dev
```

### Push Feature

```bash
git checkout -b feature/your-feature-name
git add .
git commit -m "feat(...): your message"
git push origin feature/your-feature-name
```

### Merge Process

- Open PR against `dev`
- Request review
- Rebase with `dev` if needed
- Merge after approval and CI pass

---

## 📋 Issue Workflow

- Create descriptive issues
- Assign proper labels (e.g. `frontend`, `backend`, `bug`, `enhancement`)
- Reference related issues/PRs with `Closes #ID`

---

## 🔧 Code Style

- **Python:** PEP8, `flake8`, `black`
- **JavaScript/TypeScript:** Prettier, ESLint
- Lint and format before committing

---

## 🕪 Testing

- Write tests for all new features/bugfixes
- Keep tests clear and scoped
- Ensure all tests pass before opening a PR

---

## 🛄 Pull Requests

- Base PRs on `dev`
- Use semantic titles and meaningful descriptions
- Include screenshots for UI changes (optional)
- Use `Closes #<issue-id>` in PR descriptions to link issues
- Ensure CI passes and reviewers are tagged

---

## 👥 Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
Be respectful, inclusive, and collaborative.

---

## 🙋 Need Help?

- GitHub Discussions: [MateraPro Discussions](https://github.com/MateraPro/MateraPro/discussions)

Thank you for contributing to MateraPro 💙
