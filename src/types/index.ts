export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  date: string;
  pdf?: string;
  category: string;
  views: number;
  content: string;
}

export interface ServiceFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
}

export interface TrackingStatus {
  id: string;
  title: string;
  date: string;
  location?: string;
  status: "completed" | "current" | "pending";
}
