import imageCompression from 'browser-image-compression';

const compressImage = async (file: File): Promise<File> => {
  // No comprimir archivos SVG
  if (file.type === 'image/svg+xml') {
    return file;
  }

  const originalSizeMB = file.size / (1024 * 1024);
  const options = {
    maxSizeMB: Math.min(1, originalSizeMB * 0.3), // Más agresivo con imágenes grandes
    maxWidthOrHeight: originalSizeMB > 5 ? 800 : 1200,
    useWebWorker: true,
    fileType: file.type.includes('png') ? 'image/png' : 'image/webp',
    initialQuality: 0.7,
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error al comprimir:", error);
    throw new Error("No se pudo optimizar la imagen. Intente con otro archivo");
  }
};

export default compressImage;