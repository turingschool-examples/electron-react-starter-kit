import React, { Component } from 'react';
import store from '../store';
import FileList from './file-list';
import ActiveFile from './active-file';

import { remote } from 'electron';

const { openFile } = remote.require(`${__dirname}/../main`);

store.on('change', () => console.log('CHANGED', store.all()));

class Application extends Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  componentDidMount() {
    store.on('change', files => {
      this.setState({ files });
    });
  }

  render() {
    let activeFile = this.state.files.find(file => file.active);

    return (
      <div>
        <div className="controls">
          <button className="controls-open-file" onClick={() => openFile()}>Open File</button>
          <button className="controls-deselect" onClick={() => store.deselect()}>Close Current File</button>
        </div>
        <div className="files">
          <FileList files={this.state.files} />
          <ActiveFile file={activeFile} />
        </div>
      </div>
    );
  }
}

export default Application;
