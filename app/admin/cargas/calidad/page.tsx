"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import {
  AlertCircle, Upload, FileSpreadsheet, X, Square, CheckSquare,
  Loader2, TriangleAlert, CheckCircle2, XCircle, HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { fetchCalidadDetails, fetchUploadedFiles } from "../../actions/excel";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import HistorialArchivos from "../../components/historial-files-table";
import { useUploadCalidad } from "@/app/hooks/useUploadCalidad"; // ✅ nuevo hook axios
import { useUploadFile } from "@/app/hooks/useUploadFile";

const CalidadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const {
    data: uploadedFiles,
    isLoading: queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["uploadedFiles", "Calidad"],
    queryFn: () => fetchUploadedFiles("Calidad"),
  });

  const uploadMutation = useUploadFile(
    "/excel/upload-calidad",
    "Calidad",
    () => {
      setFile(null);
      setSelectedColumns([]);
    }
  );

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
      const sheetName = workbook.SheetNames.find(name => name.toLowerCase().includes("calidad")) || workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
      jsonData = jsonData.filter((row) => row.some((cell: any) => cell !== undefined && cell !== null && cell !== ""));
      const columns: string[] = jsonData[0].map((col: any) => col?.toString()?.trim()?.toLowerCase()?.replace(/\s+/g, '_') || '');

      setColumns(columns);
      setSelectedColumns(columns);
    };

    reader.readAsArrayBuffer(selectedFile);
  }, []);

  const handleUpload = () => {
    if (!file) return setError("No se ha seleccionado ningún archivo.");

    uploadMutation.mutate({ file, selectedColumns });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  });

  const handleColumnSelection = (column: string) => {
    setSelectedColumns((prev) => prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column]);
  };

  const toggleSelectAll = () => {
    setSelectedColumns(selectedColumns.length === columns.length ? [] : [...columns]);
  };

  const handleReset = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="p-4 space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadMutation.isSuccess && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Éxito</AlertTitle>
          <AlertDescription className="text-green-600">
            Se insertaron correctamente los datos.
          </AlertDescription>
        </Alert>
      )}

      {!file && (
        <Card className={`border-2 border-dashed p-6 ${isDragActive ? "border-primary bg-primary/5" : "border-gray-300"}`}>
          <div {...getRootProps()} className="flex flex-col items-center justify-center space-y-4 py-10 cursor-pointer">
            <input {...getInputProps()} />
            <Upload className="h-6 w-6 text-primary" />
            <p className="text-lg font-medium">
              {isDragActive ? "Suelte el archivo aquí" : "Arrastre y suelte un archivo de Calidad Excel aquí"}
            </p>
          </div>
        </Card>
      )}

      {file && (
        <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md">
          <FileSpreadsheet className="h-5 w-5 text-green-600" />
          <span className="font-medium">{file.name}</span>
          <Button size="icon" variant="ghost" onClick={handleReset}><X className="h-4 w-4" /></Button>
        </div>
      )}

      {file && columns.length > 0 && (
        <div className="border rounded-md p-4 bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Selecciona las columnas a incluir:</h3>
            <Button size="sm" variant="outline" onClick={toggleSelectAll}>
              {selectedColumns.length === columns.length ? <><CheckSquare className="h-4 w-4" /> Deseleccionar todas</> : <><Square className="h-4 w-4" /> Seleccionar todas</>}
            </Button>
          </div>

          <Input placeholder="Buscar columna..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="mb-3" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {columns.filter((col) => col.toLowerCase().includes(searchTerm.toLowerCase())).map((col) => (
              <label key={col} className="flex items-center space-x-2">
                <Checkbox checked={selectedColumns.includes(col)} onCheckedChange={() => handleColumnSelection(col)} />
                <span>{col}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {file && (
        <Button onClick={handleUpload} disabled={uploadMutation.isPending} className="w-full">
          {uploadMutation.isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subiendo...</> : <>Subir {selectedColumns.length} columnas seleccionadas</>}
        </Button>
      )}

      {uploadedFiles?.success && uploadedFiles.files.length > 0 ? (
        <HistorialArchivos files={uploadedFiles.files} fileType="Calidad" columns={[]} fetchDetails={fetchCalidadDetails} />
      ) : (
        <Alert variant="default" className="bg-blue-50 border-blue-300 text-center">
          <TriangleAlert className="h-4 w-4 text-blue-500" />
          <AlertTitle className="text-blue-700">Atención</AlertTitle>
          <AlertDescription className="text-blue-600">No hay archivos cargados</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CalidadPage;
