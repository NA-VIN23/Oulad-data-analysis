
import React, { useState } from 'react';
import UploadPage from './pages/UploadPage';
import EDAPage from './pages/EDAPage';
import ModelingPage from './pages/ModelingPage';
import ClusteringPage from './pages/ClusteringPage';
import RecommendationsPage from './pages/RecommendationsPage';
import { DataIcon, ChartIcon, ModelIcon, ClusterIcon, RecommendIcon, GithubIcon } from './components/icons';

type Page = 'upload' | 'eda' | 'modeling' | 'clustering' | 'recommendations';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('upload');

  const renderPage = () => {
    switch (currentPage) {
      case 'upload':
        return <UploadPage />;
      case 'eda':
        return <EDAPage />;
      case 'modeling':
        return <ModelingPage />;
      case 'clustering':
        return <ClusteringPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      default:
        return <UploadPage />;
    }
  };

  // Fix: Cannot find namespace 'JSX'.
  const NavItem = ({ page, label, icon }: { page: Page, label: string, icon: React.ReactElement }) => (
    <button
      onClick={() => setCurrentPage(page)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
        currentPage === page
          ? 'bg-blue-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-gray-800">OULAD Analytics</h1>
            <a href="https://github.com/google/generative-ai-docs" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-800">
              <GithubIcon />
            </a>
          </div>
          <nav className="flex space-x-2 sm:space-x-4 pb-3 overflow-x-auto">
            <NavItem page="upload" label="Data" icon={<DataIcon />} />
            <NavItem page="eda" label="EDA" icon={<ChartIcon />} />
            <NavItem page="modeling" label="Modeling" icon={<ModelIcon />} />
            <NavItem page="clustering" label="Clustering" icon={<ClusterIcon />} />
            <NavItem page="recommendations" label="Recommendations" icon={<RecommendIcon />} />
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>

      <footer className="bg-white mt-8 py-4 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
          <p>Dataset: Open University Learning Analytics Dataset (OULAD). Kuzilek, Hlosta, Zdráhal, Scientific Data (2017).</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
