# CodeVibes 🌊

> **AI Code Review for Developers Who Can't Afford CodeRabbit**

An open-source alternative to CodeRabbit powered by DeepSeek AI, offering intelligent code analysis with priority-based scanning to save tokens and costs.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![DeepSeek](https://img.shields.io/badge/AI-DeepSeek%20v3.2-orange)](https://deepseek.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB)](https://reactjs.org/)

---

## ✨ Features

### 🔒 **Priority-Based Scanning**
- **Priority 1**: Security & secrets (`.env`, auth, API keys)
- **Priority 2**: Core business logic (endpoints, controllers, services)
- **Priority 3**: Supporting code (utilities, tests, docs)

Analyze only what matters most - skip priorities you don't need to save tokens.

### 🤖 **Powered by DeepSeek AI**
- Advanced AI analysis with DeepSeek v3.2
- Finds security vulnerabilities, bugs, and performance issues
- Detailed explanations and fix suggestions
- Code examples for each issue

### 📊 **Beautiful Dashboard**
- Real-time analysis progress
- Vibe score gauge (code health metric)
- Priority-based issue breakdown
- Token usage and cost tracking
- Analysis history (with GitHub Auth)

### ⚡ **Performance Optimized**
- Parallel file fetching (5 concurrent requests)
- Smart caching (GitHub Tree API)
- Lazy categorization (defer P2/P3 until needed)
- **3-5x faster** than sequential processing

### 🔐 **GitHub Integration**
- OAuth login for private repos
- Access your repositories directly
- Automatic token management
- Secure credential storage with encryption

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- DeepSeek API key ([Get one here](https://platform.deepseek.com))
- GitHub OAuth App (for private repos)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/danish296/codevibes.git
   cd codevibes
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install

   # Backend
   cd codevibes-backend
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cd codevibes-backend
   cp .env.example .env
   # Edit .env with your credentials
   ```

   Required variables:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ENCRYPTION_KEY=your-32-character-encryption-key
   JWT_SECRET=your-jwt-secret
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd codevibes-backend
   npm run dev

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage

1. **Login with GitHub** (for private repos)
2. **Enter repository URL** or select from your repos
3. **Start Analysis** - begins with Priority 1 (security)
4. **Review Issues** - detailed findings with fix suggestions
5. **Continue to P2/P3** - or stop if satisfied
6. **View History** - access past analyses anytime

---

## 🏗️ Architecture

```
codevibes/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   ├── store/             # Zustand state management
│   └── lib/               # API client
│
├── codevibes-backend/     # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── services/      # Business logic (DeepSeek, GitHub)
│   │   ├── utils/         # Database, auth, encryption
│   │   └── server.ts      # Express app
│   └── data/              # SQLite database
│
└── public/                # Static assets
```

---

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
See `.env.example` for full configuration options.

Key settings:
- `MAX_FILES_PER_PRIORITY=20` - Files to analyze per priority
- `DEEPSEEK_MODEL=deepseek-chat` - AI model to use
- `PORT=3001` - Backend server port

---

## 📊 Performance

### Benchmarks (Medium Project - 50 files)

| Metric | Before Optimization | After Optimization | Improvement |
|--------|---------------------|-------------------|-------------|
| Initial scan | 8s | 2s | **75% faster** |
| P1 file fetch (10 files) | 12s | 3s | **75% faster** |
| P2 file fetch (20 files) | 25s | 6s | **76% faster** |
| **Total analysis** | **45s** | **11s** | **⚡ 76% faster** |

### API Usage Reduction

- **Before**: ~250 GitHub API calls for 100 files
- **After**: ~30 GitHub API calls for 100 files
- **Reduction**: **88%** fewer API calls

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Lucide** - Icons

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **better-sqlite3** - Database
- **DeepSeek API** - AI analysis
- **GitHub API** - Repository access

---

## 🔐 Security

- **Encrypted storage** for GitHub tokens and API keys
- **JWT-based authentication** with httpOnly cookies
- **CORS protection** with allowed origins
- **OAuth 2.0** for GitHub integration
- **No credentials in code** - all via environment variables

---

## 📝 Changelog

### [v1.0.0] - 2026-01-07

#### ⚡ Performance Optimizations
- **Parallel file fetching**: 5 concurrent requests instead of sequential (3-5x faster)
- **GitHub Tree API caching**: Reduced API calls by 80%
- **Lazy categorization**: Defer P2/P3 processing until needed (60% faster initial scan)

#### 🐛 Bug Fixes
- **Fixed history not saving**: Corrected SQL parameter mismatch (duplicate `cost` parameter)
- **Fixed timer issues**: 
  - Timer now restarts when continuing to next priority level
  - Timer now stops on analysis errors
  - Timer displays correctly when loading from history
- **Fixed DeepSeek response truncation**: Increased max_tokens from 4000 to 8000 to prevent incomplete JSON responses

#### 🔧 Improvements
- **Enhanced error handling**: Better DeepSeek JSON parsing with truncation detection
- **Improved logging**: More detailed logs for debugging
- **Better OAuth setup**: Comprehensive setup guide with troubleshooting

#### 📚 Documentation
- Added comprehensive `.env.example` with all configuration options
- Improved error messages and user feedback
- Better TypeScript types and interfaces

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [DeepSeek](https://deepseek.com) for powerful AI models
- [GitHub](https://github.com) for API and OAuth
- [Lucide](https://lucide.dev) for beautiful icons
- All open-source contributors

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/danish296/codevibes/issues)
- **Discussions**: [GitHub Discussions](https://github.com/danish296/codevibes/discussions)

---

**Crafted with 💜 by Danish Akhtar**

Star ⭐ this repo if you find it helpful!
