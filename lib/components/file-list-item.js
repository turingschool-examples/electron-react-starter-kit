import React from 'react';
import store from '../store';
import path from 'path';

const FileListItem = (file) => {
  const content = truncate(file.content, 100);
  const fileName = path.basename(file.fileName);

  return (
    <div className="file-list-item">
      <h3 className="file-list-item-title">{fileName}</h3>
      <div className="file-list-item-content">{content}</div>
      <button onClick={() => store.remove(file.fileName)}>Remove</button>
      <button onClick={() => store.select(file.fileName)}>Select</button>
    </div>
  );
};

const truncate = (text, maxLength) => {
  if (text.length < maxLength) { return text; }
  return text.slice(0, maxLength) + '…';
};

module.exports = FileListItem;
