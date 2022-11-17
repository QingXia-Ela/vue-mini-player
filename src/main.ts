import MusicPlayerCore from './core'
import Draggable from './directives/draggable'
import './css/index.css'
import './assets/fonts/iconfont/iconfont.css'
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
  currentTime: 0,
  showupPrecentage: 0,
  showList: false,
  get currentPrecentage() {
    return (this.currentTime * 100).toFixed(2)
  },
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
      this.showList = false
      clearTimeout(hiddenTimer)
    }, 5000)
  },
  wrapperMouseEnter() { },
  wrapperMouseLeave() { },
  clickShow(e: MouseEvent) {
    this.hidden = !this.hidden
    e.preventDefault();
  },
  _UpdateShowPrecentage(p: any) {
    if (p > 1) p = 1
    else if (p < 0) p = 0
    this.showupPrecentage = (p * 100).toFixed(2)
  },
  jumpTime(e: MouseEvent) {
    const slider = e.currentTarget
    // @ts-expect-error
    const p = e.offsetX / slider.clientWidth
    this._UpdateShowPrecentage(p)
    const slide = (e: MouseEvent) => {
      const s = document.getElementById(id)
      // @ts-expect-error
      console.log(s.offsetLeft);
      // @ts-expect-error
      let p = e.clientX - s.offsetLeft - slider.clientWidth
      p += this.onRight ? 25 : 85
      // @ts-expect-error
      this._UpdateShowPrecentage(p / slider.clientWidth)
    }
    function cs() {
      window.removeEventListener('mousemove', slide)
      window.removeEventListener('mouseup', cs)
    }
    window.addEventListener('mousemove', slide)
    window.addEventListener('mouseup', cs)
  },
  switchListShow() {
    this.showList = !this.showList
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
