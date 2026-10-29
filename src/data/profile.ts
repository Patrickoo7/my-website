// Edit this file to update your name, links and bio across the whole site.
export const profile = {
  name: 'Prateek Awate',
  role: 'AI/ML Engineer',
  tagline: 'Published research in quantum optimization; now working toward machine-learning decoders for quantum error correction.',
  openTo: 'Open to PhD positions in quantum computing, research collaborations, and AI/ML engineering roles.',
  location: 'Pune, India',
  employer: 'Stark Digital Media Services',
  email: 'awateprateek@gmail.com',
  bio: [
    "I'm an AI engineer, currently AI Tech Lead at Stark Digital Media Services in Pune, with 4.5+ years of experience shipping computer vision and LLM systems to production, from face recognition running on a Raspberry Pi to air-gapped Llama 3 deployments and microservices serving hundreds of users.",
    'My research is moving toward quantum computing. I want to work on quantum error correction, and in particular on machine-learning decoders that are accurate and fast enough for real-time use. At CLEF 2026 I formulated training-data selection as a QUBO and ran it on D-Wave quantum annealing hardware. That entry ranked 1st among pure quantum-annealing submissions.',
    "I'm currently doing an MS in Computer Science at Georgia Tech (OMSCS) and applying to PhD programs in quantum computing.",
  ],
  // Shown as the "Interests" line in the home page hero.
  focusAreas: ['Production AI systems', 'Quantum error correction', 'Quantum optimization', 'Data-efficient learning'],
  interests: [
    { title: 'Quantum error correction', text: 'Machine-learning decoders that are accurate and fast enough for real-time use.', primary: true },
    { title: 'Decoding as inference', text: 'Treating syndrome decoding as a statistical inference problem.' },
    { title: 'Quantum optimization', text: 'QUBO formulations, quantum and simulated annealing on D-Wave hardware.' },
    { title: 'Data-efficient learning', text: 'Instance and batch selection, confident learning, training on less data.' },
  ],
  skills: {
    'Quantum & Optimization': ['QUBO formulation', 'D-Wave Ocean SDK', 'Quantum / simulated annealing', 'BoTorch', 'Stim & PyMatching (learning)'],
    'Machine Learning': ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'LoRA fine-tuning', 'Cleanlab', 'YOLO / SAM / VLMs'],
    'LLM & Retrieval': ['LangChain / LangGraph', 'RAG', 'FAISS', 'Weaviate', 'pgvector', 'Multi-model routing'],
    'Engineering': ['Python (async)', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'TypeScript / React'],
  },
  stats: [
    { value: '1st', label: 'among quantum-annealing entries, QuantumCLEF 2026' },
    { value: '1st', label: 'overall, CLEF 2026 JOKER Task 2' },
    { value: '4.5+', label: 'years building production AI' },
    { value: '3', label: 'publications' },
  ],
  education: [
    {
      degree: 'MS, Computer Science (OMSCS)',
      school: 'Georgia Institute of Technology, Atlanta, USA',
      period: 'Expected Dec 2027',
      detail: 'Research: CS6999 with Prof. Steve Mussmann (LITE Batching) · DS@GT QuantumCLEF team',
    },
    {
      degree: 'B.E., Electronics and Telecommunication',
      school: 'Dr. D. Y. Patil School of Engineering, Pune, India',
      period: 'May 2021',
      detail: '',
    },
  ],
  certifications: [
    'DP-900 Microsoft Certified: Azure Data Fundamentals',
    'NVIDIA: Building LLM Applications with Prompt Engineering',
    'NVIDIA: Rapid Application Development using Large Language Models',
  ],
  languages: 'English (fluent) · Hindi (native) · Marathi (native) · Japanese (conversational)',
  // Shown on the home page, newest first. Keep it to 4–6 items.
  news: [
    { date: 'Oct 2026', text: 'Joined Stark Digital Media Services, Pune, as AI Tech Lead.' },
    { date: 'Sep 2026', text: 'Two papers published in the CLEF 2026 Working Notes (CEUR-WS Vol. 4283), Jena, Germany.' },
    { date: '2026', text: 'Ranked 1st among pure quantum-annealing submissions (4th overall) in QuantumCLEF 2026, Task 2.' },
    { date: '2026', text: 'Our team ranked 1st overall in CLEF 2026 JOKER Task 2 (English→French pun translation).' },
    { date: 'Spring 2026', text: 'Graduate research (CS6999) at Georgia Tech with Prof. Steve Mussmann on training-batch selection.' },
  ],
  links: {
    github: 'https://github.com/Patrickoo7',
    linkedin: 'https://www.linkedin.com/in/awateprateek/',
    orcid: 'https://orcid.org/0009-0002-1878-9700',
    scholar: '', // add your Google Scholar URL when you have one
  },
  // Sign up free at formspree.io and paste your form ID here to enable the contact form.
  formspreeId: '',
};
