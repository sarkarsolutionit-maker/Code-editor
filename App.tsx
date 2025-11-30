import React, { useState, useEffect, useCallback } from 'react';
import { CodeEditor } from './components/CodeEditor';
import { Toolbar } from './components/Toolbar';
import { FileHandler } from './components/FileHandler';
import { Theme } from './types';
import { FileCode, Menu } from 'lucide-react';

const DEFAULT_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Untitled</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>Start editing this file...</p>
</body>
</html>`;

export default function App() {
  const [code, setCode] = useState<string>(DEFAULT_CODE);
  const [fileName, setFileName] = useState<string>('untitled.html');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchTrigger, setSearchTrigger] = useState<number>(0);

  // Apply theme to document body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Handle Fullscreen
  useEffect(() => {
    if (isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {
          // Fallback if interaction failed or denied
          console.warn("Fullscreen request denied or failed");
        });
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  }, [isFullscreen]);

  const handleFileLoad = (name: string, content: string) => {
    setFileName(name);
    setCode(content);
  };

  const handleSave = useCallback(() => {
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, fileName]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const triggerSearch = () => {
    setSearchTrigger(prev => prev + 1);
  };

  return (
    <div className={`flex flex-col h-screen w-screen overflow-hidden ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50'}`}>
      
      {/* Top Header / Toolbar */}
      <header className="flex-none z-10 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#252526] p-2 shadow-sm">
        <div className="flex items-center justify-between mb-2">
           <div className="flex items-center space-x-2 overflow-hidden">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900 rounded-md">
                <FileCode className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <input 
                type="text" 
                value={fileName} 
                onChange={(e) => setFileName(e.target.value)}
                className="bg-transparent font-mono text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:border-b focus:border-blue-500 truncate"
              />
           </div>
           
           <FileHandler onFileLoad={handleFileLoad} onSave={handleSave} />
        </div>

        <Toolbar 
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
          onTriggerSearch={triggerSearch}
        />
      </header>

      {/* Main Editor Area */}
      <main className="flex-1 relative overflow-hidden">
        <CodeEditor 
          code={code} 
          onChange={setCode} 
          theme={theme}
          searchTrigger={searchTrigger}
        />
      </main>

      {/* Footer Status Bar */}
      <footer className="flex-none bg-gray-100 dark:bg-[#007acc] text-gray-600 dark:text-white text-xs px-3 py-1 flex justify-between items-center select-none">
         <span>HTML</span>
         <span>{code.length} chars</span>
         <span>UTF-8</span>
      </footer>
    </div>
  );
}