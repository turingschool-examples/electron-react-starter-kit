import React from 'react';
import marked from 'marked';

const ActiveFile = ({ file }) => {
  if (!file) { return <div>Please select a file.</div>; }

  const content = renderMarkdown(file.content);

  return (
    <div className="active-file">
      <h3>{file.fileName}</h3>
      <div className="file-content" dangerouslySetInnerHTML={content} />
    </div>
  );
};

const renderMarkdown = (text) => {
  return { __html: marked(text, { sanitized: true }) };
};

module.exports = ActiveFile;
