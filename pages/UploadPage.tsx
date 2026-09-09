
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SummaryStats } from '../types';
import { uploadFiles, fetchOulad } from '../services/api';
import { UploadIcon, DownloadIcon } from '../components/icons';

const FileInput: React.FC<{ label: string; onFileSelect: (file: File | null) => void; requiredFileName: string; }> = ({ label, onFileSelect, requiredFileName }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      const fileIsValid = file.name === requiredFileName;
      setIsValid(fileIsValid);
      onFileSelect(fileIsValid ? file : null);
    } else {
      setFileName(null);
      setIsValid(null);
      onFileSelect(null);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isValid === false ? 'border-red-400' : 'border-gray-300'} border-dashed rounded-md`}>
        <div className="space-y-1 text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex text-sm text-gray-600">
            <label htmlFor={requiredFileName} className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
              <span>Upload a file</span>
              <input id={requiredFileName} name={requiredFileName} type="file" className="sr-only" onChange={handleFileChange} accept=".csv" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500">Must be named: <span className="font-semibold">{requiredFileName}</span></p>
          {fileName && <p className={`text-xs ${isValid ? 'text-green-600' : 'text-red-600'}`}>{fileName}</p>}
        </div>
      </div>
    </div>
  );
};

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    studentInfo: null,
    studentVle: null,
    studentAssessment: null,
  });
  const [data, setData] = useState<any[] | null>(null);
  const [summary, setSummary] = useState<SummaryStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (name: string, file: File | null) => {
    setFiles(prev => ({ ...prev, [name]: file }));
  };

  const allFilesSelected = Object.values(files).every(f => f !== null);

  const handleSubmit = async (source: 'upload' | 'fetch') => {
    setIsLoading(true);
    setError(null);
    setData(null);
    setSummary(null);
    try {
      const result = source === 'upload'
        ? await uploadFiles(files as { [key: string]: File })
        : await fetchOulad();
      setData(result.sample);
      setSummary(result.summary);
    } catch (err) {
      setError('Failed to process data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDownload = () => {
    // In a real app, this would be a link to /api/download/merged.csv
    const csvContent = "data:text/csv;charset=utf-8," + 
      [Object.keys(data![0]).join(","), ...data!.map(item => Object.values(item).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "merged_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card title="1. Load Dataset">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Option A: Upload CSV files</h3>
            <FileInput label="Student Info" onFileSelect={(file) => handleFileSelect('studentInfo', file)} requiredFileName="studentInfo.csv" />
            <FileInput label="Student VLE" onFileSelect={(file) => handleFileSelect('studentVle', file)} requiredFileName="studentVle.csv" />
            <FileInput label="Student Assessment" onFileSelect={(file) => handleFileSelect('studentAssessment', file)} requiredFileName="studentAssessment.csv" />
            <Button onClick={() => handleSubmit('upload')} disabled={!allFilesSelected} isLoading={isLoading} className="w-full" icon={<UploadIcon />}>
              Upload & Process
            </Button>
          </div>
          <div className="mt-0 md:mt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Option B: Fetch from source</h3>
            <p className="text-sm text-gray-600 mb-4">The server will fetch the OULAD dataset directly from KaggleHub.</p>
            <Button onClick={() => handleSubmit('fetch')} variant="secondary" isLoading={isLoading} className="w-full">
              Fetch OULAD via KaggleHub
            </Button>
          </div>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </Card>
      
      {summary && (
        <Card title="2. Summary Statistics">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Fix: Property 'mean' does not exist on type 'unknown'. The 'stats' variable from Object.entries is not correctly typed. */}
            {Object.entries(summary.numeric_descriptive).map(([key, stats]) => {
                const typedStats = stats as SummaryStats['numeric_descriptive'][string];
                return (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-700 capitalize">{key.replace('_', ' ')}</h4>
                        <ul className="text-sm text-gray-600 mt-2 space-y-1">
                            <li>Mean: {typedStats.mean.toFixed(2)}</li>
                            <li>Std Dev: {typedStats.std.toFixed(2)}</li>
                            <li>Median: {typedStats['50%'].toFixed(2)}</li>
                            <li>Min: {typedStats.min.toFixed(2)}, Max: {typedStats.max.toFixed(2)}</li>
                        </ul>
                    </div>
                );
            })}
           </div>
        </Card>
      )}

      {data && (
        <Card title="3. Merged Data Sample (First 100 Rows)">
            <Button onClick={handleDownload} variant="secondary" className="mb-4" icon={<DownloadIcon />}>
              Download Data
            </Button>
            <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    {Object.keys(data[0]).map(key => (
                    <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{key}</th>
                    ))}
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                    {Object.values(row).map((val: any, j) => (
                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{val}</td>
                    ))}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </Card>
      )}
    </div>
  );
};

export default UploadPage;
