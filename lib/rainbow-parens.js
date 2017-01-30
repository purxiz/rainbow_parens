'use babel';

import RainbowParensView from './rainbow-parens-view';
import { CompositeDisposable } from 'atom';

export default {

  rainbowParensView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.rainbowParensView = new RainbowParensView(state.rainbowParensViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.rainbowParensView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rainbow-parens:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rainbowParensView.destroy();
  },

  serialize() {
    return {
      rainbowParensViewState: this.rainbowParensView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reversed = selection.split('').reverse().join('')
      editor.insertText(reversed)
    }
  }

};
