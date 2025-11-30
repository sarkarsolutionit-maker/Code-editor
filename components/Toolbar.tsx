import React from 'react';
import { Search, Moon, Sun, Maximize2, Minimize2 } from 'lucide-react';
import { Theme } from '../types';

interface ToolbarProps {
  theme: Theme;
  isFullscreen: boolean;
  onToggleTheme: () => void;
  onToggleFullscreen: () => void;
  onTriggerSearch: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  theme,
  isFullscreen,
  onToggleTheme,
  onToggleFullscreen,
  onTriggerSearch
}) => {
  const btnClass = "p-2 rounded-md transition-colors duration-200 flex items-center justify-center space-x-1";
  const lightClass = "hover:bg-gray-100 text-gray-600 active:bg-gray-200";
  const darkClass = "hover:bg-gray-700 text-gray-300 active:bg-gray-600";
  const activeClass = theme === 'dark' ? darkClass : lightClass;

  return (
    <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
      
      <button 
        onClick={onTriggerSearch}
        className={`${btnClass} ${activeClass} flex-1 md:flex-none border border-transparent`}
        title="Find & Replace"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm font-medium hidden sm:inline">Find</span>
      </button>

      <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-1"></div>

      <button 
        onClick={onToggleTheme}
        className={`${btnClass} ${activeClass} flex-1 md:flex-none`}
        title="Switch Theme"
      >
        {theme === 'light' ? (
          <>
            <Moon className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Light</span>
          </>
        )}
      </button>

      <button 
        onClick={onToggleFullscreen}
        className={`${btnClass} ${activeClass} flex-1 md:flex-none`}
        title="Toggle Fullscreen"
      >
        {isFullscreen ? (
          <>
            <Minimize2 className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Exit</span>
          </>
        ) : (
          <>
            <Maximize2 className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Full</span>
          </>
        )}
      </button>

    </div>
  );
};