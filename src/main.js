import DarkModal from './darkmodal'
import 'element-closest-polyfill'
import './darkmodal.css'
import dialogPolyfill from 'dialog-polyfill'
const dialog = document.querySelector('dialog')
if (dialog) {
  dialogPolyfill.registerDialog(dialog)
}
global.DarkModal = DarkModal 