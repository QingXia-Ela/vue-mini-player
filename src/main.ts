import MusicPlayerCore from './core'
import Draggable from './directives/draggable'
import './css/index.css'
import './assets/fonts/iconfont/iconfont.css'
import Adsorb from './directives/wrapperAdsorb'

const id = 'CoreWrapper'

const store: MusicPlayerCore = PetiteVue.reactive(new MusicPlayerCore({}))
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
  clearHiddenTimer() {
    clearTimeout(hiddenTimer)
  },
  startTimer() {
    hiddenTimer = setTimeout(() => {
      this.hidden = true
      this.showList = false
      this.clearHiddenTimer()
    }, 8000)
  },
  /** wrapper */
  wrapperMouseDown() {
    this.dragging = true
    this.hidden = false
  },
  wrapperMouseUp() {
    this.dragging = false
    const e = document.getElementById(id)
    if (e) {
      if (e.offsetLeft > window.innerWidth / 2) this.onRight = true
      else this.onRight = false
    }
  },
  wrapperMouseEnter() {
    this.hover = true
    this.clearHiddenTimer()
  },
  wrapperMouseLeave() {
    this.hover = false
    this.clearHiddenTimer()
  },
  clickShow(e: MouseEvent) {
    clearTimeout(hiddenTimer)
    this.hidden = !this.hidden
    if (this.hidden)
      this.showList = false
    e.preventDefault();
    this.startTimer()
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
  },
  async CorePlay() {
    try {
      await store.Play()
    } catch (err) {
      console.log(err);
    }
  },
  CorePause() {
    store.Pause()
  }
})
app.directive('draggable', Draggable)
/** wrapper directive */
app.directive('wrapper-adsorb', Adsorb)
app.mount()

setTimeout(() => {
  store.AppendSong({ name: 'test', id: 0, src: 'https://shiinafan.top/static/sample.mp3' })
  store.AppendSong({ name: 'olk', id: 1, src: 'https://shiinafan.top/static/sample2.mp3' })
});

// document.body.appendChild(_p)
