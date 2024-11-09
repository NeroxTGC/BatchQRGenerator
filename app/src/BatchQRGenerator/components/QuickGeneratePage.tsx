import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import { Download, Save, FileImage, FileCode, Link, QrCode, Mail, MessageSquare, Wifi } from 'lucide-react';
import ColorPicker from './common/ColorPicker';
import { QRContentType, QRData, QRProject } from '../types';
import SelectProjectModal from './projects/SelectProjectModal';
import { colorPresets } from '../constants/colorPresets';
import QRCode from 'qrcode';
  

interface Props {
  onSaveToProject: (project: QRProject) => void;
  projects: QRProject[];
  onAddToExistingProject: (projectId: string, qrData: QRData) => void;
}

interface FormState {
  url: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  text: string;
  emailAddress: string;
  emailSubject: string;
  emailBody: string;
  phoneNumber: string;
  message: string;
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

const contentTypeConfig = [
  { type: 'URL' as const, icon: Link, label: 'URL' },
  { type: 'vCard' as const, icon: QrCode, label: 'Contact' },
  { type: 'Text' as const, icon: QrCode, label: 'Text' },
  { type: 'Email' as const, icon: Mail, label: 'Email' },
  { type: 'SMS' as const, icon: MessageSquare, label: 'SMS' },
  { type: 'WiFi' as const, icon: Wifi, label: 'WiFi' },
] as const;

const QuickGeneratePage = ({ onSaveToProject, projects, onAddToExistingProject }: Props) => {
  const [qrValue, setQrValue] = useState('');
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');
  const [isSelectProjectModalOpen, setIsSelectProjectModalOpen] = useState(false);
  const [fileName, setFileName] = useState('qr');
  const [contentType, setContentType] = useState<QRContentType>('URL');
  const [formState, setFormState] = useState<FormState>({
    url: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    text: '',
    emailAddress: '',
    emailSubject: '',
    emailBody: '',
    phoneNumber: '',
    message: '',
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  const qrRef = useRef<HTMLCanvasElement>(null);

  // Definir el estilo base para todos los inputs
  const inputBaseStyles = `w-full 
    px-4 py-3 rounded-lg 
    bg-white/50 dark:bg-purple-900/30 
    border border-purple-200 dark:border-purple-500/30 
    text-gray-900 dark:text-white 
    placeholder-gray-500 dark:placeholder-purple-300
    focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-purple-500/50 
    focus:border-transparent
    transition-colors duration-300`;

  const generateQRValue = (): string => {
    switch (contentType) {
      case 'URL':
        return formState.url;
      case 'vCard':
        return `BEGIN:VCARD
VERSION:3.0
FN:${formState.firstName} ${formState.lastName}
ORG:${formState.company}
TEL:${formState.phone}
EMAIL:${formState.email}
END:VCARD`;
      case 'Text':
        return formState.text;
      case 'Email':
        return `mailto:${formState.emailAddress}?subject=${encodeURIComponent(formState.emailSubject)}&body=${encodeURIComponent(formState.emailBody)}`;
      case 'SMS':
        return `smsto:${formState.phoneNumber}:${formState.message}`;
      case 'WiFi':
        return `WIFI:T:${formState.encryption};S:${formState.ssid};P:${formState.password};;`;
      default:
        return '';
    }
  };

  const renderContentInput = () => {
    switch (contentType) {
      case 'URL':
        return (
          <div className="space-y-4">
              <input
              type="url"
              value={formState.url}
              onChange={(e) => setFormState({ ...formState, url: e.target.value })}
              className={inputBaseStyles}
              placeholder="https://example.com"
            />
          </div>
        );

      case 'vCard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={formState.firstName}
                onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                className={inputBaseStyles}
                placeholder="First Name"
              />
              <input
                type="text"
                value={formState.lastName}
                onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                className={inputBaseStyles}
                placeholder="Last Name"
              />
            </div>
            <input
              type="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className={inputBaseStyles}
              placeholder="Email"
            />
            <input
              type="tel"
              value={formState.phone}
              onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
              className={inputBaseStyles}
              placeholder="Phone"
            />
            <input
              type="text"
              value={formState.company}
              onChange={(e) => setFormState({ ...formState, company: e.target.value })}
              className={inputBaseStyles}
              placeholder="Company"
            />
          </div>
        );

      case 'Text':
        return (
          <textarea
            value={formState.text}
            onChange={(e) => setFormState({ ...formState, text: e.target.value })}
            className={inputBaseStyles}
            placeholder="Enter your text here..."
          />
        );

      case 'Email':
        return (
          <div className="space-y-4">
            <input
              type="email"
              value={formState.emailAddress}
              onChange={(e) => setFormState({ ...formState, emailAddress: e.target.value })}
              className={inputBaseStyles}
              placeholder="Email Address"
            />
            <input
              type="text"
              value={formState.emailSubject}
              onChange={(e) => setFormState({ ...formState, emailSubject: e.target.value })}
              className={inputBaseStyles}
              placeholder="Subject"
            />
            <textarea
              value={formState.emailBody}
              onChange={(e) => setFormState({ ...formState, emailBody: e.target.value })}
              className={inputBaseStyles}
              placeholder="Email Body"
            />
          </div>
        );

      case 'SMS':
        return (
          <div className="space-y-4">
            <input
              type="tel"
              value={formState.phoneNumber}
              onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })}
              className={inputBaseStyles}
              placeholder="Phone Number"
            />
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className={inputBaseStyles}
              placeholder="Message"
            />
          </div>
        );

      case 'WiFi':
        return (
          <div className="space-y-4">
            <input
              type="text"
              value={formState.ssid}
              onChange={(e) => setFormState({ ...formState, ssid: e.target.value })}
              className={inputBaseStyles}
              placeholder="Network Name (SSID)"
            />
            <input
              type="password"
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              className={inputBaseStyles}
              placeholder="Password"
            />
            <select
              value={formState.encryption}
              onChange={(e) => setFormState({ ...formState, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
              className={inputBaseStyles}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Encryption</option>
            </select>
          </div>
        );

      default:
        return null;
    }
  };

  const handleDownloadPNG = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${fileName || 'qr'}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadSVG = () => {
    const svgElement = document.getElementById('qr-svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement('a');
    link.href = svgUrl;
    link.download = `${fileName || 'qr'}-${Date.now()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(svgUrl);
  };

  const handleSaveToProject = () => {
    setIsSelectProjectModalOpen(true);
  };

  const handleAddToProject = (projectId: string) => {
    const qrData = {
      id: crypto.randomUUID(),
      content: generateQRValue(),
      label: 'Quick Generated QR'
    };
    onAddToExistingProject(projectId, qrData);
    setIsSelectProjectModalOpen(false);
  };

  const QRPreview = () => (
    <div className="relative qr-preview">
      <QRCodeCanvas
        ref={qrRef}
        value={generateQRValue()}
        size={380}
        level="H"
        fgColor={foreground}
        bgColor={background}
      />
      <div className="absolute top-0 left-0 opacity-0 pointer-events-none">
        <QRCodeSVG
          id="qr-svg"
          value={generateQRValue()}
          size={380}
          level="H"
          fgColor={foreground}
          bgColor={background}
        />
      </div>
    </div>
  );

  const generateQRForDownload = async () => {
    try {
      const qrValue = generateQRValue();
      const dataUrl = await QRCode.toDataURL(qrValue, {
        width: 500,
        margin: 1,
        color: {
          dark: foreground,
          light: background,
        }
      });
      return dataUrl;
    } catch (err) {
      console.error('Error generating QR code:', err);
      return null;
    }
  };

  useEffect(() => {
    const updateQRCode = async () => {
      if (qrRef.current) {
        try {
          await QRCode.toCanvas(qrRef.current, generateQRValue(), {
            width: 380,
            margin: 1,
            color: {
              dark: foreground,
              light: background,
            }
          });
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      }
    };
    
    updateQRCode();
  }, [formState, contentType, foreground, background]);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-black min-h-screen pt-20 sm:pt-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-8 lg:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Quick QR Generator
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-purple-200 max-w-2xl mx-auto">
            Create beautiful, customizable QR codes in seconds
          </p>
        </div>

        <div className="bg-white/50 dark:bg-purple-900/20 backdrop-blur-sm rounded-xl border border-purple-200 dark:border-purple-500/20 p-3 sm:p-4 lg:p-6 transition-all duration-300">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                {contentTypeConfig.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setContentType(type)}
                    className={`
                      flex items-center justify-start px-3 py-2 rounded-lg
                      transition-all duration-300
                      ${contentType === type
                        ? 'bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 text-white'
                        : 'bg-white/50 dark:bg-purple-900/20 text-gray-600 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-800/30'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {renderContentInput()}
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Color Presets
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setForeground(preset.foreground);
                        setBackground(preset.background);
                      }}
                      className="group p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 
                               border border-gray-100 dark:border-gray-700 
                               hover:border-gray-200 dark:hover:border-gray-600 
                               transition-colors"
                      title={preset.description}
                    >
                      <div className="w-full aspect-square rounded-md mb-1 overflow-hidden 
                                  border border-gray-200 dark:border-gray-600">
                        <div className="h-1/2 w-full" style={{ backgroundColor: preset.background }} />
                        <div className="h-1/2 w-full" style={{ backgroundColor: preset.foreground }} />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 
                                   group-hover:text-gray-900 dark:group-hover:text-white 
                                   text-center block truncate">
                        {preset.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-row gap-4">
                <ColorPicker
                  label="Foreground Color"
                  value={foreground}
                  onChange={setForeground}
                />
                <ColorPicker
                  label="Background Color"
                  value={background}
                  onChange={setBackground}
                />
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4 sm:space-y-6">
              <div className="w-full max-w-[380px] aspect-square bg-white/80 dark:bg-purple-900/30 rounded-xl p-2 sm:p-4 flex items-center justify-center shadow-lg border border-purple-200 dark:border-purple-500/20 transition-all duration-300">
                <canvas
                  ref={qrRef}
                  className="max-w-full max-h-full"
                  width="380"
                  height="380"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full">
                <button
                  onClick={handleDownloadPNG}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 
                            text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
                            hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  <Download className="w-5 h-5" />
                  Download PNG
                </button>
                <button
                  onClick={handleDownloadSVG}
                  className="flex-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 
                            px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
                            hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-all duration-300"
                >
                  <FileCode className="w-5 h-5" />
                  Download SVG
                </button>
                <button 
                  onClick={handleSaveToProject}
                  className="flex-1 bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 
                            px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 
                            hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  Save to Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SelectProjectModal
        isOpen={isSelectProjectModalOpen}
        onClose={() => setIsSelectProjectModalOpen(false)}
        projects={projects}
        onSelect={handleAddToProject}
      />
    </div>
  );
};

export { QuickGeneratePage };