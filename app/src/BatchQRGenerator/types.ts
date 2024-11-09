export interface QRProject {
  id: string;
  name: string;
  createdAt: Date;
  data: QRData[];
  settings: QRSettings;
}

export interface QRData {
  id: string;
  content: string;
  label?: string;
}

export interface QRSettings {
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  logo?: {
    url: string;
    size: number;
  };
  style: {
    foreground: string;
    background: string;
    pattern: 'square' | 'circle' | 'hexagon';
    gradient?: string;
  };
}

export type QRContentType = 'URL' | 'vCard' | 'Text' | 'Email' | 'SMS' | 'WiFi';