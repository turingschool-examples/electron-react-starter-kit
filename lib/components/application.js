import React, { Component } from 'react';
import { remote } from 'electron';
import store from '../store';
import FileList from './file-list';
import ActiveFile from './active-file';

store.on('change', (files) => console.log(files));

const { openFile } = remote.require(`${__dirname}/../main`);

export default class Application extends Component {
  constructor() {
    super();
    this.state = { files: [] };
  }

  componentDidMount() {
    store.on('change', (files) => {
      this.setState({ files });
    });
  }

  render() {
    const activeFile = this.state.files
                                 .filter(f => f.active)
                                 .map(f => <ActiveFile {...f} />);

    return (
      <div>
        <div className="controls">
          <button
            className="controls-open-file"
            onClick={() => openFile()}
          >
            Open File
          </button>
        </div>
        <div className="files">
          <FileList files={this.state.files} />
          {activeFile[0]}
        </div>
      </div>
    );
  }
}
