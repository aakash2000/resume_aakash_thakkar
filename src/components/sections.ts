export const SECTION_IDS = ['summary', 'experience', 'education', 'skills'] as const
export type SectionId = (typeof SECTION_IDS)[number]
