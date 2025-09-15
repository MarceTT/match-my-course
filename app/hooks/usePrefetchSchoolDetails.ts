import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useRef } from "react";
import { fetchSchoolById } from "./useSchoolDetails";

export const usePrefetchSchoolDetails = () => {
  const queryClient = useQueryClient();
  const throttleRef = useRef<Set<string>>(new Set());

  return useCallback((id: string) => {
    // Evitar prefetch duplicados en corto período
    if (throttleRef.current.has(id)) return;
    
    // Verificar si ya tenemos datos recientes en cache
    const existingData = queryClient.getQueryData(["school", id]);
    const queryState = queryClient.getQueryState(["school", id]);
    
    // Solo prefetch si no tenemos datos o están muy desactualizados
    const isDataStale = !queryState || 
      (queryState.dataUpdatedAt && Date.now() - queryState.dataUpdatedAt > 1000 * 60 * 30);
    
    if (!existingData || isDataStale) {
      throttleRef.current.add(id);
      
      queryClient.prefetchQuery({
        queryKey: ["school", id],
        queryFn: () => fetchSchoolById(id),
        staleTime: 1000 * 60 * 45, // 45 minutos
      });
      
      // Limpiar throttle después de 2 segundos
      setTimeout(() => {
        throttleRef.current.delete(id);
      }, 2000);
    }
  }, [queryClient]);
};
