import React from 'react';
import FileListItem from './file-list-item';

const FileList = ({ files }) => {
  return (
    <div className="file-list">
      {files.map(file => <FileListItem key={file.fileName} {...file} />)}
    </div>
  );
};

module.exports = FileList;
