
import React from 'react';

const SectionHeader = ({ icon, title, textColor = 'text-gray-500' }) => {
    return (
        <div className={`flex items-center gap-3 ${textColor}`}>
      <span className="opacity-80">
        {icon}
      </span>
            <h2 className="text-2xl font-bold tracking-tight">
                {title}
            </h2>
        </div>
    );
};

export default SectionHeader;
