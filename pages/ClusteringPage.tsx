
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { runClustering, getPCAData } from '../services/api';
import { ClusterInfo, PCACoordinate } from '../types';

const CLUSTER_COLORS = ['#3b82f6', '#16a34a', '#ef4444', '#f97316', '#8b5cf6'];

const ClusteringPage: React.FC = () => {
    const [k, setK] = useState(3);
    const [clusterInfo, setClusterInfo] = useState<ClusterInfo | null>(null);
    const [pcaData, setPcaData] = useState<PCACoordinate[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRunClustering = async () => {
        setIsLoading(true);
        setClusterInfo(null);
        setPcaData(null);
        const [info, pca] = await Promise.all([runClustering(k), getPCAData()]);
        setClusterInfo(info);
        setPcaData(pca);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <Card title="1. Run K-Means Clustering">
                <p className="text-gray-600 mb-4">Standardize numeric features (total_clicks, avg_score, studied_credits) and run K-Means.</p>
                <div className="flex items-end space-x-4">
                    <div className="w-24">
                        <Input 
                            label="Clusters (k)"
                            type="number"
                            value={k}
                            onChange={(e) => setK(Math.max(2, parseInt(e.target.value) || 2))}
                            min="2"
                        />
                    </div>
                    <Button onClick={handleRunClustering} isLoading={isLoading}>
                        Run Clustering
                    </Button>
                </div>
            </Card>

            {isLoading && <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div></div>}

            {clusterInfo && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card title="Cluster Sizes">
                        <ul className="space-y-2">
                            {Object.entries(clusterInfo.cluster_sizes).map(([cluster, size]) => (
                                <li key={cluster} className="flex justify-between p-2 bg-gray-50 rounded">
                                    <span className="font-semibold">Cluster {cluster}</span>
                                    <span>{size.toLocaleString()} students</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                    <Card title="Cluster Centroids">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="p-2 text-left">Feature</th>
                                        {Object.keys(clusterInfo.centroids).map(c => <th key={c} className="p-2 text-center">Cluster {c}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(clusterInfo.centroids['0']).map(feature => (
                                        <tr key={feature} className="border-t">
                                            <td className="p-2 font-semibold capitalize">{feature.replace('_', ' ')}</td>
                                            {Object.keys(clusterInfo.centroids).map(clusterId => (
                                                <td key={clusterId} className="p-2 text-center">
                                                    {clusterInfo.centroids[clusterId][feature].toFixed(2)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            )}
            
            {pcaData && (
                <Card title="PCA Visualization of Clusters">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="pc1" name="Principal Component 1" />
                            <YAxis type="number" dataKey="pc2" name="Principal Component 2" />
                            <ZAxis range={[60]}/>
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            {Array.from({length:k}).map((_,i)=>(
                                <Scatter key={i} name={`Cluster ${i}`} data={pcaData.filter(p=>p.cluster === i)} fill={CLUSTER_COLORS[i % CLUSTER_COLORS.length]} />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </Card>
            )}
        </div>
    );
};

export default ClusteringPage;
