"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { fetchFileDetails } from "../../actions/excel";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Database, Eye, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

interface FileItem {
  _id: string;
  filename: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
}

interface AccommodationItem {
    _id: string;
    schoolName: string;
    city: string;
    alojamiento: string;
    semanas: string;
    habitacion: string;
    valorSemanal: string;
  }

interface HistorialArchivosProps {
  files: FileItem[];
}

const HistorialArchivos = ({ files }: HistorialArchivosProps) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: fileDetails, isLoading, error } = useQuery({
    queryKey: ["fileDetails"],
    queryFn: fetchFileDetails, // No necesita recibir parámetros
    enabled: isDialogOpen, // Solo ejecuta la consulta cuando el modal está abierto
  });

  const handleViewDetails = () => {
    setIsDialogOpen(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "Alojamiento":
        return <Database className="h-5 w-5 text-blue-500" />;
      case "Certificaciones":
        return <Database className="h-5 w-5 text-green-500" />;
      default:
        return <Database className="h-5 w-5 text-gray-400" />;
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg border shadow-sm dark:bg-muted">
        <div className="p-4 border-b dark:border-muted">
          <h3 className="font-medium">📂 Archivos subidos ({files.length})</h3>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y dark:divide-muted">
            {files.map((file) => (
              <div
                key={file._id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 dark:hover:bg-muted/20"
              >
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.fileType)}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{file.filename}</p>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Procesado
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {format(new Date(file.uploadedAt), "dd MMM yyyy", {
                          locale: es,
                        })}
                      </span>
                      <span>{formatFileSize(file.fileSize)}</span>
                      <span className="flex items-center">
                        <Database className="h-3.5 w-3.5 mr-1" />
                        Tipo: {file.fileType}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2"
                  onClick={() => handleViewDetails()}>
                  <Eye className="h-4 w-4" />
                  Ver detalles
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Modal de Detalles */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>📊 Detalles de los Archivos Cargados</DialogTitle>
          </DialogHeader>

          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : error ? (
            <p className="text-red-500">Error al cargar los detalles.</p>
          ) : fileDetails && fileDetails.length > 0 ? (
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>🏫 Escuela</TableHead>
                    <TableHead>📍 Ciudad</TableHead>
                    <TableHead>🏡 Alojamiento</TableHead>
                    <TableHead>📆 Semanas</TableHead>
                    <TableHead>🛏️ Habitación</TableHead>
                    <TableHead>💰 Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fileDetails.map((detail: AccommodationItem) => (
                    <TableRow key={detail._id}>
                      <TableCell>{detail.schoolName}</TableCell>
                      <TableCell>{detail.city}</TableCell>
                      <TableCell>{detail.alojamiento}</TableCell>
                      <TableCell>{detail.semanas}</TableCell>
                      <TableCell>{detail.habitacion}</TableCell>
                      <TableCell>€{detail.valorSemanal}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <p className="text-center py-4">No se encontraron datos en la base de datos.</p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HistorialArchivos;
