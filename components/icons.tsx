
import React from 'react';

const iconProps = {
  className: "w-5 h-5",
  viewBox: "0 0 20 20",
  fill: "currentColor"
};

export const DataIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 000-2H3zm12 10H5V7h10v6zM2 5a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-3 3H5a3 3 0 01-3-3V5z" clipRule="evenodd" />
  </svg>
);

export const ChartIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 13.5V4.5A2.5 2.5 0 014.5 2h11A2.5 2.5 0 0118 4.5v9a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 13.5zM4.5 3a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 004.5 15h11a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0016.5 3h-11z" />
    <path d="M7 12a1 1 0 01-1-1V8a1 1 0 112 0v3a1 1 0 01-1 1zm4 0a1 1 0 01-1-1V6a1 1 0 112 0v5a1 1 0 01-1 1zm4 0a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1z" />
  </svg>
);

export const ModelIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M11.49 3.17a.75.75 0 011.02 0l1.12 1.12a.75.75 0 010 1.02l-7 7a.75.75 0 01-1.02 0l-1.12-1.12a.75.75 0 010-1.02l7-7zM10 6.63L11.87 8.5 4.5 15.87 2.63 14 10 6.63zm3.7-2.63a1.5 1.5 0 112.12 2.12L10.5 11.5 8.38 9.38 13.7 4z" clipRule="evenodd" />
  </svg>
);

export const ClusterIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg" >
    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.09 4.09a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06L4.09 5.15a.75.75 0 010-1.06zm9.82 9.82a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5A.75.75 0 012 10zm15.75.75a.75.75 0 01-.75-.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.09 15.91a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" />
    <path fillRule="evenodd" d="M10 4a6 6 0 100 12 6 6 0 000-12zM8 10a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
  </svg>
);

export const RecommendIcon = () => (
  <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
  </svg>
);

export const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

export const GithubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.003 10.003 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path>
  </svg>
);

