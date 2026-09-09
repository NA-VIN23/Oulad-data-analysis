
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import Card from '../components/ui/Card';
import { getAgeBandCounts, getClicksByEducation, getScatterData, getCorrelationMatrix } from '../services/api';
import { AgeBandCount, ClicksByEducation, ScatterPoint, CorrelationMatrix } from '../types';

const CorrelationHeatmap: React.FC<{ data: CorrelationMatrix }> = ({ data }) => {
    const getColor = (value: number) => {
        const alpha = Math.abs(value);
        if (value > 0) {
            return `rgba(37, 99, 235, ${alpha})`; // Blue for positive
        }
        return `rgba(220, 38, 38, ${alpha})`; // Red for negative
    };

    return (
        <div className="p-4">
            <div className="flex">
                <div className="w-24"></div>
                {data.columns.map((col) => (
                    <div key={col} className="flex-1 text-center font-bold text-xs transform -rotate-45">{col}</div>
                ))}
            </div>
            {data.data.map((row, i) => (
                <div key={i} className="flex items-center">
                    <div className="w-24 font-bold text-xs text-right pr-2">{data.columns[i]}</div>
                    {row.map((value, j) => (
                        <div key={j} className="flex-1 h-12 m-0.5 rounded flex items-center justify-center" style={{ backgroundColor: getColor(value) }}>
                            <span className="text-white font-semibold text-sm">{value.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const EDAPage: React.FC = () => {
  const [ageData, setAgeData] = useState<AgeBandCount[]>([]);
  const [eduData, setEduData] = useState<ClicksByEducation[]>([]);
  const [scatterData, setScatterData] = useState<ScatterPoint[]>([]);
  const [corrMatrix, setCorrMatrix] = useState<CorrelationMatrix | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [age, edu, scatter, corr] = await Promise.all([
          getAgeBandCounts(),
          getClicksByEducation(),
          getScatterData(),
          getCorrelationMatrix(),
        ]);
        setAgeData(age);
        setEduData(edu);
        setScatterData(scatter);
        setCorrMatrix(corr);
      } catch (error) {
        console.error("Failed to fetch EDA data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div></div>

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="Student Distribution by Age Band">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age_band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      <Card title="Average Clicks by Education Level">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eduData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="highest_education" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="average_total_clicks" name="Avg Clicks" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Total Clicks vs. Average Score">
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="total_clicks" name="Total Clicks" />
            <YAxis type="number" dataKey="avg_score" name="Average Score" />
            <ZAxis range={[50, 51]}/>
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Students" data={scatterData} fill="#1d4ed8" shape="circle" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Correlation Matrix">
        {corrMatrix ? <CorrelationHeatmap data={corrMatrix} /> : <p>Loading...</p>}
      </Card>
    </div>
  );
};

export default EDAPage;
