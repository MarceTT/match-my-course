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
import { useMutation, useQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import HistorialArchivos from "../../components/historial-files-table";
import { fetchUploadedFiles, fetchWeekPriceDetails, uploadWeekPrice } from "../../actions/excel";



interface WeekPrice {
  schoolId: string;
  Nombre_Escuela_Adm: string;
  Ciudad_Escuela: string;
  Nombre_del_curso: string;
  Detalles_del_curso: string;
  Inicio_de_clases: string;
  Requisito_de_ingreso: string;
  HORARIO: string;
  Horario_especifico: string;
  Horas_de_clase: number;
  Matricula: number;
  Materiales: string;
  Horas_de_clase_individual: string;
  Lessons: number;
  Minutos_por_lesson: number;
  Rango_de_semanas_1: number;
  Precio: number;
}

interface ColumnDefinition<T> {
  key: keyof T; // Asegura que `key` sea una clave válida de `T`
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

const SemanasPrecio = () => {
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
    queryKey: ["uploadedFiles", "Precio-Semanas"],
    queryFn: () => fetchUploadedFiles("Precio-Semanas"),
  });

  const columnas: ColumnDefinition<WeekPrice>[] = [
    { key: "Nombre_Escuela_Adm", header: "Escuela" },
    { key: "Ciudad_Escuela", header: "Ciudad" },
    { key: "Nombre_del_curso", header: "Curso" },
    { key: "Detalles_del_curso", header: "Descripción" },
    { key: "Inicio_de_clases", header: "Inicio" },
    { key: "Requisito_de_ingreso", header: "Requisito" },
    { key: "HORARIO", header: "Horario" },
    { key: "Horas_de_clase", header: "Horas Clase" },
    { key: "Matricula", header: "Matrícula" },
    { key: "Rango_de_semanas_1", header: "Semanas" },
    { key: "Precio", header: "Precio" },
  ];


  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
        uploadWeekPrice(formData, selectedColumns),
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
          Ocurrió un error al cargar los archivos. Por favor, intenta
          nuevamente.
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
                  : "Arrastre y suelte un archivo de Precios Excel aquí"}
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
        <HistorialArchivos<WeekPrice>
          files={uploadedFiles.files}
          fileType="RangoSemanasPrecio"
          columns={columnas}
          fetchDetails={fetchWeekPriceDetails}
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

export default SemanasPrecio;
