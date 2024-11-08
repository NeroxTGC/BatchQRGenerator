interface ColorPreset {
  id: string;
  name: string;
  foreground: string;
  background: string;
  description: string;
}

export const colorPresets: ColorPreset[] = [
  {
    id: 'classic',
    name: 'Classic',
    foreground: '#000000',
    background: '#FFFFFF',
    description: 'Traditional black and white'
  },
  {
    id: 'navy',
    name: 'Navy Business',
    foreground: '#1E3A8A',
    background: '#F1F5F9',
    description: 'Professional and trustworthy'
  },
  {
    id: 'forest',
    name: 'Forest',
    foreground: '#064E3B',
    background: '#ECFDF5',
    description: 'Natural and calming'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    foreground: '#9F1239',
    background: '#FFF1F2',
    description: 'Warm and inviting'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    foreground: '#6D28D9',
    background: '#F5F3FF',
    description: 'Modern and sleek'
  }
]; 