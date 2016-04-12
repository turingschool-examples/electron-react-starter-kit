import EventEmitter from 'events';
import { ipcRenderer } from 'electron';

let files = [];

const store = new EventEmitter();

store.all = () => files.concat([]);

store.add = ({ fileName, content }) => {
  files = files.concat({ fileName, content, active: false });
  store.emit('change', files);
};

store.remove = (fileName) => {
  files = files.filter(file => file.fileName !== fileName);
  store.emit('change', files);
};

store.select = (fileName) => {
  files = files.map(file => {
    if (file.fileName === fileName) {
      return Object.assign({}, file, { active: true });
    }
    return Object.assign({}, file, { active: false });
  });
  store.emit('change', files);
};

store.deselect = () => {
  files = files.map(file => Object.assign({}, file, { active: false }));
  store.emit('change', files);
};

ipcRenderer.on('file-opened', (event, file) => {
  store.add(file);
});

export default store;
