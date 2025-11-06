import type { Exam, Resource, Subject } from "./types"

export const STUDENT_PASSWORD = "student123"
export const ADMIN_PASSWORD = "admin123"

export const exams: Exam[] = [
  {
    id: "cbse-10",
    name: "CBSE Class 10",
    grade: "10",
    description: "Central Board of Secondary Education - Class 10",
    subjects: ["Mathematics", "Science", "Social Studies", "English", "Hindi"],
  },
  {
    id: "cbse-12",
    name: "CBSE Class 12",
    grade: "12",
    description: "Central Board of Secondary Education - Class 12",
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English"],
  },
  {
    id: "jee-main",
    name: "JEE Main",
    grade: "12+",
    description: "Joint Entrance Examination - Engineering Entrance",
    subjects: ["Physics", "Chemistry", "Mathematics"],
  },
  {
    id: "neet",
    name: "NEET",
    grade: "12+",
    description: "National Eligibility cum Entrance Test - Medical Entrance",
    subjects: ["Physics", "Chemistry", "Biology"],
  },
]

export const resources: Resource[] = [
  // CBSE 10 Math Resources
  {
    id: "res-1",
    title: "Quadratic Equations Explained",
    type: "video",
    subject: "Mathematics",
    difficulty: "medium",
    topics: ["Quadratic Equations"],
    url: "https://youtu.be/example1",
    description: "Complete guide to solving quadratic equations with examples",
  },
  {
    id: "res-2",
    title: "CBSE Math Class 10 - Past Year Papers",
    type: "practice",
    subject: "Mathematics",
    difficulty: "hard",
    topics: ["Mixed Topics"],
    url: "https://example.com/cbse-10-math-papers",
    description: "5 years of previous year question papers with solutions",
  },
  {
    id: "res-3",
    title: "Trigonometry Basics PDF",
    type: "pdf",
    subject: "Mathematics",
    difficulty: "easy",
    topics: ["Trigonometry"],
    url: "https://example.com/trig.pdf",
    description: "Comprehensive PDF guide on trigonometry fundamentals",
  },
  // Science Resources
  {
    id: "res-4",
    title: "Chemical Reactions - Animated",
    type: "video",
    subject: "Science",
    difficulty: "easy",
    topics: ["Chemistry"],
    url: "https://youtu.be/example2",
    description: "Animated explanations of common chemical reactions",
  },
  {
    id: "res-5",
    title: "Physics - Motion and Forces",
    type: "video",
    subject: "Science",
    difficulty: "medium",
    topics: ["Physics", "Motion"],
    url: "https://youtu.be/example3",
    description: "Detailed lessons on motion, velocity, and forces",
  },
  {
    id: "res-6",
    title: "Biology Diagrams & Notes",
    type: "pdf",
    subject: "Science",
    difficulty: "medium",
    topics: ["Biology"],
    url: "https://example.com/biology.pdf",
    description: "Comprehensive notes with diagrams for biology topics",
  },
  // JEE Resources
  {
    id: "res-7",
    title: "Advanced Integration Techniques",
    type: "video",
    subject: "Mathematics",
    difficulty: "hard",
    topics: ["Calculus", "Integration"],
    url: "https://youtu.be/example4",
    description: "JEE-level integration problems and solutions",
  },
  {
    id: "res-8",
    title: "Thermodynamics for JEE",
    type: "pdf",
    subject: "Physics",
    difficulty: "hard",
    topics: ["Thermodynamics"],
    url: "https://example.com/thermodynamics.pdf",
    description: "Advanced thermodynamics concepts with JEE problems",
  },
  // NEET Resources
  {
    id: "res-9",
    title: "Human Anatomy - Complete Course",
    type: "video",
    subject: "Biology",
    difficulty: "medium",
    topics: ["Anatomy", "Physiology"],
    url: "https://youtu.be/example5",
    description: "Complete human anatomy course with 3D visualizations",
  },
  {
    id: "res-10",
    title: "NEET Biology Question Bank",
    type: "practice",
    subject: "Biology",
    difficulty: "hard",
    topics: ["Mixed Topics"],
    url: "https://example.com/neet-biology-qb",
    description: "1000+ practice questions from previous NEET exams",
  },
]

export const examWeightages: Record<string, Subject[]> = {
  "cbse-10": [
    { id: "s1", name: "Mathematics", weightage: 25, weakTopics: [] },
    { id: "s2", name: "Science", weightage: 25, weakTopics: [] },
    { id: "s3", name: "Social Studies", weightage: 20, weakTopics: [] },
    { id: "s4", name: "English", weightage: 15, weakTopics: [] },
    { id: "s5", name: "Hindi", weightage: 15, weakTopics: [] },
  ],
  "cbse-12": [
    { id: "s6", name: "Mathematics", weightage: 33, weakTopics: [] },
    { id: "s7", name: "Physics", weightage: 33, weakTopics: [] },
    { id: "s8", name: "Chemistry", weightage: 33, weakTopics: [] },
    { id: "s9", name: "English", weightage: 15, weakTopics: [] },
    { id: "s10", name: "Biology", weightage: 15, weakTopics: [] },
  ],
  "jee-main": [
    { id: "s11", name: "Physics", weightage: 33, weakTopics: [] },
    { id: "s12", name: "Chemistry", weightage: 33, weakTopics: [] },
    { id: "s13", name: "Mathematics", weightage: 34, weakTopics: [] },
  ],
  neet: [
    { id: "s14", name: "Physics", weightage: 25, weakTopics: [] },
    { id: "s15", name: "Chemistry", weightage: 25, weakTopics: [] },
    { id: "s16", name: "Biology", weightage: 50, weakTopics: [] },
  ],
}
