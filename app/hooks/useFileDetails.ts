import { useQuery } from "@tanstack/react-query";

export const useFileDetails = <T,>(
  selectedFileId: string | null,
  fetchDetails: (fileId: string) => Promise<T[]>
) => {
  return useQuery({
    queryKey: ["fileDetails", selectedFileId],
    queryFn: () => fetchDetails(selectedFileId!),
    enabled: !!selectedFileId, // Solo ejecuta la consulta si hay un fileId seleccionado
  });
};