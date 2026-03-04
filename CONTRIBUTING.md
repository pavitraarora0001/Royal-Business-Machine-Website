# Contributing to Royal Business Machine

Thank you for considering contributing to Royal Business Machine! This document provides guidelines and instructions for contributing.

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the project
- Show empathy towards other contributors

## 🚀 Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/Royal-Business-Machine.git
   cd Royal-Business-Machine
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards below
   - Write tests if applicable
   - Update documentation

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```bash
feat(auth): add OTP verification
fix(payment): resolve Razorpay webhook issue
docs(readme): update installation instructions
```

## 🎨 Code Style Guidelines

### Backend (JavaScript/Node.js)

- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions where appropriate
- Use async/await instead of callbacks
- Follow ESLint rules
- Add JSDoc comments for functions

```javascript
/**
 * Create a new lead
 * @param {Object} leadData - Lead information
 * @returns {Promise<Object>} Created lead
 */
const createLead = async (leadData) => {
    // Implementation
};
```

### Frontend (TypeScript/React)

- Use TypeScript for type safety
- Use functional components with hooks
- Follow React best practices
- Use proper TypeScript types
- Avoid `any` type when possible
- Use meaningful component and variable names

```typescript
interface LeadFormProps {
    onSubmit: (data: LeadData) => void;
    isLoading?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isLoading = false }) => {
    // Implementation
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use semantic class names
- Avoid inline styles unless necessary

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test
```

- Write unit tests for new features
- Ensure all tests pass before submitting PR
- Aim for >80% code coverage

### Frontend Tests

```bash
cd frontend
npm run lint
npm run build
```

- Run linting before committing
- Ensure build succeeds
- Test on multiple browsers

## 📁 Project Structure

### Adding New Features

#### Backend API Endpoint

1. Create model in `backend/models/`
2. Create controller in `backend/controllers/`
3. Create route in `backend/routes/`
4. Add validation in `backend/middleware/validation.js`
5. Update API documentation

#### Frontend Page

1. Create page in `frontend/app/`
2. Create components in `frontend/components/`
3. Add types in `frontend/types/`
4. Update API client in `frontend/lib/api.ts`
5. Add to navigation if needed

## 🐛 Bug Reports

When reporting bugs, please include:

- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Environment**: OS, browser, Node version
- **Screenshots**: If applicable
- **Error Logs**: Console errors or stack traces

## ✨ Feature Requests

When requesting features, please include:

- **Use Case**: Why is this feature needed?
- **Proposed Solution**: How should it work?
- **Alternatives**: Other solutions considered
- **Additional Context**: Any other relevant information

## 🔍 Pull Request Guidelines

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No console.log statements
- [ ] No merge conflicts

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
```

## 📚 Documentation

- Update README.md if needed
- Add JSDoc/TSDoc comments
- Update API documentation
- Include examples for new features

## 🔐 Security

- Never commit sensitive data (.env files, keys, passwords)
- Report security vulnerabilities privately
- Follow security best practices
- Use environment variables for secrets

## 💬 Communication

- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions
- **Discussions**: For questions and ideas

## 📄 License

By contributing, you agree that your contributions will be licensed under the ISC License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to Royal Business Machine! 🚀
