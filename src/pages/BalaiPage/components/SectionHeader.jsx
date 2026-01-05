
import React from 'react';

const SectionHeader = ({ icon, title, textColor = 'text-gray-500' }) => {
    return (
        <div className={`flex gap-3 ${textColor}`}>
      <span className="opacity-80">
        {icon}
      </span>
            <h2 className="text-3xl font-bold tracking-tight">
                {title}
            </h2>
        </div>
    );
};

export default SectionHeader;
