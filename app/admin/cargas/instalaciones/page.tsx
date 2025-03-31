"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  Upload,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  TriangleAlert,
  X,
  CheckSquare,
  Square,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  fetchInstallation,
  fetchUploadedFiles,
  uploadExcelInstallation,
} from "../../actions/excel";
import { useMutation, useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Progress } from "@/components/ui/progress";
import HistorialArchivos from "../../components/historial-files-table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface Instalacion {
  Nombre_Escuela_Adm: string;
  Ciudad_Escuela: string;
  Biblioteca: number;
  Laboratorio_de_informatica: number;
  Areas_de_autoaprendizaje: number;
  TV: string;
  Pizarra_digital: string;
  Calefaccion: string;
  Cafeteria: number;
  Restaurante: number;
  Cocina_para_uso_de_los_estudiantes: number;
  Sala_de_juegos_recreacion: number;
  Jardin: number;
  Terraza_en_la_azotea: number;
  Salon: number;
  Zona_deportiva: number;
  Microondas: number;
  Nevera: number;
  Maquina_expendedora: number;
  Dispensador_de_agua: number;
  Impresora_fotocopiadora: number;
  Free_Wi_Fi: number;
  Accesos_a_aulas_adaptados_a_sillas_de_ruedas: number;
  WC_para_minusvalidos: number;
  Elevators: number;
  Patrimoniales: number;
  Diseno_imponente: number;
  Clasicos_tradicionales: number;
  Modernos_Contemporaneos: number;
  AULAS: number;
}

interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

const InstalacionesPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: uploadedFiles,
    error: queryError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["uploadedFiles", "Instalaciones"],
    queryFn: () => fetchUploadedFiles("Instalaciones"),
  });

  const columnas: ColumnDefinition<Instalacion>[] = [
    { key: "Nombre_Escuela_Adm", header: "Nombre Escuela Adm" },
    { key: "Ciudad_Escuela", header: "Ciudad" },
    { key: "Biblioteca", header: "Biblioteca" },
    { key: "Laboratorio_de_informatica", header: "Laboratorio de Informática" },
    { key: "Areas_de_autoaprendizaje", header: "Áreas de Autoaprendizaje" },
    { key: "TV", header: "TV" },
    { key: "Pizarra_digital", header: "Pizarra Digital" },
    { key: "Calefaccion", header: "Calefacción" },
    { key: "Cafeteria", header: "Cafetería" },
    { key: "Restaurante", header: "Restaurante" },
    {
      key: "Cocina_para_uso_de_los_estudiantes",
      header: "Cocina para Estudiantes",
    },
    { key: "Sala_de_juegos_recreacion", header: "Sala de Juegos/Recreación" },
    { key: "Jardin", header: "Jardín" },
    { key: "Terraza_en_la_azotea", header: "Terraza en la Azotea" },
    { key: "Salon", header: "Salón" },
    { key: "Zona_deportiva", header: "Zona Deportiva" },
    { key: "Microondas", header: "Microondas" },
    { key: "Nevera", header: "Nevera" },
    { key: "Maquina_expendedora", header: "Máquina Expendedora" },
    { key: "Dispensador_de_agua", header: "Dispensador de Agua" },
    { key: "Impresora_fotocopiadora", header: "Impresora/Fotocopiadora" },
    { key: "Free_Wi_Fi", header: "Free Wi-Fi" },
    {
      key: "Accesos_a_aulas_adaptados_a_sillas_de_ruedas",
      header: "Accesos para Sillas de Ruedas",
    },
    { key: "WC_para_minusvalidos", header: "WC para Minusválidos" },
    { key: "Elevators", header: "Elevadores" },
    { key: "Patrimoniales", header: "Patrimoniales" },
    { key: "Diseno_imponente", header: "Diseño Imponente" },
    { key: "Clasicos_tradicionales", header: "Clásicos/Tradicionales" },
    { key: "Modernos_Contemporaneos", header: "Modernos/Contemporáneos" },
    { key: "AULAS", header: "Aulas" },
  ];

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
      uploadExcelInstallation(formData, selectedColumns),
    onSuccess: () => {
      toast.success("Se insertaron los registros correctamente.");
      setFile(null);
      setSelectedColumns([]);
      setColumns([]);
    },
    onError: (error: any) => {
      setError(error.message || "Error al procesar los datos en el servidor");
    },
  });

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

    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      const data = new Uint8Array(event.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as any[];

      jsonData = jsonData.filter((row) =>
        row.some(
          (cell: any) => cell !== undefined && cell !== null && cell !== ""
        )
      );

      let columnNames = jsonData[0] as string[];

      // Normalizar nombres de columnas y evitar duplicados
      const uniqueColumns: string[] = [];
      const columnCount: Record<string, number> = {};

      columnNames.forEach((col) => {
        let cleanCol = col.trim().replace(/\s+/g, "_"); // Normalizar nombre

        if (columnCount[cleanCol] !== undefined) {
          columnCount[cleanCol]++;
          cleanCol = `${cleanCol}_${columnCount[cleanCol]}`;
        } else {
          columnCount[cleanCol] = 0;
        }

        uniqueColumns.push(cleanCol);
      });

      setColumns(uniqueColumns);
      setSelectedColumns(uniqueColumns);
    };

    reader.readAsArrayBuffer(selectedFile);
  }, []);

  const toggleSelectAll = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns([...columns]);
    }
  };

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

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

  const handleReset = () => {
    setFile(null);
    setError(null);
    setSuccess(null);
    setIsLoading(false);
    setProgress(0);
  };

  const handleUpload = () => {
    if (!file) {
      setError("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("selectedColumns", JSON.stringify(selectedColumns));

    uploadMutation.mutate(formData);
  };

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
                    : "Arrastre y suelte un archivo de Instalaciones Excel aquí"}
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

        {/* Filtro y selección de columnas */}
        {file && columns.length > 0 && (
          <div className="border rounded-md p-4 bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">
                Selecciona las columnas a incluir:
              </h3>
              <Button size="sm" variant="outline" onClick={toggleSelectAll}>
                {selectedColumns.length === columns.length ? (
                  <>
                    <CheckSquare className="h-4 w-4" /> Deseleccionar todas
                  </>
                ) : (
                  <>
                    <Square className="h-4 w-4" /> Seleccionar todas
                  </>
                )}
              </Button>
            </div>

            <Input
              placeholder="Buscar columna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {columns
                .filter((col) =>
                  col.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((col) => (
                  <label key={col} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedColumns.includes(col)}
                      onCheckedChange={() => handleColumnSelection(col)}
                    />
                    <span>{col}</span>
                  </label>
                ))}
            </div>
          </div>
        )}

        {/* Botón de subida */}
        {file && (
          <Button
            onClick={handleUpload}
            disabled={uploadMutation.isPending}
            className="w-full flex items-center justify-center"
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>Subir {selectedColumns.length} columnas seleccionadas</>
            )}
          </Button>
        )}

        {/* Tabla de archivos cargados */}
        {uploadedFiles?.success && uploadedFiles.files.length > 0 ? (
          <HistorialArchivos<Instalacion>
            files={uploadedFiles.files}
            fileType="Instalaciones"
            columns={columnas}
            fetchDetails={fetchInstallation}
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

export default InstalacionesPage;