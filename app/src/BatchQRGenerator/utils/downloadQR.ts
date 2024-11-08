export const downloadQR = (canvas: HTMLCanvasElement | null, fileName: string) => {
  if (!canvas) return;
  
  const link = document.createElement('a');
  link.download = `${fileName}-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 