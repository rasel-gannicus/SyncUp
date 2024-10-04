import dynamic from 'next/dynamic';
import React from 'react';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface QuillEditorProps {
  content: string;
  setContent: (content: string) => void;
  modules: any; // Replace 'any' with the correct type if available
  formats: string[];
}

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent, modules, formats }) => {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
      placeholder="Write your note here..."
      className="h-full"
    />
  );
};

export default QuillEditor;