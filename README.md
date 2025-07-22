# 🚀 AI Resume Analyzer + Job Matcher

A premium, full-stack web application that analyzes resumes using AI and matches them with the best job opportunities. Built with modern technologies and a stunning dark-themed UI.

## ✨ Features

### Core Functionality
- **PDF Resume Upload**: Drag-and-drop or click to upload PDF resumes
- **AI-Powered Analysis**: Advanced text extraction and skills detection
- **Job Matching Algorithm**: Cosine similarity scoring for precise job matching
- **Interactive Results**: Beautiful match cards with detailed scoring
- **Resume Improvement**: AI-generated suggestions for resume enhancement

### UI/UX Highlights
- **Premium Dark Theme**: Pure black background with vibrant orange and electric blue accents
- **Smooth Animations**: Fade-in effects, hover states, and micro-interactions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern Typography**: Poppins font with clean hierarchy
- **Performance Optimized**: Fast loading and smooth interactions

## 🎨 Design System

### Color Palette
- **Background**: Pure Black (#0f0f0f)
- **Primary Accent**: Vibrant Orange (#ff6b00)
- **Secondary Accent**: Electric Blue (#00cfff)
- **Text**: White with gray variants for hierarchy
- **Cards**: Dark gray backgrounds with subtle borders

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300-900 available
- **Line Height**: 150% for body text, 120% for headings

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

### Backend (Production Implementation)
- **Flask** (Python web framework)
- **PyPDF2** for PDF text extraction
- **SentenceTransformer** for text embeddings
- **spaCy** for NLP processing
- **scikit-learn** for cosine similarity

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-resume-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── index.css            # Global styles and animations
├── main.tsx            # Application entry point
└── vite-env.d.ts       # TypeScript declarations

public/
├── index.html          # HTML template
└── vite.svg           # Vite icon
```

## 🔧 Configuration

### Environment Variables (Production)
```env
FLASK_ENV=development
OPENAI_API_KEY=your_openai_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

### Backend Setup (Production)
```bash
# Create Python virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install flask PyPDF2 sentence-transformers spacy scikit-learn python-dotenv

# Download spaCy model
python -m spacy download en_core_web_sm
```

## 📊 Mock Data Structure

### Job Match Object
```typescript
interface JobMatch {
  id: string;
  title: string;
  company: string;
  score: number;          // 0-100 percentage
  description: string;
  requirements: string[];
  salary: string;
  location: string;
  type: string;
}
```

### Analysis Result Object
```typescript
interface AnalysisResult {
  matches: JobMatch[];
  resumeText: string;
  skillsExtracted: string[];
  improvementSuggestions: string[];
}
```

## 🎯 API Endpoints (Production)

### POST /analyze_resume
Analyzes uploaded resume and returns job matches.

**Request:**
```bash
curl -X POST \
  http://localhost:5000/analyze_resume \
  -H 'Content-Type: multipart/form-data' \
  -F 'resume=@path/to/resume.pdf'
```

**Response:**
```json
{
  "matches": [
    {
      "title": "Senior Full Stack Developer",
      "company": "TechFlow Inc.",
      "score": 94.2,
      "description": "Job description...",
      "requirements": ["React", "Node.js", "TypeScript"],
      "salary": "$120k - $160k",
      "location": "San Francisco, CA",
      "type": "Full-time"
    }
  ],
  "skillsExtracted": ["React", "TypeScript", "Node.js"],
  "improvementSuggestions": ["Add more specific metrics..."]
}
```

### POST /improve_resume (Optional)
Enhances resume using OpenAI GPT.

**Request:**
```bash
curl -X POST \
  http://localhost:5000/improve_resume \
  -H 'Content-Type: application/json' \
  -d '{"resumeText": "Original resume text..."}'
```

## 🎨 Design Guidelines

### Component Styling
- Use consistent 8px spacing system
- Apply hover states to interactive elements
- Implement smooth transitions (300ms duration)
- Use proper contrast ratios for accessibility

### Animation Principles
- Subtle and purposeful animations
- Consistent timing functions
- Progressive disclosure for complex interactions
- Performance-optimized transforms

## 🚀 Production Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder to your preferred hosting platform
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
# Create requirements.txt
pip freeze > requirements.txt

# Deploy to your preferred platform
# Set environment variables in platform settings
```

## 🔐 Security Considerations

- Validate file uploads (PDF only, size limits)
- Sanitize extracted text content
- Rate limit API endpoints
- Secure API keys and environment variables
- Implement proper CORS policies

## 🎯 Future Enhancements

### Planned Features
- [ ] User authentication and profiles
- [ ] Resume version history
- [ ] Job application tracking
- [ ] Email notifications for new matches
- [ ] Advanced filters and search
- [ ] Interview preparation suggestions
- [ ] Salary comparison insights
- [ ] Company culture matching

### Technical Improvements
- [ ] Real-time analysis progress
- [ ] Resume templates library
- [ ] Multi-language support
- [ ] Advanced NLP models
- [ ] Machine learning recommendations
- [ ] A/B testing framework

## 🐛 Troubleshooting

### Common Issues

**File upload not working:**
- Check file size (max 10MB)
- Ensure file is PDF format
- Check browser console for errors

**Slow analysis:**
- Large PDF files take longer to process
- Check network connection
- Clear browser cache

**Styling issues:**
- Ensure Tailwind CSS is properly installed
- Check for conflicting CSS rules
- Verify responsive design breakpoints

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@resumematcher.ai or join our Discord community.

---

Built with ❤️ by the ResumeMatcher AI team. Making job hunting smarter, one resume at a time.