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
import { fetchDescriptionDetails, fetchUploadedFiles, uploadExcelDetalleEscuela } from "../../actions/excel";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import HistorialArchivos from "../../components/historial-files-table";
import { useUploadFile } from "@/app/hooks/useUploadFile";


interface DescriptionItem {
  _id: string;
  schoolId: string;
  nombreEscuela: string;
  ciudadEscuela: string;
  calificacion: number;
  añoFundacion: number;
  minutosAlCentro: number;
  detalleEscuela: string;
  tipoEscuela: string;
  descripcion: string;
  direccionEscuela: string;
  tipoEdificio: string;
  institucionVinculada: string;
  cursosInglesSemanas: number;
  cursoInglesEstudioTrabajo: number;
  representacion: number;
}



interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

const DescriptionPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);

  const {
    data: uploadedFiles,
    error: queryError,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["uploadedFiles", "Detalle-Escuelas"],
    queryFn: () => fetchUploadedFiles("Detalle-Escuelas"),
  });


  const columnas: ColumnDefinition<DescriptionItem>[] = [
    { key: "schoolId", header: "schoolId" },
    { key: "nombreEscuela", header: "nombreEscuela" },
    { key: "ciudadEscuela", header: "ciudadEscuela" },
    { key: "calificacion", header: "calificacion" },
    { key: "añoFundacion", header: "añoFundacion" },
    { key: "minutosAlCentro", header: "minutosAlCentro" },
    { key: "detalleEscuela", header: "detalleEscuela" },
    { key: "tipoEscuela", header: "tipoEscuela" },
    { key: "descripcion", header: "descripcion" },
    { key: "direccionEscuela", header: "direccionEscuela" },
    { key: "tipoEdificio", header: "tipoEdificio" },
    { key: "institucionVinculada", header: "institucionVinculada" },
    { key: "cursosInglesSemanas", header: "cursosInglesSemanas" },
    { key: "cursoInglesEstudioTrabajo", header: "cursoInglesEstudioTrabajo" },
    { key: "representacion", header: "representacion" },
  ];

  const uploadMutation = useUploadFile(
    "/excel/upload-escuela-detalle", // endpoint
    "Descripción", // label para toast
    () => {
      // acción al éxito: reset states, etc.
      setFile(null);
      setSelectedColumns([]);
    }
  )

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length === 0) return;

    const selectedFile = acceptedFiles[0];
    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError("Por favor seleccione un archivo Excel válido (.xlsx o .xls)");
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

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const toggleSelectAll = () => {
    if (selectedColumns.length === columns.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns([...columns]);
    }
  };


  const handleUpload = () => {
    if (!file) {
      setError("No se ha seleccionado ningún archivo.");
      return;
    }

    uploadMutation.mutate({
      file,
      selectedColumns,
    });
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
  
  return (
    <div className="p-4">
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <button
            onClick={() => setError(null)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      {uploadMutation.isSuccess && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Éxito</AlertTitle>
          <AlertDescription className="text-green-600">
            Se insertaron correctamente los datos.
          </AlertDescription>
          <button
            onClick={() => !uploadMutation.isSuccess}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      {/* 📌 Zona de carga de archivo */}
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
            <Upload className="h-6 w-6 text-primary" />
            <p className="text-lg font-medium">
              {isDragActive
                ? "Suelte el archivo aquí"
                : "Arrastre y suelte un archivo de Descripcion Escuela Excel aquí"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              o haga clic para seleccionar un archivo
            </p>
          </div>
        </Card>
      )}

      {/* 📌 Archivo seleccionado */}
      {file && (
        <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md">
          <FileSpreadsheet className="h-5 w-5 text-green-600" />
          <span className="font-medium">{file.name}</span>
          <Button size="icon" variant="ghost"onClick={handleReset}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* 📌 Filtro y selección de columnas */}
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

      {/* 📌 Tabla de archivos cargados */}
      {uploadedFiles?.success && uploadedFiles.files.length > 0 ? (
        <HistorialArchivos<DescriptionItem>
          files={uploadedFiles.files}
          fileType="Detalle-Accommodation"
          columns={columnas}
          fetchDetails={fetchDescriptionDetails} // Usar la función adaptadora
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

export default DescriptionPage;
