import React, { useRef } from 'react';
import { FolderOpen, Save } from 'lucide-react';

interface FileHandlerProps {
  onFileLoad: (name: string, content: string) => void;
  onSave: () => void;
}

export const FileHandler: React.FC<FileHandlerProps> = ({ onFileLoad, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result;
      if (typeof content === 'string') {
        onFileLoad(file.name, content);
      }
    };
    reader.readAsText(file);
    
    // Reset input so same file can be selected again if needed
    event.target.value = '';
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const btnClass = "px-3 py-1.5 rounded text-sm font-medium shadow-sm transition-all active:scale-95 flex items-center space-x-1.5";

  return (
    <div className="flex items-center space-x-2">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".html,.htm,.txt" 
        className="hidden" 
      />
      
      <button 
        onClick={triggerUpload}
        className={`${btnClass} bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600`}
      >
        <FolderOpen className="w-4 h-4" />
        <span className="hidden xs:inline">Open</span>
      </button>

      <button 
        onClick={onSave}
        className={`${btnClass} bg-blue-600 hover:bg-blue-700 text-white border border-transparent`}
      >
        <Save className="w-4 h-4" />
        <span className="hidden xs:inline">Save</span>
      </button>
    </div>
  );
};