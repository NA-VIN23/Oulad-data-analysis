
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { getRecommendation } from '../services/api';
import { Recommendation } from '../types';
import { DownloadIcon } from '../components/icons';

const RecommendationsPage: React.FC = () => {
    const [studentId, setStudentId] = useState('');
    const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFetchRecommendation = async () => {
        if (!studentId) return;
        setIsLoading(true);
        setError(null);
        setRecommendation(null);
        try {
            const result = await getRecommendation(studentId);
            setRecommendation(result);
        } catch (err) {
            setError('Failed to fetch recommendation. Student might not exist.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleExport = () => {
      // In a real app, this would be a link to /api/recommend/export
      alert("This would trigger a CSV download of all student recommendations.");
    };

    return (
        <div className="space-y-6">
            <Card title="1. Get Recommendation for a Student">
                <div className="flex items-end space-x-4">
                    <div className="flex-grow">
                        <Input
                            label="Student ID"
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            placeholder="Enter a student ID..."
                        />
                    </div>
                    <Button onClick={handleFetchRecommendation} isLoading={isLoading}>
                        Get Recommendation
                    </Button>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                
                {recommendation && (
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="text-lg font-bold text-blue-800">Recommendation for Student {recommendation.id_student}</h3>
                        <p className="mt-2 text-blue-900">{recommendation.recommendation}</p>
                        <div className="mt-4 flex space-x-4 text-sm">
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Predicted Class: <strong>{recommendation.predicted_class}</strong></span>
                            <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded-full">Cluster: <strong>{recommendation.cluster_label}</strong></span>
                        </div>
                    </div>
                )}
            </Card>

            <Card title="2. Export All Recommendations">
                <p className="text-gray-600 mb-4">Generate and download a CSV file containing recommendations for all students in the dataset.</p>
                <Button onClick={handleExport} variant="secondary" icon={<DownloadIcon />}>
                    Export All as CSV
                </Button>
            </Card>
        </div>
    );
};

export default RecommendationsPage;
