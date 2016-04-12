import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let files = [];

const store = new EventEmitter();

store.all = () => files;

store.add = ({ fileName, content }) => {
  files = files.concat({ fileName, content, active: false });
  store.emit('change', files);
  return this;
};

store.remove = (fileName) => {
  files = files.filter(file => file.fileName !== fileName);
  store.emit('change', files);
  return this;
};

store.select = (fileName) => {
  files = files.map(file => Object.assign({}, file, {
    active: file.fileName === fileName
  }));
  store.emit('change', files);
  return this;
};

store.deselect = () => {
  files = files.map(file => Object.assign({}, file, { active: false }));
  store.emit('change', files);
  return this;
};

store.change = (fileName, content) => {
  files = files.map(file => {
    if (file.fileName === file) {
      return Object.assign({}, file, { content });
    }
    return Object.assign({}, file);
  });
  store.emit('change', files);
  return this;
};

ipcRenderer.on('file-opened', (event, file) => {
  console.log(file);
  store.add(file);
});

module.exports = store;
