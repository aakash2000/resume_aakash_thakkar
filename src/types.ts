export interface Link {
  label: string
  url: string
}

export interface Experience {
  company: string
  role: string
  location?: string
  start: string
  end: string
  bullets: string[]
  tech?: string[]
}

export interface Project {
  name: string
  description: string
  url?: string
  tech?: string[]
}

export interface Education {
  school: string
  degree: string
  start?: string
  end: string
  details?: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Resume {
  name: string
  title: string
  location?: string
  email?: string
  phone?: string
  links: Link[]
  summary: string
  experience: Experience[]
  projects?: Project[]
  skills: SkillGroup[]
  education: Education[]
  certifications?: string[]
}
