"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  TriangleAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { fetchUploadedFiles, uploadExcelFile, fetchFileDetails } from "../../actions/excel";
import { useQuery } from "@tanstack/react-query";
import HistorialArchivos from "../../components/historial-files-table"; // Importa el nuevo componente reutilizable
import FullScreenLoader from "../../components/FullScreenLoader";

// Define el tipo de los detalles de alojamiento
interface AccommodationItem {
  _id: string;
  schoolName: string;
  city: string;
  alojamiento: string;
  semanas: string;
  habitacion: string;
  valorSemanal: string;
}

interface ColumnDefinition<T> {
  key: keyof T; // La clave del objeto que se mostrará en la columna
  header: string; // El encabezado de la columna
  render?: (value: any, row: T) => React.ReactNode; // Función opcional para personalizar el renderizado
}

const AlojamientoPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Consulta para obtener los archivos subidos
  const {
    data,
    error: queryError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["uploadedFiles", "Alojamiento"],
    queryFn: () => fetchUploadedFiles("Alojamiento"),
  });

  // Define las columnas para la tabla de detalles
  const columns: ColumnDefinition<AccommodationItem>[] = [
    { key: "schoolName", header: "🏫 Escuela" },
    { key: "city", header: "📍 Ciudad" },
    { key: "alojamiento", header: "🏡 Alojamiento" },
    { key: "semanas", header: "📆 Semanas" },
    { key: "habitacion", header: "🛏️ Habitación" },
    { key: "valorSemanal", header: "💰 Valor" },
  ];

  // Manejador para subir archivos
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    setSuccess(null);

    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];

    // Validar tipo de archivo
    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError("Por favor seleccione un archivo Excel válido (.xlsx o .xls)");
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("El archivo es demasiado grande. El tamaño máximo es 10MB.");
      return;
    }

    setFile(selectedFile);
    setIsLoading(true);

    try {
      // Crear FormData antes de enviarlo
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Simular progreso de carga
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 5;
        });
      }, 100);

      // Enviar el FormData a la Server Action
      const result = await uploadExcelFile(formData);

      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsLoading(false);
        setProgress(0);

        if (result.status === 200) {
          setSuccess(
            `Se insertaron ${result.data.processedRows} registros correctamente en la base de datos`
          );
          toast.success("Procesamiento exitoso");

          // Limpiar el estado después del éxito
          setTimeout(() => {
            setFile(null);
            setSuccess(null);
          }, 3000);
        } else {
          setError(result.error || "Error al procesar los datos");
        }
      }, 500);
    } catch (error) {
      setIsLoading(false);
      setProgress(0);
      setError("Error al procesar los datos en el servidor");
      console.error("Error processing data:", error);
    }
  }, []);

  // Configuración de Dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  });

  // Manejador para resetear el estado
  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setIsLoading(false);
    setProgress(0);
  };

  // Renderizado condicional
  if (queryLoading) {
    return <FullScreenLoader isLoading={queryLoading} />;
  }

  if (queryError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Ocurrió un error al cargar los archivos. Por favor, intenta nuevamente.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-6">
        {/* Mensajes de error y éxito */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-700">Éxito</AlertTitle>
            <AlertDescription className="text-green-600">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Dropzone para subir archivos */}
        {!file && (
          <Card
            className={`border-2 border-dashed p-6 ${
              isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
          >
            <div
              {...getRootProps()}
              className="flex flex-col items-center justify-center space-y-4 py-10 text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              <div className="rounded-full bg-primary/10 p-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Suelte el archivo aquí"
                    : "Arrastre y suelte un archivo de Alojamiento Excel aquí"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  o haga clic para seleccionar un archivo
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                Formatos soportados: .xlsx, .xls (máximo 10MB)
              </p>
            </div>
          </Card>
        )}

        {/* Barra de progreso */}
        {isLoading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Procesando e insertando datos...
              </span>
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Información del archivo seleccionado */}
        {file && !isLoading && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleReset}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}

        {/* Tabla o alerta de archivos cargados */}
        {data?.success && data.files.length > 0 ? (
          <HistorialArchivos<AccommodationItem>
            files={data.files}
            fileType="Alojamiento"
            columns={columns}
            fetchDetails={fetchFileDetails} // Función para obtener detalles
          />
        ) : (
          <Alert
            variant="default"
            className="bg-blue-50 border-blue-300 text-center"
          >
            <TriangleAlert className="h-4 w-4 text-blue-500 text-center justify-center" />
            <AlertTitle className="text-blue-700">Atencion</AlertTitle>
            <AlertDescription className="text-blue-600">
              No hay archivos cargados
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AlojamientoPage;