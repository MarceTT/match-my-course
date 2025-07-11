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
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useUploadFile } from "@/app/hooks/useUploadFile";

const SeoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { mutate: uploadMutation, isPending } = useUploadFile(
    "/excel/upload-seo-data",
    "SEO-Curso",
    () => {
      setFile(null);
      setSelectedColumns([]);
      setSuccess("Archivo SEO cargado correctamente.");
    }
  );

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setSuccess(null);

    const selectedFile = acceptedFiles[0];

    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      setError("Formato inválido. Solo se aceptan archivos .xlsx o .xls");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("El archivo es demasiado grande (máximo 10MB)");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const columnHeaders = jsonData[0] as string[];
      const normalized = columnHeaders.map((col: string) =>
        col.trim().replace(/\s+/g, "_").toLowerCase()
      );

      setColumns(normalized);
      setSelectedColumns(normalized);
    };

    reader.readAsArrayBuffer(selectedFile);
  }, []);

  const handleUpload = () => {
    if (!file) {
      setError("Debe seleccionar un archivo para cargar.");
      return;
    }

    uploadMutation({ file, selectedColumns });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  });

  return (
    <div className="p-4 space-y-6">
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
          <AlertDescription className="text-green-600">{success}</AlertDescription>
        </Alert>
      )}

      {!file && (
        <Card
          className={`border-2 border-dashed p-6 ${
            isDragActive ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
        >
          <div {...getRootProps()} className="text-center cursor-pointer space-y-4 py-10">
            <input {...getInputProps()} />
            <Upload className="h-6 w-6 mx-auto text-primary" />
            <p className="text-lg font-medium">
              {isDragActive ? "Suelte el archivo aquí" : "Arrastre un archivo SEO Excel aquí"}
            </p>
            <p className="text-sm text-muted-foreground">
              Formatos soportados: .xlsx, .xls (máximo 10MB)
            </p>
          </div>
        </Card>
      )}

      {file && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <Button
            onClick={handleUpload}
            disabled={isPending}
            className="w-full flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>Subir archivo SEO</>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SeoUpload;
