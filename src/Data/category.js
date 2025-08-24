const categories = [
  {
    id: 1,
    name: "Coding / Development",
    description: "AI-powered coding assistants, code generators, autocompletion, debugging, and automated code review for developers.",
    icon: `<svg width="24" height="24" fill="none"><path d="M8 17l-5-5 5-5M16 7l5 5-5 5" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="9" y="4" width="6" height="16" rx="2" stroke="#4F46E5" stroke-width="2"/></svg>`
  },
  {
    id: 2,
    name: "Image / Graphics",
    description: "AI image generators, upscalers, style transfer, restoration, background removal, avatars, logos, and 3D models.",
    icon: `<svg width="24" height="24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#F59E42" stroke-width="2"/><circle cx="8" cy="8" r="2" fill="#F59E42"/><path d="M21 21l-6-6-4 4-5-5" stroke="#F59E42" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 3,
    name: "Text / Writing",
    description: "AI text generation, grammar checking, summarization, SEO, email writing, fiction, scripts, and paraphrasing tools.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#10B981" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 4,
    name: "Video / Multimedia",
    description: "AI video generators, editors, text-to-video, animation, deepfake, enhancement, voiceovers, dubbing, and translation.",
    icon: `<svg width="24" height="24" fill="none"><rect x="3" y="7" width="14" height="10" rx="2" stroke="#6366F1" stroke-width="2"/><polygon points="17,9 21,12 17,15" fill="#6366F1"/></svg>`
  },
  {
    id: 5,
    name: "Audio / Music",
    description: "AI music composition, voice cloning, podcast editing, noise removal, speech synthesis, transcription, and sound effects.",
    icon: `<svg width="24" height="24" fill="none"><path d="M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12" stroke="#F43F5E" stroke-width="2"/><circle cx="6" cy="18" r="2" fill="#F43F5E"/><circle cx="18" cy="18" r="2" fill="#F43F5E"/></svg>`
  },
  {
    id: 6,
    name: "Productivity / Office Tools",
    description: "AI note-taking, meeting summarizers, calendar automation, email assistants, document drafting, and knowledge management tools.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#FBBF24" stroke-width="2"/><path d="M8 8h8M8 12h8M8 16h4" stroke="#FBBF24" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 7,
    name: "Business / Marketing / Sales",
    description: "AI chatbots, customer support, marketing content, social media, ad optimization, lead generation, analytics, and insights.",
    icon: `<svg width="24" height="24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#3B82F6" stroke-width="2"/><path d="M7 7V3h10v4" stroke="#3B82F6" stroke-width="2"/></svg>`
  },
  {
    id: 8,
    name: "Data / Research / Analytics",
    description: "AI predictive analytics, research assistants, web scrapers, dashboards, visualization, ML model builders, and data cleaning.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#22D3EE" stroke-width="2"/><path d="M8 16v-4M12 16v-8M16 16v-2" stroke="#22D3EE" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 9,
    name: "Education / Learning",
    description: "AI tutors, personalized learning, quiz generation, language learning, research assistants, flashcards, and memorization tools.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="8" width="16" height="10" rx="2" stroke="#A3E635" stroke-width="2"/><path d="M12 4v4" stroke="#A3E635" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 10,
    name: "Health / Medical",
    description: "AI medical imaging, symptom checkers, drug discovery, fitness, nutrition advisors, and mental health chatbots for wellness.",
    icon: `<svg width="24" height="24" fill="none"><rect x="6" y="6" width="12" height="12" rx="6" stroke="#EF4444" stroke-width="2"/><path d="M12 9v6M9 12h6" stroke="#EF4444" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 11,
    name: "Legal / Finance",
    description: "AI contract analysis, legal research, document review, financial analysis, tax, accounting, risk, and compliance tools.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#F472B6" stroke-width="2"/><path d="M8 12h8M12 8v8" stroke="#F472B6" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 12,
    name: "Gaming / Entertainment",
    description: "AI NPC behavior, game content, level generation, story, voice acting, dialogue, memes, and entertainment tools.",
    icon: `<svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="8" stroke="#F59E42" stroke-width="2"/><circle cx="9" cy="10" r="1" fill="#F59E42"/><circle cx="15" cy="10" r="1" fill="#F59E42"/><path d="M9 15c1.5 1 4.5 1 6 0" stroke="#F59E42" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 13,
    name: "Personal / Lifestyle",
    description: "AI virtual assistants, fashion, interior design, travel planning, personal photo, and video editing applications.",
    icon: `<svg width="24" height="24" fill="none"><rect x="6" y="6" width="12" height="12" rx="6" stroke="#34D399" stroke-width="2"/><path d="M12 9v6M9 12h6" stroke="#34D399" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 14,
    name: "Security / Cybersecurity",
    description: "AI malware detection, threat prediction, vulnerability scanning, and fraud detection for cybersecurity and protection.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="8" width="16" height="10" rx="2" stroke="#6366F1" stroke-width="2"/><path d="M12 4v4" stroke="#6366F1" stroke-width="2" stroke-linecap="round"/></svg>`
  },
  {
    id: 15,
    name: "Miscellaneous / Emerging",
    description: "AI generative tools for chemistry, biology, IoT, robotics, automation, simulation, and creative writing applications.",
    icon: `<svg width="24" height="24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#FBBF24" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="#FBBF24" stroke-width="2"/></svg>`
    }
  ]
  export default categories;