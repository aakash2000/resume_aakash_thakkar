import type { Resume } from '../types'

// Placeholder content — replace with your real resume.
export const resume: Resume = {
  name: 'Aakash Thakkar',
  title: 'Software Engineer',
  location: 'City, Country',
  email: 'you@example.com',
  links: [
    { label: 'GitHub', url: 'https://github.com/your-username' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/your-profile' },
  ],
  summary:
    'Short two or three sentence summary of who you are, what you build, and what you are looking for next.',
  experience: [
    {
      company: 'Company Name',
      role: 'Senior Software Engineer',
      location: 'Remote',
      start: 'Jan 2023',
      end: 'Present',
      bullets: [
        'Impact-focused bullet with a measurable result.',
        'Another accomplishment describing scope and outcome.',
      ],
      tech: ['TypeScript', 'React', 'Node.js'],
    },
  ],
  projects: [
    {
      name: 'Project Name',
      description: 'One line on what it does and why it matters.',
      url: 'https://github.com/your-username/project',
      tech: ['React', 'Vite'],
    },
  ],
  skills: [
    { category: 'Languages', items: ['TypeScript', 'Python', 'SQL'] },
    { category: 'Frameworks', items: ['React', 'Node.js'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS'] },
  ],
  education: [
    {
      school: 'University Name',
      degree: 'B.S. Computer Science',
      end: '2020',
    },
  ],
}
