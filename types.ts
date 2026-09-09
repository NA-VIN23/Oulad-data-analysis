
export interface SummaryStats {
  total_rows: number;
  missing_values: Record<string, number>;
  numeric_descriptive: Record<string, {
    mean: number;
    std: number;
    min: number;
    '25%': number;
    '50%': number;
    '75%': number;
    max: number;
  }>;
  categorical_counts: Record<string, Record<string, number>>;
}

export interface AgeBandCount {
  age_band: string;
  count: number;
}

export interface ClicksByEducation {
  highest_education: string;
  average_total_clicks: number;
}

export interface ScatterPoint {
  total_clicks: number;
  avg_score: number;
}

export interface CorrelationMatrix {
  columns: string[];
  data: number[][];
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
}

export interface ConfusionMatrix {
  labels: string[];
  values: number[][];
}

export interface FeatureImportance {
  feature: string;
  importance: number;
}

export interface PredictionResult {
  id_student: number;
  predicted_class: string;
}

export interface ClusterInfo {
  cluster_sizes: Record<string, number>;
  centroids: Record<string, Record<string, number>>;
  labels: Record<string, number>;
}

export interface PCACoordinate {
  pc1: number;
  pc2: number;
  cluster: number;
  id_student: string;
}

export interface Recommendation {
  id_student: number;
  recommendation: string;
  predicted_class: string;
  cluster_label: number;
}
