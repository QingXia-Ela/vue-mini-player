import MusicPlayerCore from './core'
import Draggable from './directives/draggable'
import './css/index.css'
import Adsorb from './directives/wrapperAdsorb'

const id = 'CoreWrapper'

const store = PetiteVue.reactive(new MusicPlayerCore({}))
/** @ts-ignore */
window._PlayerCore = store

const _p = document.createElement('div')
_p.setAttribute('id', '_player')

_p.innerHTML = ``

let hiddenTimer: number

const app = PetiteVue.createApp({
  store,
  dragging: false,
  onRight: true,
  hidden: true,
  hover: false,
  /** wrapper */
  wrapperMouseDown() {
    this.dragging = true
    this.hidden = false
    clearTimeout(hiddenTimer)
  },
  wrapperMouseUp() {
    this.dragging = false
    const e = document.getElementById(id)
    if (e) {
      if (e.offsetLeft > window.innerWidth / 2) this.onRight = true
      else this.onRight = false
    }
    hiddenTimer = setTimeout(() => {
      this.hidden = true
      clearTimeout(hiddenTimer)
    }, 5000)
  },
  wrapperMouseEnter() { },
  wrapperMouseLeave() { },
  clickShow(e: MouseEvent) {
    this.hidden = !this.hidden
    e.preventDefault();
  }
})
app.directive('draggable', Draggable)
/** wrapper directive */
app.directive('wrapper-adsorb', Adsorb)
app.mount()

setTimeout(() => {
  store.AppendSong({ name: 'test', id: 0, src: '' })
}, 1000);

// document.body.appendChild(_p)
