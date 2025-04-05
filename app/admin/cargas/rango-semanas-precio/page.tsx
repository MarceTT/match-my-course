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
import {
  fetchUploadedFiles,
  fetchWeekRangeDetails,
  uploadWeekRange,
} from "../../actions/excel";
import { toast } from "sonner";
import HistorialArchivos from "../../components/historial-files-table";

interface WeekRange {
  schoolId: string;
  NombreEnADMIN: string;
  Ciudad: string;
  NombreDelCurso: string;
  DetallesDelCurso: string;
  InicioDeClases: string;
  RequisitoDeIngreso: string;
  HORARIO: string;
  HorarioEspecifico: string;
  HorasDeClase: number;
  Matricula: number;
  Materiales: string;
  HorasDeClaseIndividual: string;
  Lessons: number;
  MinutosPorLesson: number;
  RangoDeSemanas1: number;
  RangoDeSemanas2: number;
  Precio: number;
}

interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

const RangoSemanasPrecio = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<WeekRange[]>([]);

  const {
    data: uploadedFiles,
    error: queryError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["uploadedFiles", "Rango-Semanas"],
    queryFn: () => fetchUploadedFiles("Rango-Semanas"),
  });

  const columnas: ColumnDefinition<WeekRange>[] = [
    { key: "NombreEnADMIN", header: "Escuela" },
    { key: "Ciudad", header: "Ciudad" },
    { key: "NombreDelCurso", header: "Curso" },
    { key: "DetallesDelCurso", header: "Descripción" },
    { key: "InicioDeClases", header: "Inicio" },
    { key: "RequisitoDeIngreso", header: "Requisito" },
    { key: "HORARIO", header: "Horario" },
    { key: "HorasDeClase", header: "Horas Clase" },
    { key: "Matricula", header: "Matrícula" },
    { key: "Precio", header: "Precio" },
  ];

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
      uploadWeekRange(formData, selectedColumns),
    onSuccess: () => {
      toast.success("Se insertaron los registros correctamente.");
      setFile(null);
      setSelectedColumns([]);
      setColumns([]);
      setPreviewData([]);
    },
    onError: (error: any) => {
      setError(error.message || "Error al procesar los datos en el servidor");
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setSuccess(null);

    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];

    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError("Por favor seleccione un archivo Excel válido (.xlsx o .xls)");
      return;
    }

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

      const uniqueColumns: string[] = [];
      const columnCount: Record<string, number> = {};

      columnNames.forEach((col) => {
        let cleanCol = col.trim().replace(/\s+/g, "_");
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

      // Crear datos de vista previa
      const preview = jsonData.slice(1, 6).map((row) => {
        const item: any = {};
        uniqueColumns.forEach((header, i) => {
          item[header] = row[i];
        });
        return item as WeekRange;
      });
      setPreviewData(preview);
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
    setPreviewData([]);
  };

  const handleUpload = () => {
    if (!file) {
      setError("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("selectedColumns", JSON.stringify(selectedColumns));
    console.log([...formData.entries()]);
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

        {previewData.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Vista previa (primeras 5 filas)</h3>
            <div className="border rounded-md overflow-auto max-h-60">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    {columns.slice(0, 5).map((col) => (
                      <th
                        key={col}
                        className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {previewData.map((row, i) => (
                    <tr key={i}>
                      {columns.slice(0, 5).map((col) => (
                        <td
                          key={col}
                          className="px-4 py-2 text-sm text-gray-500"
                        >
                          {row[col as keyof WeekRange]?.toString().substring(0, 30) || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

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

        {uploadedFiles?.success && uploadedFiles.files.length > 0 ? (
          <HistorialArchivos<WeekRange>
            files={uploadedFiles.files}
            fileType="Rango-Semanas"
            columns={columnas}
            fetchDetails={fetchWeekRangeDetails}
          />
        ) : (
          <Alert
            variant="default"
            className="bg-blue-50 border-blue-300 text-center"
          >
            <TriangleAlert className="h-4 w-4 text-blue-500 text-center justify-center" />
            <AlertTitle className="text-blue-700">Atención</AlertTitle>
            <AlertDescription className="text-blue-600">
              No hay archivos cargados
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default RangoSemanasPrecio;