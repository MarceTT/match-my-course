export interface PlacementResultListItem {
  _id: string;
  name: string;
  email: string;
  country: string;
  nationality: string;
  contactOptIn: boolean;
  score: number;
  level: string;
  createdAt: string;
}

export interface PlacementAnswer {
  questionId: string;
  answer: string;
  correct?: boolean;
}

export interface PlacementResultDetail extends PlacementResultListItem {
  answers: PlacementAnswer[];
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface PlacementResultsResponse {
  success: boolean;
  message: string;
  data: {
    results: PlacementResultListItem[];
    pagination: PaginationData;
  };
}

export interface PlacementResultResponse {
  success: boolean;
  message: string;
  data: {
    result: PlacementResultDetail;
  };
}

export interface DeletePlacementResultResponse {
  success: boolean;
  message: string;
}
