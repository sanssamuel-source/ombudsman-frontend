# 🤝 Contributing to Ombudsman Digital Portal

Thank you for your interest in improving public service accountability in Sierra Leone! This document explains how to contribute to this project.

---

## 🌟 Ways to Contribute

### 1. Report Bugs

Found a bug? Help us fix it!

- Check [existing issues](../../issues) first
- Create a new issue with `[BUG]` tag
- Include steps to reproduce, expected vs actual behavior
- Add screenshots if applicable

### 2. Suggest Features

Have an idea for improvement?

- Create an issue with `[Feature Request]` tag
- Explain the problem it solves
- Describe who benefits (citizens, admins, government)
- Bonus: Suggest technical approach

### 3. Improve Documentation

- Fix typos or unclear sections
- Add examples or tutorials
- Translate documentation (Krio, Mende, Temne)
- Create video guides

### 4. Write Code

- Pick an issue labeled `good first issue`
- Fork the repository
- Create a feature branch
- Submit a pull request

---

## 🚀 Getting Started

### Prerequisites

- Git installed
- Node.js 18+ and Python 3.11+
- Code editor (VS Code recommended)
- GitHub account

### Setup Development Environment

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/ombudsman-portal.git
cd ombudsman-portal

# 3. Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/ombudsman-portal.git

# 4. Install backend dependencies
cd backend
pip install -r requirements.txt

# 5. Install frontend dependencies
cd ../frontend
npm install

# 6. Create .env files (see .env.example)
cp .env.example .env

# 7. Run locally
# Terminal 1 (backend):
cd backend && uvicorn main:app --reload

# Terminal 2 (frontend):
cd frontend && npm run dev
```

---

## 📝 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

**Branch naming**:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code improvements without changing functionality

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Frontend
npm run build  # Check for build errors
npm run dev    # Manual testing

# Backend
python -m pytest tests/  # If tests exist
# Manual API testing with Postman/curl
```

### 4. Commit Your Work

```bash
git add .
git commit -m "feat: add ministry filtering to dashboard"
```

**Commit message format**:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting, no code change
- `refactor:` - Code restructuring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:

- Clear title describing the change
- Description of what was changed and why
- Screenshots (if UI change)
- Link to related issue (if any)

---

## ✅ Code Standards

### Frontend (React + TypeScript)

```typescript
// ✅ Good
interface ComplaintProps {
  ministry: string;
  status: string;
}

const Complaint: React.FC<ComplaintProps> = ({ ministry, status }) => {
  return <div className="p-4 bg-white rounded">...</div>;
};

// ❌ Bad
function complaint(props) {
  return <div style={{ padding: "4px" }}>...</div>;
}
```

**Frontend Guidelines**:

- Use TypeScript interfaces for props
- Use functional components with hooks
- Use TailwindCSS for styling (no inline styles)
- Extract reusable logic to custom hooks
- Keep components under 300 lines

### Backend (FastAPI + Python)

```python
# ✅ Good
@router.post("/complaint")
async def create_complaint(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
) -> ComplaintResponse:
    """Submit a new complaint to the system."""
    db_complaint = models.Complaint(**complaint.dict())
    db.add(db_complaint)
    db.commit()
    return db_complaint

# ❌ Bad
@router.post("/complaint")
def create(c):
    db.add(c)
    return c
```

**Backend Guidelines**:

- Use type hints for all functions
- Use Pydantic schemas for validation
- Write docstrings for routes
- Handle errors gracefully
- Keep routes focused and simple

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Test on desktop Chrome/Firefox
- [ ] Test on mobile (or responsive mode)
- [ ] Test with slow network (throttle in DevTools)
- [ ] Test error scenarios (invalid input, network failure)
- [ ] Check console for errors

### Future: Automated Tests

We'll add:

- Unit tests (Jest for frontend, pytest for backend)
- Integration tests (API endpoint tests)
- E2E tests (Playwright for user flows)

---

## 📚 Resources

### Learn the Tech Stack

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Sierra Leone Context

- [Ombudsman Act 1997](https://www.ombudsman.gov.sl/images/OMBUDSMAN_ACT_1997.pdf)
- [Sierra Leone Constitution 1991](http://www.sierra-leone.org/Laws/constitution1991.pdf)

---

## 🏆 Recognition

Contributors will be:

- Listed in `CONTRIBUTORS.md`
- Mentioned in release notes
- Invited to demo days with government stakeholders

**Top contributors** may be invited to join the core team!

---

## ❓ Questions?

- **General**: Open a GitHub Discussion
- **Bugs**: Create an issue
- **Security**: Email security@ombudsman.gov.sl
- **Urgent**: WhatsApp +232-79-093505

---

## 📜 Code of Conduct

### Our Pledge

We are committed to making participation in this project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity.

### Our Standards

**Positive behavior**:

- Using welcoming and inclusive language
- Respecting differing viewpoints
- Accepting constructive criticism
- Focusing on what's best for citizens

**Unacceptable behavior**:

- Harassment or discrimination
- Trolling or insulting comments
- Publishing private information
- Unprofessional conduct

### Enforcement

Violations can be reported to team@ombudsman.gov.sl. All reports will be reviewed confidentially.

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

<div align="center">

**Together, we're building accountability for Sierra Leone! 🇸🇱**

_Every contribution, no matter how small, makes a difference._

</div>
