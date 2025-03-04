import imageCompression from "browser-image-compression";

const compressImage = async (file: File): Promise<File> => {
  const options = {
    maxSizeMB: 1, // 🔥 Reduce el tamaño a 2MB sin perder calidad
    maxWidthOrHeight: 1920, // 🔥 Mantiene imágenes con una resolución óptima
    useWebWorker: true, // 🔥 Optimiza la compresión en segundo plano
  };

  try {
    return await imageCompression(file, options);
  } catch (error) {
    console.error("Error al comprimir la imagen:", error);
    return file; // Si hay error, devuelve el archivo original
  }
};

export default compressImage;