// (Removed duplicate Tools declaration and export)
const Tools = [
  {
    name: "GitHub Copilot",
    category: "Code Completion",
    subCategory: "Real-time Autocomplete",
    categoryId: 1,
    pricingModel: "Subscription",
    websiteUrl: "https://github.com/features/copilot",
    similarTools: [
      {
        name: "Amazon CodeWhisperer",
        url: "https://aws.amazon.com/codewhisperer/",
      },
      { name: "Tabnine", url: "https://www.tabnine.com/" },
      {
        name: "Replit Ghost Writer",
        url: "https://replit.com/site/ghostwriter",
      },
    ],
    plans: [
      {
        name: "Free for Students/OSS",

        functionalities: [
          "Free for verified students, teachers, and maintainers of popular open-source projects.",
        ],
      },
      {
        name: "Individual",
        price: "$10/month or $100/year",
        functionalities: [
          "Unlimited real-time code completions",
          "Public code filter to avoid suggesting matching public code",
        ],
      },
      {
        name: "Business",
        price: "$19/user/month",
        functionalities: [
          "All Individual features",
          "Organization-wide policy management",
        ],
      },
    ],
  },
  {
    name: "Amazon CodeWhisperer",
    category: "Code Completion",
    subCategory: "Real-time Autocomplete",
    categoryId: 1,
    pricingModel: "Freemium",
    websiteUrl: "https://aws.amazon.com/codewhisperer/",
    similarTools: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      { name: "Tabnine", url: "https://www.tabnine.com/" },
      {
        name: "Replit Ghost Writer",
        url: "https://replit.com/site/ghostwriter",
      },
    ],
    plans: [
      {
        name: "Free Tier",
        price: "$0",
        functionalities: [
          "50 code recommendations per month",
          "10 security scans per month",
          "No reference tracking",
        ],
      },
      {
        name: "Professional",
        price: "$19/user/month",
        functionalities: [
          "Unlimited code recommendations",
          "Unlimited security scans",
          "Reference tracking (citations for code suggestions)",
        ],
      },
    ],
  },
  {
    name: "Tabnine",
    category: "Code Completion",
    subCategory: "Real-time Autocomplete",
    categoryId: 1,
    pricingModel: "Freemium",
    websiteUrl: "https://www.tabnine.com/",
    similarTools: [
      { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
      {
        name: "Amazon CodeWhisperer",
        url: "https://aws.amazon.com/codewhisperer/",
      },
      { name: "Kite", url: "https://www.kite.com/" },
    ],
    plans: [
      {
        name: "Starter",
        price: "$0",
        functionalities: [
          "Basic code completions",
          "Uses limited open-source model",
          "No code privacy guarantees",
        ],
      },
      {
        name: "Pro",
        price: "$12/user/month",
        functionalities: [
          "Advanced, full-line code completions",
          "Trained on your code for personalized completions",
          "Code privacy ensured",
        ],
      },
    ],
  },
  {
    name: "Cursor",
    category: "AI-First IDE",
    subCategory: "Code Editor & Agent",
    categoryId: 1,
    pricingModel: "Freemium",
    websiteUrl: "https://cursor.sh/",
    similarTools: [
      { name: "Visual Studio Code", url: "https://code.visualstudio.com/" },
      { name: "JetBrains AI Assistant", url: "https://www.jetbrains.com/ai/" },
      { name: "Replit", url: "https://replit.com/" },
    ],
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "50 slow GPT-4 queries per day",
          "50 fast Claude 3 Sonnet queries per day",
          "Unlimited use of weaker models",
          "All core editor features",
        ],
      },
      {
        name: "Pro",
        price: "$20/user/month",
        functionalities: [
          "100 GPT-4-turbo queries per day",
          "100 Claude 3 Sonnet queries per day",
          "Unlimited use of Opus/Haiku models",
          "Early access to new features",
        ],
      },
    ],
  },
  {
    name: "Replit (Ghostwriter)",
    category: "Cloud IDE",
    subCategory: "Browser-Based Coding",
    categoryId: 1,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Basic",
        price: "$0",
        functionalities: [
          "Always-on AI autocomplete",
          "Limited to 500ms per completion",
          "5 AI Command runs per day",
          "Public repls only",
        ],
      },
      {
        name: "Core Ghostwriter",
        price: "$10/month",
        functionalities: ["100 AI Command runs per day", "Faster completions"],
      },
    ],
  },
  {
    name: "Claude (Anthropic)",
    category: "Chat Assistant",
    subCategory: "Code Analysis & Long Context",
    categoryId: 1,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Access to Claude Instant model",
          "Good for general coding tasks",
        ],
      },
      {
        name: "Pro",
        price: "$20/month",
        functionalities: [
          "Access to Claude 3 Opus/Sonnet",
          "Massive 200K context window",
          "5x more usage than free tier",
        ],
      },
    ],
  },
  {
    name: "Mintlify",
    category: "Documentation",
    subCategory: "Auto-Generate Docs",
    categoryId: 1,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate documentation from code",
          "Basic functionality",
        ],
      },
      {
        name: "Pro",
        price: "$120/month per seat",
        functionalities: [
          "Advanced customization",
          "Multi-repo support",
          "Dedicated support",
        ],
      },
    ],
  },

  //  image/grapics generator

  {
    name: "Midjourney",
    category: "Image Generation",
    subCategory: "AI Art Generation",
    categoryId: 2,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Basic",
        price: "$10/month",
        functionalities: [
          "Generate approximately 200 images per month",
          "3.3 hours of GPU time",
          "Commercial usage rights",
        ],
      },
      {
        name: "Standard",
        price: "$30/month",
        functionalities: [
          "Generate approximately 600 images per month",
          "10 hours of GPU time",
          "Commercial usage rights",
        ],
      },
      {
        name: "Pro",
        price: "$60/month",
        functionalities: [
          "Generate approximately 1,200 images per month",
          "20 hours of GPU time",
          "Commercial usage rights",
        ],
      },
    ],
  },
  {
    name: "DALL·E 3",
    category: "Image Generation",
    subCategory: "AI Art Generation",
    categoryId: 2,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Limited number of image generations per month",
          "Access to basic features",
        ],
      },
      {
        name: "Plus",
        price: "$15/month",
        functionalities: [
          "Unlimited image generations",
          "Access to advanced features",
          "Higher resolution outputs",
        ],
      },
    ],
  },
  {
    name: "Leonardo.Ai",
    category: "Image Generation",
    subCategory: "AI Art Generation",
    categoryId: 2,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Starter",
        price: "$5/month",
        functionalities: ["45 seconds for 9 images", "No ads", "No watermarks"],
      },
      {
        name: "Apprentice",
        price: "$10/month",
        functionalities: [
          "5,500 fast tokens",
          "Up to 25,500 banked tokens",
          "No watermarks",
          "Premium image guidance features",
        ],
      },
      {
        name: "Professional",
        price: "$20/month",
        functionalities: [
          "15 seconds for 9 images",
          "Highest priority",
          "Private images",
        ],
      },
      {
        name: "Artisan",
        price: "$24/month",
        functionalities: [
          "25,500 fast tokens",
          "Up to 75,000 banked tokens",
          "Unlimited images",
          "Collections and premium image guidance",
        ],
      },
    ],
  },
  {
    name: "Freepik",
    category: "Image Generation",
    subCategory: "AI Art Generation",
    categoryId: 2,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: ["Limited daily credits", "Access to basic features"],
      },
      {
        name: "Premium",
        price: "$24.50/month",
        functionalities: [
          "Unlimited image generations",
          "Access to advanced features",
          "Higher resolution outputs",
        ],
      },
    ],
  },
  {
    name: "Photopea",
    category: "Image Editing",
    subCategory: "AI-Assisted Editing",
    categoryId: 2,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: ["Basic editing tools", "Ad-supported"],
      },
      {
        name: "Premium",
        price: "$9/month",
        functionalities: [
          "Ad-free experience",
          "Access to advanced editing tools",
          "Increased storage",
        ],
      },
    ],
  },
  {
    name: "Stable Diffusion",
    category: "Image Generation",
    subCategory: "AI Art Generation",
    categoryId: 2,
    pricingModel: "Open Source",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Unlimited image generations",
          "Custom model support",
          "Community plugins",
        ],
      },
    ],
  },

  //   WRITING//////TEXTING

  {
    name: "ChatGPT",
    category: "Text Generation",
    subCategory: "Essay & Content Writing",
    categoryId: 3,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: ["Access to GPT-3.5 model", "Limited usage per month"],
      },
      {
        name: "Go",
        price: "₹399/month (~$5)",
        functionalities: [
          "Access to GPT-5 model",
          "10× more messages, images, and file uploads",
          "Double the memory",
        ],
      },
      {
        name: "Plus",
        price: "$20/month",
        functionalities: [
          "Access to GPT-4 model",
          "Faster response times",
          "Priority access during peak times",
        ],
      },
      {
        name: "Pro",
        price: "$200+/month",
        functionalities: [
          "Access to GPT-5 model",
          "Highest priority access",
          "Extended usage limits",
        ],
      },
    ],
  },
  {
    name: "Grammarly",
    category: "Text Generation",
    subCategory: "Writing Assistance & Essay Enhancement",
    categoryId: 3,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic grammar and spelling checks",
          "Tone detection",
        ],
      },
      {
        name: "Pro",
        price: "$12/month",
        functionalities: [
          "Advanced grammar and style checks",
          "Plagiarism detection",
          "Citations and references",
        ],
      },
      {
        name: "Business",
        price: "$15/user/month",
        functionalities: [
          "All Pro features",
          "Team management tools",
          "Centralized billing",
        ],
      },
    ],
  },
  {
    name: "Jasper",
    category: "Text Generation",
    subCategory: "Essay & Content Writing",
    categoryId: 3,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Creator",
        price: "$39/month",
        functionalities: [
          "Access to 50+ writing templates",
          "5,000 words per month",
          "Basic SEO tools",
        ],
      },
      {
        name: "Pro",
        price: "$69/month",
        functionalities: [
          "Unlimited words",
          "Advanced SEO tools",
          "Priority support",
        ],
      },
      {
        name: "Business",
        price: "Custom pricing",
        functionalities: [
          "All Pro features",
          "Team collaboration tools",
          "API access",
        ],
      },
    ],
  },
  {
    name: "Copy.ai",
    category: "Text Generation",
    subCategory: "Essay & Content Writing",
    categoryId: 3,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Access to 2,000 words per month",
          "20+ writing templates",
        ],
      },
      {
        name: "Pro",
        price: "$49/month",
        functionalities: [
          "Access to 40+ writing templates",
          "Unlimited words",
          "Team collaboration tools",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "All Pro features",
          "Advanced analytics",
          "Dedicated account manager",
        ],
      },
    ],
  },
  {
    name: "Writesonic",
    category: "Text Generation",
    subCategory: "Essay & Content Writing",
    categoryId: 3,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Lite",
        price: "$49/month",
        functionalities: [
          "Access to 75+ writing templates",
          "5,000 words per month",
          "Basic SEO tools",
        ],
      },
      {
        name: "Standard",
        price: "$99/month",
        functionalities: [
          "Unlimited words",
          "Advanced SEO tools",
          "Priority support",
        ],
      },
      {
        name: "Professional",
        price: "$249/month",
        functionalities: [
          "All Standard features",
          "Team collaboration tools",
          "API access",
        ],
      },
    ],
  },

  //   "Video / Multimedia

  {
    name: "Google Veo 3",
    category: "Video / Multimedia",
    subCategory: "Text-to-Video Generation",
    categoryId: 4,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Pro",
        price: "$30/min",
        functionalities: [
          "Generate 8-second videos from text prompts",
          "High-quality visuals with synchronized audio",
          "Ideal for quick promotional content",
        ],
      },
      {
        name: "Ultra",
        price: "Custom pricing",
        functionalities: [
          "Extended video durations",
          "Enhanced customization options",
          "Priority support",
        ],
      },
    ],
  },
  {
    name: "Runway Gen 4",
    category: "Video / Multimedia",
    subCategory: "Generative Video Editing",
    categoryId: 4,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Creator",
        price: "$12/month",
        functionalities: [
          "Generate videos from text prompts",
          "Advanced editing tools",
          "Access to 125 video credits",
        ],
      },
      {
        name: "Pro",
        price: "Custom pricing",
        functionalities: [
          "Unlimited video generation",
          "Enhanced collaboration features",
          "Priority access to new features",
        ],
      },
    ],
  },
  {
    name: "OpenAI Sora",
    category: "Video / Multimedia",
    subCategory: "AI Video Generation",
    categoryId: 4,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Plus",
        price: "$20/month",
        functionalities: [
          "Generate 5-second videos from text prompts",
          "Storyboard and prompt-based controls",
          "Integration with ChatGPT for editing",
        ],
      },
      {
        name: "Pro",
        price: "$200/month",
        functionalities: [
          "Generate 20-second videos",
          "Advanced editing features",
          "Mobile-friendly access",
        ],
      },
    ],
  },
  {
    name: "Canva AI Video Generator",
    category: "Video / Multimedia",
    subCategory: "Text-to-Video Creation",
    categoryId: 4,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate 8-second videos from text prompts",
          "Access to basic templates",
          "Limited video generation per month",
        ],
      },
      {
        name: "Pro",
        price: "$12.99/month",
        functionalities: [
          "Generate longer videos",
          "Access to premium templates and assets",
          "Enhanced customization options",
        ],
      },
    ],
  },
  {
    name: "Synthesia",
    category: "Video / Multimedia",
    subCategory: "AI Avatar Video Generation",
    categoryId: 4,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate 3 minutes of video per month",
          "Access to 9 stock avatars",
          "Voiceovers in 140+ languages",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Unlimited video generation",
          "Custom AI avatars",
          "Advanced collaboration features",
        ],
      },
    ],
  },
  {
    name: "InVideo AI",
    category: "Video / Multimedia",
    subCategory: "AI Video Editing",
    categoryId: 4,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate videos from text prompts",
          "Access to 16M+ stock images and videos",
          "Voiceover generation",
        ],
      },
      {
        name: "Business",
        price: "$15/month",
        functionalities: [
          "Unlimited video generation",
          "Advanced editing tools",
          "Priority support",
        ],
      },
    ],
  },

  //   "Audio / Music"

  {
    name: "Suno AI",
    category: "Audio / Music",
    subCategory: "Text-to-Song Generation",
    categoryId: 5,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate songs from text prompts",
          "Access to basic features",
        ],
      },
      {
        name: "Premium",
        price: "$8/month",
        functionalities: [
          "Generate more songs",
          "Access to advanced features",
          "Priority generation queue",
        ],
      },
    ],
  },
  {
    name: "Beatoven.ai",
    category: "Audio / Music",
    subCategory: "Royalty-Free Music Generation",
    categoryId: 5,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Create and customize tracks",
          "Access to basic features",
        ],
      },
      {
        name: "Pro",
        price: "$19/month",
        functionalities: [
          "Access to premium features",
          "Unlimited track generations",
          "High-quality downloads",
        ],
      },
    ],
  },
  {
    name: "AIVA",
    category: "Audio / Music",
    subCategory: "AI Music Composition",
    categoryId: 5,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate songs in various styles",
          "Access to basic features",
        ],
      },
      {
        name: "Pro",
        price: "$15/month",
        functionalities: [
          "Access to advanced features",
          "High-quality downloads",
          "Commercial rights",
        ],
      },
    ],
  },
  {
    name: "Soundful",
    category: "Audio / Music",
    subCategory: "AI Music Generation",
    categoryId: 5,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Unlimited track generations",
          "Access to 25+ free styles",
          "1 MP3 download per month",
        ],
      },
      {
        name: "Premium",
        price: "$5/month",
        functionalities: [
          "Unlimited track generations",
          "Access to 150+ styles",
          "100 MP3 & WAV downloads per month",
        ],
      },
      {
        name: "Pro",
        price: "$9.99/month",
        functionalities: [
          "Unlimited track generations",
          "Access to 150+ styles",
          "Unlimited MP3 & WAV downloads",
          "Access to Premium Content",
        ],
      },
    ],
  },
  {
    name: "Mubert",
    category: "Audio / Music",
    subCategory: "AI Music Generation",
    categoryId: 5,
    pricingModel: "Pay-as-you-go",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Generate tracks instantly",
          "Access to basic features",
        ],
      },
      {
        name: "Premium",
        price: "$5/month",
        functionalities: [
          "Generate tracks instantly",
          "Access to premium features",
          "High-quality downloads",
        ],
      },
    ],
  },
  {
    name: "Eleven Music",
    category: "Audio / Music",
    subCategory: "AI Music Generation",
    categoryId: 5,
    pricingModel: "Pay-per-use",
    plans: [
      {
        name: "Pay-as-you-go",
        price: "$0.50 per minute",
        functionalities: [
          "Generate music in various genres",
          "Access to high-quality downloads",
        ],
      },
      {
        name: "Business",
        price: "Custom pricing",
        functionalities: [
          "High-volume usage",
          "Custom licensing options",
          "Priority support",
        ],
      },
    ],
  },

  //Productivity / Office Tools

  {
    name: "Microsoft 365 Copilot",
    category: "Productivity / Office Tools",
    subCategory: "AI-Powered Office Suite",
    categoryId: 6,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Business Standard",
        price: "$12.50/user/month",
        functionalities: [
          "AI-powered assistance in Word, Excel, PowerPoint, Outlook, and Teams",
          "Natural language query support",
          "Automated summarization and content generation",
        ],
      },
      {
        name: "Business Premium",
        price: "$20/user/month",
        functionalities: [
          "Includes all Business Standard features",
          "Advanced security and compliance tools",
          "Access to Microsoft Copilot Studio for custom AI agent creation",
        ],
      },
    ],
  },
  {
    name: "Notion AI",
    category: "Productivity / Office Tools",
    subCategory: "AI-Enhanced Workspace",
    categoryId: 6,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic AI writing assistance",
          "Limited access to templates and integrations",
        ],
      },
      {
        name: "Plus",
        price: "$10/user/month",
        functionalities: [
          "Advanced AI writing and summarization tools",
          "Unlimited access to templates and integrations",
          "Priority support",
        ],
      },
    ],
  },
  {
    name: "ClickUp AI",
    category: "Productivity / Office Tools",
    subCategory: "AI-Driven Project Management",
    categoryId: 6,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free Forever",
        price: "$0",
        functionalities: [
          "Basic task and project management",
          "Limited AI automation features",
        ],
      },
      {
        name: "Unlimited",
        price: "$5/user/month",
        functionalities: [
          "Includes all Free Forever features",
          "Unlimited integrations and dashboards",
          "Advanced AI automation and reporting",
        ],
      },
    ],
  },
  {
    name: "Zapier AI",
    category: "Productivity / Office Tools",
    subCategory: "AI-Powered Automation",
    categoryId: 6,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic automation with limited tasks",
          "Access to standard integrations",
        ],
      },
      {
        name: "Starter",
        price: "$19.99/month",
        functionalities: [
          "Includes all Free features",
          "Access to premium integrations",
          "Faster task automation",
        ],
      },
    ],
  },

  // Business / Marketing / Sales Tools (categoryId: 7)
  {
    name: "HubSpot AI",
    category: "CRM & Marketing",
    subCategory: "Customer Relationship Management",
    categoryId: 7,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "AI email drafting",
          "Basic lead scoring",
          "Limited customer insights",
        ],
      },
      {
        name: "Starter",
        price: "$20/month",
        functionalities: [
          "AI content generation",
          "Automated follow-ups",
          "Basic sales forecasting",
        ],
      },
      {
        name: "Professional",
        price: "$800/month",
        functionalities: [
          "Advanced AI sales insights",
          "Customer sentiment analysis",
          "Predictive lead scoring",
        ],
      },
    ],
  },
  {
    name: "Salesforce Einstein",
    category: "CRM & Analytics",
    subCategory: "AI-Powered Sales",
    categoryId: 7,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Einstein Starter",
        price: "$50/user/month",
        functionalities: [
          "AI-powered lead scoring",
          "Opportunity insights",
          "Basic forecasting",
        ],
      },
      {
        name: "Einstein Plus",
        price: "$150/user/month",
        functionalities: [
          "Conversation analysis",
          "Next best action recommendations",
          "Advanced revenue forecasting",
        ],
      },
    ],
  },
  {
    name: "Drift",
    category: "Conversational Marketing",
    subCategory: "AI Chatbots",
    categoryId: 7,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Premium",
        price: "$400/month",
        functionalities: [
          "AI chatbots for lead qualification",
          "Automated meeting scheduling",
          "Basic conversation analytics",
        ],
      },
      {
        name: "Advanced",
        price: "$1,500/month",
        functionalities: [
          "AI-powered routing",
          "Custom chatbot training",
          "Advanced conversation analytics",
        ],
      },
    ],
  },
];

// Category 8: Data / Research / Analytics
Tools.push(
  {
    name: "Tableau with Einstein AI",
    category: "Data Visualization",
    subCategory: "AI-Enhanced Analytics",
    categoryId: 8,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Creator",
        price: "$70/user/month",
        functionalities: [
          "AI-powered data insights",
          "Natural language queries",
          "Automated chart suggestions",
        ],
      },
      {
        name: "Explorer",
        price: "$42/user/month",
        functionalities: [
          "AI trend detection",
          "Automated data storytelling",
          "Predictive analytics",
        ],
      },
    ],
  },
  {
    name: "DataRobot",
    category: "AutoML",
    subCategory: "Automated Machine Learning",
    categoryId: 8,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Business",
        price: "Custom pricing",
        functionalities: [
          "Automated model building",
          "Feature engineering",
          "Model deployment",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Advanced MLOps",
          "Model monitoring",
          "AI governance",
        ],
      },
    ],
  },
  {
    name: "Octoparse",
    category: "Data Collection",
    subCategory: "AI Web Scraping",
    categoryId: 8,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "10 crawlers",
          "Basic extraction",
          "Limited data exports",
        ],
      },
      {
        name: "Standard",
        price: "$75/month",
        functionalities: [
          "Unlimited crawlers",
          "Advanced extraction rules",
          "API access",
        ],
      },
    ],
  }
);

// Category 9: Education / Learning
Tools.push(
  {
    name: "Duolingo Max",
    category: "Language Learning",
    subCategory: "AI Tutor",
    categoryId: 9,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic language lessons",
          "Limited daily exercises",
          "Ad-supported",
        ],
      },
      {
        name: "Super",
        price: "$6.99/month",
        functionalities: [
          "Ad-free experience",
          "Unlimited hearts",
          "Progress tracking",
        ],
      },
      {
        name: "Max",
        price: "$9.99/month",
        functionalities: [
          "AI-powered explanations",
          "Conversation practice with AI",
          "Advanced grammar help",
        ],
      },
    ],
  },
  {
    name: "Quizlet",
    category: "Study Assistant",
    subCategory: "AI-Powered Flashcards",
    categoryId: 9,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: ["Basic flashcards", "Study sets", "Limited features"],
      },
      {
        name: "Plus",
        price: "$7.99/month",
        functionalities: [
          "AI-generated explanations",
          "Smart grading",
          "Personalized study plans",
        ],
      },
    ],
  },
  {
    name: "Coursera Plus",
    category: "Online Learning",
    subCategory: "AI-Recommended Courses",
    categoryId: 9,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Monthly",
        price: "$59/month",
        functionalities: [
          "Unlimited certificates",
          "AI course recommendations",
          "Guided projects",
        ],
      },
      {
        name: "Annual",
        price: "$399/year",
        functionalities: [
          "All monthly features",
          "Personalized learning paths",
          "Advanced skills tracking",
        ],
      },
    ],
  }
);

// Category 10: Health / Medical
Tools.push(
  {
    name: "Ada Health",
    category: "Health Assessment",
    subCategory: "AI Symptom Checker",
    categoryId: 10,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Personal",
        price: "$0",
        functionalities: [
          "AI symptom assessment",
          "Health information",
          "Basic guidance",
        ],
      },
      {
        name: "Professional",
        price: "Enterprise pricing",
        functionalities: [
          "Integration with EHR systems",
          "Clinical decision support",
          "Custom health protocols",
        ],
      },
    ],
  },
  {
    name: "BrainKey",
    category: "Medical Imaging",
    subCategory: "AI Brain Analysis",
    categoryId: 10,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Individual",
        price: "$30/month",
        functionalities: [
          "Brain scan visualization",
          "AI-powered insights",
          "Personalized reports",
        ],
      },
      {
        name: "Professional",
        price: "$200/month",
        functionalities: [
          "Advanced analytics",
          "Multiple patient management",
          "Clinical decision support",
        ],
      },
    ],
  },
  {
    name: "Flo",
    category: "Women's Health",
    subCategory: "AI Health Assistant",
    categoryId: 10,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Period tracking",
          "Basic health insights",
          "Community access",
        ],
      },
      {
        name: "Premium",
        price: "$9.99/month",
        functionalities: [
          "AI health assistant",
          "Personalized health insights",
          "Symptom patterns analysis",
        ],
      },
    ],
  }
);

// Category 11: Legal / Finance
Tools.push(
  {
    name: "DoNotPay",
    category: "Legal Assistant",
    subCategory: "AI Legal Services",
    categoryId: 11,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Monthly",
        price: "$36/year",
        functionalities: [
          "Generate legal documents",
          "Fight parking tickets",
          "Cancel subscriptions",
        ],
      },
    ],
  },
  {
    name: "Harvey",
    category: "Legal Research",
    subCategory: "AI Legal Analysis",
    categoryId: 11,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Professional",
        price: "Custom pricing",
        functionalities: [
          "Legal research automation",
          "Contract analysis",
          "Case law insights",
        ],
      },
    ],
  },
  {
    name: "Casetext",
    category: "Legal Research",
    subCategory: "AI Legal Assistant",
    categoryId: 11,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Professional",
        price: "$65/month",
        functionalities: [
          "AI-powered legal research",
          "Brief analysis",
          "Case law summaries",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Advanced legal research",
          "Team collaboration",
          "Custom integrations",
        ],
      },
    ],
  }
);

// Category 12: Gaming / Entertainment
Tools.push(
  {
    name: "NVIDIA GameGAN",
    category: "Game Development",
    subCategory: "AI Content Generation",
    categoryId: 12,
    pricingModel: "Free/Enterprise",
    plans: [
      {
        name: "Research",
        price: "$0",
        functionalities: [
          "Game physics simulation",
          "Basic content generation",
          "Research purposes only",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Advanced game environment generation",
          "Character behavior modeling",
          "Commercial license",
        ],
      },
    ],
  },
  {
    name: "AI Dungeon",
    category: "Interactive Fiction",
    subCategory: "AI Storytelling",
    categoryId: 12,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic AI storytelling",
          "Limited generations",
          "Standard models",
        ],
      },
      {
        name: "Scales",
        price: "$9.99/month",
        functionalities: [
          "Advanced AI models",
          "Unlimited generations",
          "Custom adventures",
        ],
      },
      {
        name: "Dragon",
        price: "$29.99/month",
        functionalities: [
          "Premium AI models",
          "Priority generation",
          "Advanced customization",
        ],
      },
    ],
  },
  {
    name: "Replika",
    category: "AI Companion",
    subCategory: "Virtual Friend",
    categoryId: 12,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic conversations",
          "Limited personality features",
          "Friendship mode only",
        ],
      },
      {
        name: "Pro",
        price: "$7.99/month",
        functionalities: [
          "Romantic relationship option",
          "Voice calls",
          "Advanced personality customization",
        ],
      },
    ],
  }
);

// Category 13: Personal / Lifestyle
Tools.push(
  {
    name: "Stitch Fix",
    category: "Fashion",
    subCategory: "AI Style Recommendations",
    categoryId: 13,
    pricingModel: "Service-based",
    plans: [
      {
        name: "Standard",
        price: "$20 styling fee per box",
        functionalities: [
          "AI-curated clothing selection",
          "Personalized style profiles",
          "Free shipping and returns",
        ],
      },
    ],
  },
  {
    name: "Planner 5D",
    category: "Interior Design",
    subCategory: "AI Room Planning",
    categoryId: 13,
    pricingModel: "Freemium",
    plans: [
      {
        name: "Free",
        price: "$0",
        functionalities: [
          "Basic room planning",
          "Limited catalog",
          "2D visualization",
        ],
      },
      {
        name: "Premium",
        price: "$6.99/month",
        functionalities: [
          "AI room suggestions",
          "Full catalog access",
          "3D visualization and rendering",
        ],
      },
    ],
  },
  {
    name: "Prose",
    category: "Personal Care",
    subCategory: "AI Custom Hair Products",
    categoryId: 13,
    pricingModel: "Product-based",
    plans: [
      {
        name: "Custom Bundle",
        price: "$53/set",
        functionalities: [
          "AI formulation based on hair profile",
          "Personalized ingredients",
          "Climate and lifestyle adaptation",
        ],
      },
    ],
  }
);

// Category 14: Security / Cybersecurity
Tools.push(
  {
    name: "Darktrace",
    category: "Network Security",
    subCategory: "AI Threat Detection",
    categoryId: 14,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Enterprise Immune System",
        price: "Custom pricing",
        functionalities: [
          "Self-learning threat detection",
          "Autonomous response",
          "Network visualization",
        ],
      },
      {
        name: "Antigena",
        price: "Custom pricing",
        functionalities: [
          "AI-powered response actions",
          "Email security",
          "Zero-trust enforcement",
        ],
      },
    ],
  },
  {
    name: "CrowdStrike Falcon",
    category: "Endpoint Security",
    subCategory: "AI Threat Prevention",
    categoryId: 14,
    pricingModel: "Subscription",
    plans: [
      {
        name: "Pro",
        price: "$8.99/endpoint/month",
        functionalities: [
          "Next-gen antivirus",
          "AI-powered threat intelligence",
          "Behavioral protection",
        ],
      },
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Advanced threat hunting",
          "Complete endpoint protection",
          "Managed threat hunting",
        ],
      },
    ],
  },
  {
    name: "Recorded Future",
    category: "Threat Intelligence",
    subCategory: "AI Risk Analysis",
    categoryId: 14,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Intelligence Platform",
        price: "Custom pricing",
        functionalities: [
          "Real-time threat intelligence",
          "AI risk scoring",
          "Automated alerts",
        ],
      },
    ],
  }
);

// Category 15: Miscellaneous / Emerging
Tools.push(
  {
    name: "Atomwise",
    category: "Drug Discovery",
    subCategory: "AI Molecular Design",
    categoryId: 15,
    pricingModel: "Enterprise/Partnership",
    plans: [
      {
        name: "Research",
        price: "Partnership-based",
        functionalities: [
          "AI-powered molecular screening",
          "Drug candidate prediction",
          "Structure-based drug design",
        ],
      },
    ],
  },
  {
    name: "Unlearn.AI",
    category: "Clinical Trials",
    subCategory: "AI Digital Twins",
    categoryId: 15,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Clinical",
        price: "Custom pricing",
        functionalities: [
          "Patient digital twins",
          "Trial size reduction",
          "Accelerated drug development",
        ],
      },
    ],
  },
  {
    name: "Climate AI",
    category: "Climate Tech",
    subCategory: "AI Climate Prediction",
    categoryId: 15,
    pricingModel: "Enterprise",
    plans: [
      {
        name: "Enterprise",
        price: "Custom pricing",
        functionalities: [
          "Climate risk assessment",
          "Adaptation strategies",
          "Supply chain resilience",
        ],
      },
    ],
  }
);

export default Tools;
