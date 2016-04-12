import React from 'react';
import store from '../store';

const FileListItem = (file) => {
  const fileName = file.fileName;
  const content = truncate(file.content, 100);

  return (
    <div className="file-list-item">
      <div className="file-list-item-title">{fileName}</div>
      <div className="file-list-item-content">{content}</div>
      <button onClick={() => { store.remove(fileName); }}>Remove</button>
      <button onClick={() => { store.select(fileName); }}>Select</button>
    </div>
  );
};

const truncate = (text, maxLength) => {
  if (text.length < maxLength) { return text; }
  return `${text.slice(0, maxLength)}…`;
};

export default FileListItem;
