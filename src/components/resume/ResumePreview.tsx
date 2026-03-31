"use client";

import React from 'react';
import { ResumeData } from '@/lib/types';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  scale?: number;
}

export function ResumePreview({ data, scale = 1 }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (data.templateId) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div 
      className="bg-white shadow-2xl mx-auto origin-top transition-transform duration-300 ease-in-out print:shadow-none print:transform-none print:m-0"
      style={{
        width: '210mm',
        minHeight: '297mm',
        transform: `scale(${scale})`,
        padding: '0',
      }}
    >
      {renderTemplate()}
    </div>
  );
}