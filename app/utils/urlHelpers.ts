export function buildFilterQuery(filters: Record<string, any>) {
    const params = new URLSearchParams();
  
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (v) params.append(key, v);
        });
      } else if (value !== undefined && value !== null && value !== "") {
        params.set(key, value);
      }
    });
  
    return params.toString();
  }
  