import { QRProject, QRData } from '../../types';

export async function createProject(name: string, file: File): Promise<QRProject> {
  try {
    const fileContent = await readFileContent(file);
    const qrData = parseFileContent(fileContent);
    
    const newProject: QRProject = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date(),
      data: qrData,
      settings: {
        size: 200,
        errorCorrection: 'M',
        style: {
          foreground: '#000000',
          background: '#ffffff',
          pattern: 'square'
        }
      }
    };
    
    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

async function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

function parseFileContent(content: string): QRData[] {
  // Split content by newlines and create QR data objects
  return content.split('\n')
    .filter(line => line.trim())
    .map((line, index) => ({
      id: crypto.randomUUID(),
      content: line.trim(),
      label: `Item ${index + 1}`
    }));
} 