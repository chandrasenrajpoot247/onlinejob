
import { SiteSettings, CategoryType } from './types';

export const CATEGORIES: CategoryType[] = [
  'Result',
  'Admit Card',
  'Latest Job',
  'Answer Key',
  'Syllabus',
  'Admission'
];

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Sarkari AI Pro',
  slogan: 'शिक्षा एवं रोजगार का विश्वसनीय माध्यम',
  primaryColor: '#1e40af', 
  secondaryColor: '#dc2626', 
  logoUrl: 'https://picsum.photos/200/50',
  publisherId: '',
  copyProtection: false,
  socialLinks: [
    { platform: 'Facebook', url: '#' },
    { platform: 'Telegram', url: '#' },
    { platform: 'Twitter', url: '#' }
  ],
  adminPassword: 'admin123' // Default Password
};
