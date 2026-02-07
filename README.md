# Quizhi Project - Agent Skills Creator

A sophisticated **node-based Agent Skills creator** with visual workflow design, export to graphics, and GitHub Codespaces support. Design powerful AI workflows without writing code.

## 🎯 Features

- **Node-Based Designer:** Drag-and-drop interface with 5 node types (Input, Process, Decision, Data, Output)
- **Visual Workflow Canvas:** Interactive canvas with grid background for designing workflows
- **Node Inspector Panel:** Edit node properties (title, description, type)
- **Export Functionality:**
  - Export as PNG graphic (with gradient background and visual nodes)
  - Export as JSON (complete skill structure)
- **Playful Creative Studio Design:** Vibrant colors, smooth animations, and intuitive interface
- **GitHub Codespaces Ready:** One-click setup with devcontainer configuration

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Open browser to http://localhost:3000
```

### GitHub Codespaces

Click the button below to open this project in GitHub Codespaces:

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/highlymoment-blip/quizhi-project)

Or manually:
1. Go to the repository
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for the environment to build (automatically runs `pnpm install` and `pnpm run dev`)
4. Access the app at the forwarded port 3000

## 📁 Project Structure

```
quizhi-project/
├── .devcontainer/          # GitHub Codespaces configuration
│   └── devcontainer.json   # Dev environment setup
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── pages/         # Page components (Home, Creator)
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React contexts
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── App.tsx        # Main app component with routing
│   │   ├── main.tsx       # React entry point
│   │   └── index.css      # Global styles with design tokens
│   └── index.html         # HTML template
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎨 Design System

**Playful Creative Studio** aesthetic with:
- **Color Palette:** Coral (#ff6b6b), Teal (#4ecdc4), Gold (#ffd93d), Purple (#a78bfa), Pink (#ff8fab)
- **Background:** Soft gradient (cream to light purple)
- **Typography:** Poppins (display/body), Caveat (accent)
- **Components:** Rounded shapes, smooth animations, playful interactions

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start dev server with HMR

# Production
pnpm run build        # Build for production
pnpm run preview      # Preview production build

# Code Quality
pnpm run check        # TypeScript type checking
pnpm run format       # Format code with Prettier
```

## 📦 Core Technologies

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Wouter** - Client-side routing
- **TypeScript** - Type safety
- **Sonner** - Toast notifications

## 🎯 Node Types

| Type | Color | Purpose |
|------|-------|---------|
| Input | Coral | Define input parameters |
| Process | Teal | Process or transform data |
| Decision | Purple | Conditional branching |
| Data | Gold | Data storage or retrieval |
| Output | Pink | Define output format |

## 💾 Export Formats

### PNG Graphic
- Visual representation of your workflow
- Includes gradient background
- Shows all nodes and connections
- Perfect for documentation and sharing

### JSON
- Complete skill structure
- Includes all node properties
- Connections metadata
- Ready for integration with Agent Skills system

## 🚀 Deployment

### GitHub Pages
```bash
pnpm run build
# Deploy the dist/ folder to GitHub Pages
```

### Vercel
```bash
# Connect your GitHub repo to Vercel
# Automatic deployments on push
```

### Other Platforms
The project is a static React app that can be deployed to:
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📝 Development Workflow

1. **Create nodes** by dragging from the left panel to the canvas
2. **Configure nodes** by selecting them and editing properties in the right panel
3. **Export your skill** as PNG for visualization or JSON for integration
4. **Share or deploy** your Agent Skills

## 🔗 Related Resources

- [Agent Skills Guide](https://guide-app-lyart.vercel.app/)
- [Manus Documentation](https://help.manus.im)
- [GitHub Codespaces Docs](https://docs.github.com/en/codespaces)

## 📄 License

MIT License - feel free to use this project for your own Agent Skills creation.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open a GitHub issue in this repository.

---

**Built with ❤️ using Manus and React**
