"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  AlertCircle,
  Upload,
  FileSpreadsheet,
  X,
  Square,
  CheckSquare,
  Loader2,
  TriangleAlert,
  CheckCircle2, 
  XCircle, 
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCalidadDetails, fetchUploadedFiles, uploadExcelCalidad } from "../../actions/excel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import HistorialArchivos from "../../components/historial-files-table"; // Importa el componente reutilizable

interface QualityItem {
  _id: string;
  schoolId: string;
  schoolName: string;
  city: string;
  certifications: {
    ILEP: boolean;
    ACELS: boolean;
    QualityEnglish: boolean;
    EEI: boolean;
    SelectIreland: boolean;
    Eaquals: boolean;
    IALC: boolean;
  };
  accreditations: {
    ILEP: string;
    QualityEnglish: string;
    EEI: string;
    SelectIreland: string;
    Eaquals: string;
    IALC: string;
    ACELS: string;
  };
  trayectoria: number;
  __v: number;
}

interface ColumnDefinition<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

const CalidadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [success, setSuccess] = useState<string | null>(null);

  const cleanHeader = (header: string) => {
    return header
      .toString()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, "")  // Saca simbolos raros
      .replace(/\s+/g, "_")               // Espacios por underscore
      .replace(/__+/g, "_")               // Saca dobles underscores
      .toLowerCase();
  };

  const {
    data: uploadedFiles,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["uploadedFiles", "Calidad"],
    queryFn: () => fetchUploadedFiles("Calidad"),
  });



  // Define las columnas para la tabla de detalles
  const columnas: ColumnDefinition<QualityItem>[] = [
    { key: "schoolName", header: "Escuela" },
    { key: "city", header: "Ciudad" },
    {
      key: "certifications",
      header: "Certificaciones",
      render: (value) => {
        if (typeof value === "object" && value !== null) {
          return (
            <div className="space-y-2">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="font-medium">{key}:</span>
                  {val !== null && val !== undefined ? (
                    val ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )
                  ) : (
                    <HelpCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className="flex items-center space-x-2">
            <span className="font-medium">N/A</span>
            <HelpCircle className="h-4 w-4 text-yellow-500" />
          </div>
        );
      },
    },
    {
      key: "accreditations",
      header: "Acreditaciones",
      render: (value) => {
        if (typeof value === "object" && value !== null) {
          return (
            <div className="space-y-2">
              {Object.entries(value).map(([key, val]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="font-medium">{key}:</span>
                  {val !== null && val !== undefined ? (
                    typeof val === "boolean" ? (
                      val ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )
                    ) : (
                      <span>{String(val)}</span>
                    )
                  ) : (
                    <HelpCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              ))}
            </div>
          );
        }
        return (
          <div className="flex items-center space-x-2">
            <span className="font-medium">N/A</span>
            <HelpCircle className="h-4 w-4 text-yellow-500" />
          </div>
        );
      },
    },
    { key: "trayectoria", header: "Trayectoria (años)" },
  ];

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) =>
      uploadExcelCalidad(formData, selectedColumns),
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

  const onDrop = useCallback((acceptedFiles: File[]) => {
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
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames.find(name => 
        name.toLowerCase().includes("calidad")) || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
      if (!jsonData || jsonData.length === 0) {
        setError("El archivo Excel está vacío o mal formateado.");
        return;
      }

      const uniqueColumns: string[] = jsonData[0].map((col: any) => col?.toString().trim());
      setColumns(uniqueColumns);
      setSelectedColumns(uniqueColumns);
    };
    reader.readAsArrayBuffer(selectedFile);
  }, []);

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prev) => 
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]
    );
  };

  const toggleSelectAll = () => {
    setSelectedColumns(selectedColumns.length === columns.length ? [] : [...columns]);
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
                  : "Arrastre y suelte un archivo de Calidad Excel aquí"}
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
          <HistorialArchivos<QualityItem>
            files={uploadedFiles.files}
            fileType="Calidad"
            columns={columnas}
            fetchDetails={fetchCalidadDetails} // Usar la función adaptadora
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

export default CalidadPage;