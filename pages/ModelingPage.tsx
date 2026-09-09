
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { trainModel, getPrediction } from '../services/api';
import { ModelMetrics, ConfusionMatrix, FeatureImportance, PredictionResult } from '../types';

const ConfusionMatrixDisplay: React.FC<{ matrix: ConfusionMatrix }> = ({ matrix }) => (
    <div className="flex flex-col items-center text-sm">
        <div className="flex">
            <div className="w-20"></div>
            {matrix.labels.map(label => <div key={label} className="w-20 font-bold text-center">Predicted {label}</div>)}
        </div>
        {matrix.values.map((row, i) => (
            <div key={i} className="flex items-center">
                <div className="w-20 font-bold text-right pr-2">Actual {matrix.labels[i]}</div>
                {row.map((value, j) => (
                    <div key={j} className="w-20 h-20 m-1 rounded bg-blue-100 flex items-center justify-center text-lg font-semibold text-blue-800">{value}</div>
                ))}
            </div>
        ))}
    </div>
);

const ModelingPage: React.FC = () => {
    const [metrics, setMetrics] = useState<ModelMetrics | null>(null);
    const [confusionMatrix, setConfusionMatrix] = useState<ConfusionMatrix | null>(null);
    const [featureImportances, setFeatureImportances] = useState<FeatureImportance[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [prediction, setPrediction] = useState<PredictionResult | null>(null);
    const [isPredicting, setIsPredicting] = useState(false);
    const [predictError, setPredictError] = useState<string | null>(null);

    const handleTrainModel = async () => {
        setIsLoading(true);
        const results = await trainModel();
        setMetrics(results.metrics);
        setConfusionMatrix(results.confusion_matrix);
        setFeatureImportances(results.feature_importances);
        setIsLoading(false);
    };
    
    const handlePredict = async () => {
        if (!studentId) return;
        setIsPredicting(true);
        setPredictError(null);
        setPrediction(null);
        try {
            const result = await getPrediction(studentId);
            setPrediction(result);
        } catch (error) {
            setPredictError('Student ID not found.');
        } finally {
            setIsPredicting(false);
        }
    };

    return (
        <div className="space-y-6">
            <Card title="1. Train Random Forest Classifier">
                <p className="text-gray-600 mb-4">Click the button to train the model on a 70/30 split of the data. Features include clicks, credits, age, gender, and education level.</p>
                <Button onClick={handleTrainModel} isLoading={isLoading}>
                    Train Model
                </Button>
            </Card>

            {metrics && (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card><p className="text-sm text-gray-500">Accuracy</p><p className="text-2xl font-bold">{metrics.accuracy.toFixed(2)}</p></Card>
                    <Card><p className="text-sm text-gray-500">Precision</p><p className="text-2xl font-bold">{metrics.precision.toFixed(2)}</p></Card>
                    <Card><p className="text-sm text-gray-500">Recall</p><p className="text-2xl font-bold">{metrics.recall.toFixed(2)}</p></Card>
                    <Card><p className="text-sm text-gray-500">F1-Score</p><p className="text-2xl font-bold">{metrics.f1_score.toFixed(2)}</p></Card>
                 </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {confusionMatrix && (
                    <Card title="Confusion Matrix">
                        <ConfusionMatrixDisplay matrix={confusionMatrix} />
                    </Card>
                )}
                {featureImportances.length > 0 && (
                    <Card title="Top 10 Feature Importances">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={featureImportances} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis dataKey="feature" type="category" width={150} fontSize={12} />
                                <Tooltip />
                                <Bar dataKey="importance" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                )}
            </div>

            <Card title="2. Predict for a Student">
                <div className="flex items-end space-x-4">
                    <div className="flex-grow">
                        <Input 
                            label="Student ID"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="e.g., 28400"
                        />
                    </div>
                    <Button onClick={handlePredict} isLoading={isPredicting}>Predict</Button>
                </div>
                {prediction && (
                    <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded-md">
                        <p>Prediction for Student <strong>{prediction.id_student}</strong>: <span className="font-bold text-green-800">{prediction.predicted_class}</span></p>
                    </div>
                )}
                {predictError && (
                    <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-md">
                        <p className="font-bold text-red-800">{predictError}</p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ModelingPage;
