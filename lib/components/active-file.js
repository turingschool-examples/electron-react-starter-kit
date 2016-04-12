import React from 'react';

const ActiveFile = ({ fileName, content }) => {
  console.log(arguments);
  return (
    <div className="active-file">
      <h2>{fileName}</h2>
      <div className="active-file-content">
        {content}
      </div>
    </div>
  );
};

export default ActiveFile;
