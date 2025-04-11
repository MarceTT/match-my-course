"use server";

import { refreshAccessToken } from "@/app/utils/requestServer";

export async function uploadExcelFile(formData: FormData) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-alojamiento`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });


  if (!response.ok) {
    // Capturar errores del servidor y retornar un mensaje
    const errorResponse = await response.json();
    throw new Error(errorResponse?.message || "Error uploading file");
  }

  // Obtener el status 200 y el contenido de la respuesta
  const result = await response.json();

  return {
    status: response.status, // Aquí retornamos el código de estado
    data: result, // La respuesta JSON del backend
  };
}

export async function uploadExcelDetalleAlojamiento(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-detalle-alojamiento`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });



  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadExcelCalidad(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  console.log([...data.entries()]);
  console.log(file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-calidad`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });



  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadExcelDetalleEscuela(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-escuela-detalle`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });



  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadExcelInstallation(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-installation`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });



  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadExcelNationality(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-nationality`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadExcelPrices(formData: FormData, selectedColumns: string[]) {
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-prices`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadWeekRange(formData: FormData, selectedColumns: string[]){
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  console.log([...formData.entries()]);
  console.log(file);

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-week-range`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    console.log(response.status);

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function uploadWeekPrice(formData: FormData, selectedColumns: string[]){
  const token = await refreshAccessToken();

  if (!token) {
    return { error: "No autorizado" }; // Si no hay cookie, devolver error
  }
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("selectedColumns", JSON.stringify(selectedColumns));

  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/excel/upload-week-price`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: data,
    credentials: "include",
  });

  const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("❌ Error: El servidor no devolvió JSON válido", text);
      throw new Error("El servidor respondió con un formato inesperado.");
    }

    if (!response.ok) {
      throw new Error(result?.message || "Error uploading file");
    }

    return {
      status: response.status, // Aquí retornamos el código de estado
      data: result, // La respuesta JSON del backend
    };
}

export async function fetchUploadedFiles(tipo: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/historial?tipo=${tipo}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener el historial de archivos");
    }

    const jsonResponse = await response.json();

    if (jsonResponse.data && jsonResponse.data.data) {
      return { success: true, files: jsonResponse.data.data };
    } else {
      return { success: false, error: "No se pudo cargar el historial de archivos" };
    }
  } catch (error) {
    console.error("Error fetching files:", error);
    return { success: false, error: "Error al conectar con el servidor" };
  }
}

export async function fetchFileDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/details/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    if (jsonResponse?.data?.accommodations?.length > 0) {
      return jsonResponse.data.accommodations;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchCalidadDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/quality-detail/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    if (jsonResponse?.data?.quality?.length > 0) {
      return jsonResponse.data.quality;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchFileAccommodationDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/accomodation-detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    console.log("respuesta desde accommodation detalle",jsonResponse);

    if (jsonResponse?.data?.length > 0) {
      return jsonResponse.data;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchDescriptionDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/school-description`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    if (jsonResponse?.data?.schoolDescription?.length > 0) {
      return jsonResponse.data.schoolDescription;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchInstallation () {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/installation-detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    if (jsonResponse?.data?.installation?.length > 0) {
      return jsonResponse.data.installation;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchNationality () {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/nationalities`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    console.log("respuesta desde nacionalidades detalle",jsonResponse);

    if (jsonResponse?.data?.nationalitiesDetail?.length > 0) {
      return jsonResponse.data.nationalitiesDetail;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchPriceDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/price-detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    console.log("respuesta desde precio detalle",jsonResponse);

    if (jsonResponse?.data?.priceDetail?.length > 0) {
      return jsonResponse.data.priceDetail;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchWeekRangeDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/get-week-range`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    console.log("respuesta desde rango de semanas detalle",jsonResponse);

    if (jsonResponse?.data?.weekRangeDetail?.length > 0) {
      return jsonResponse.data.weekRangeDetail;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}

export async function fetchWeekPriceDetails() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/get-week-price`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los detalles del archivo");
    }

    const jsonResponse = await response.json();

    console.log("respuesta desde rango de semanas detalle",jsonResponse);

    if (jsonResponse?.data?.weekPrice?.length > 0) {
      return jsonResponse.data.weekPrice;
    } else {
      return []; // Devolvemos un array vacío en lugar de lanzar un error
    }
  } catch (error) {
    console.error("Error fetching file details:", error);
    return [];
  }
}


