import MusicPlayerCore from './core'
import Draggable from './directives/draggable'
import './css/index.css'

const store = PetiteVue.reactive(new MusicPlayerCore({}))
/** @ts-ignore */
window._PlayerCore = store

const _p = document.createElement('div')
_p.setAttribute('id', '_player')

_p.innerHTML = ``

const app = PetiteVue.createApp({
  store
})
app.directive('draggable', Draggable)
app.mount()

setTimeout(() => {
  store.AppendSong({ name: 'test', id: 0, src: '' })
}, 1000);

// document.body.appendChild(_p)
