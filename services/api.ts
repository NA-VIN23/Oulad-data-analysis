
import {
  SummaryStats,
  AgeBandCount,
  ClicksByEducation,
  ScatterPoint,
  CorrelationMatrix,
  ModelMetrics,
  ConfusionMatrix,
  FeatureImportance,
  PredictionResult,
  ClusterInfo,
  PCACoordinate,
  Recommendation,
} from '../types';

// This is a mock API. In a real application, you would use `fetch` to call your backend endpoints.
// The `wait` function simulates network latency.
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadFiles = async (files: { [key: string]: File }): Promise<{ sample: any[], summary: SummaryStats }> => {
  console.log('Uploading files:', files);
  await wait(1500);
  // In a real app:
  // const formData = new FormData();
  // Object.entries(files).forEach(([name, file]) => formData.append(name, file));
  // const response = await fetch('/api/clean_merge', { method: 'POST', body: formData });
  // return await response.json();
  return { sample: MOCK_MERGED_SAMPLE, summary: MOCK_SUMMARY_STATS };
};

export const fetchOulad = async (): Promise<{ sample: any[], summary: SummaryStats }> => {
  console.log('Fetching OULAD from KaggleHub...');
  await wait(2000);
  return { sample: MOCK_MERGED_SAMPLE, summary: MOCK_SUMMARY_STATS };
};

export const getAgeBandCounts = async (): Promise<AgeBandCount[]> => {
  await wait(500);
  return [
    { age_band: '0-35', count: 15000 },
    { age_band: '35-55', count: 5000 },
    { age_band: '55<=', count: 1000 },
  ];
};

export const getClicksByEducation = async (): Promise<ClicksByEducation[]> => {
  await wait(500);
  return [
    { highest_education: 'No Formal quals', average_total_clicks: 1200 },
    { highest_education: 'Lower Than A Level', average_total_clicks: 1800 },
    { highest_education: 'A Level or Equivalent', average_total_clicks: 2200 },
    { highest_education: 'HE Qualification', average_total_clicks: 2500 },
    { highest_education: 'Post Graduate Qualification', average_total_clicks: 2800 },
  ];
};

export const getScatterData = async (): Promise<ScatterPoint[]> => {
  await wait(500);
  return Array.from({ length: 200 }, () => ({
    total_clicks: Math.random() * 8000,
    avg_score: Math.random() * 100,
  }));
};

export const getCorrelationMatrix = async (): Promise<CorrelationMatrix> => {
  await wait(500);
  return {
    columns: ['total_clicks', 'avg_score', 'studied_credits'],
    data: [
      [1.00, 0.35, 0.21],
      [0.35, 1.00, 0.45],
      [0.21, 0.45, 1.00],
    ],
  };
};

export const trainModel = async (): Promise<{ metrics: ModelMetrics; confusion_matrix: ConfusionMatrix; feature_importances: FeatureImportance[] }> => {
  await wait(3000);
  return {
    metrics: { accuracy: 0.88, precision: 0.85, recall: 0.90, f1_score: 0.87 },
    confusion_matrix: { labels: ['Pass', 'Fail'], values: [[850, 50], [70, 30]] },
    feature_importances: [
      { feature: 'total_clicks', importance: 0.45 },
      { feature: 'studied_credits', importance: 0.25 },
      { feature: 'avg_score', importance: 0.15 },
      { feature: 'age_band_0-35', importance: 0.05 },
      { feature: 'gender_M', importance: 0.03 },
      { feature: 'highest_education_HE', importance: 0.02 },
      { feature: 'age_band_35-55', importance: 0.02 },
      { feature: 'gender_F', importance: 0.01 },
      { feature: 'highest_education_A_Level', importance: 0.01 },
      { feature: 'highest_education_Lower', importance: 0.01 },
    ],
  };
};

export const getPrediction = async (studentId: string): Promise<PredictionResult> => {
  await wait(700);
  if (studentId === 'not_found') {
    throw new Error('Student not found');
  }
  return { id_student: parseInt(studentId), predicted_class: Math.random() > 0.3 ? 'Pass' : 'Fail' };
};

export const runClustering = async (k: number): Promise<ClusterInfo> => {
  await wait(2500);
  return {
    cluster_sizes: { '0': 8000, '1': 10000, '2': 3000 },
    centroids: {
      '0': { total_clicks: 1000, avg_score: 50, studied_credits: 60 },
      '1': { total_clicks: 3000, avg_score: 80, studied_credits: 90 },
      '2': { total_clicks: 500, avg_score: 30, studied_credits: 30 },
    },
    labels: {}, // Not sending all labels for brevity
  };
};

export const getPCAData = async (): Promise<PCACoordinate[]> => {
  await wait(1000);
  return Array.from({ length: 300 }, (_, i) => {
    const cluster = Math.floor(Math.random() * 3);
    return {
      pc1: Math.random() * 20 - 10 + (cluster * 8),
      pc2: Math.random() * 20 - 10 + (cluster * (i % 2 === 0 ? 5 : -5)),
      cluster,
      id_student: `student_${i}`
    };
  });
};

export const getRecommendation = async (studentId: string): Promise<Recommendation> => {
    await wait(700);
    const score = Math.random() * 100;
    const clicks = Math.random() * 5000;

    let recommendation = "Consider advanced materials and enrichment activities.";
    if (score < 40) {
        recommendation = "Focus on remedial materials, complete practice quizzes, and set up study reminders.";
    } else if (clicks < 1000 && score < 60) {
        recommendation = "Increase engagement with course materials, participate in forum discussions.";
    }

    return {
        id_student: parseInt(studentId),
        recommendation,
        predicted_class: score > 50 ? 'Pass' : 'Fail',
        cluster_label: Math.floor(Math.random() * 3),
    };
};


// MOCK DATA
const MOCK_SUMMARY_STATS: SummaryStats = {
  total_rows: 21000,
  missing_values: { sum_click: 0, avg_score: 0 },
  numeric_descriptive: {
    total_clicks: { mean: 2058, std: 1500, min: 10, '25%': 800, '50%': 1800, '75%': 3000, max: 15000 },
    avg_score: { mean: 72.5, std: 15.2, min: 0, '25%': 65, '50%': 76, '75%': 85, max: 100 },
    studied_credits: { mean: 79, std: 40, min: 30, '25%': 60, '50%': 60, '75%': 120, max: 630 },
  },
  categorical_counts: {
    gender: { M: 12000, F: 9000 },
    highest_education: { 'A Level or Equivalent': 10000, 'HE Qualification': 8000, 'Lower Than A Level': 3000 },
    final_result: { Pass: 15000, Fail: 3000, Withdrawn: 3000 }
  }
};

const MOCK_MERGED_SAMPLE = Array.from({ length: 100 }, (_, i) => ({
  id_student: 10000 + i,
  gender: Math.random() > 0.5 ? 'M' : 'F',
  highest_education: ['A Level or Equivalent', 'HE Qualification', 'Lower Than A Level'][i % 3],
  age_band: ['0-35', '35-55'][i % 2],
  studied_credits: [30, 60, 90, 120][i % 4],
  total_clicks: Math.floor(Math.random() * 5000),
  avg_score: Math.round(Math.random() * 100),
  final_result: Math.random() > 0.3 ? 'Pass' : 'Fail',
}));
