import MusicPlayerCore from './core'
import Draggable from './directives/draggable'
import './css/index.css'
import './assets/fonts/iconfont/iconfont.css'
import Adsorb from './directives/wrapperAdsorb'
import execSecTime from './utils/execSecTime'

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
  duration: 0,
  showupPrecentage: 0,
  showList: false,
  sliding: false,
  slidingTime: 0,
  onMounted() {
    console.log('mounted');
    const { e } = store

    e.addEventListener('timeupdate', () => {
      if (!this.sliding) {
        this.CurrentTime = e.currentTime
        this._UpdateShowPrecentage(this.CurrentTime / this.duration)
      }
    })

    e.addEventListener('loadedmetadata', () => {
      if (!this.sliding)
        this.duration = e.duration
    })
  },
  get currentPrecentage() {
    return (this.currentTime * 100).toFixed(2)
  },
  get currentSongInfo() {
    const s = store.SongIdMap[store.CurrentSongId]
    return s ? s : {
      name: '_(:з」∠)_'
    }
  },
  get mediaDuration() {
    return execSecTime(this.duration)
  },
  get mediaCurrentTime() {
    return this.sliding ? execSecTime(this.slidingTime) : execSecTime(this.CurrentTime)
  },
  get songInfoList() {
    const res = []
    for (const i of store.SongIdList) {
      res.push(store.SongIdMap[i])
    }
    return res
  },
  clearHiddenTimer() {
    clearTimeout(hiddenTimer)
  },
  startTimer() {
    if (hiddenTimer)
      this.clearHiddenTimer()
    hiddenTimer = setTimeout(() => {
      this.hidden = true
      this.hover = false
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
    this.startTimer()
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
    this.slidingTime = this.duration * p
  },
  jumpTime(e: MouseEvent) {
    const slider = e.currentTarget
    // @ts-expect-error
    let p = e.offsetX / slider.clientWidth
    this._UpdateShowPrecentage(p)
    this.sliding = true
    const slide = (e: MouseEvent) => {
      const s = document.getElementById(id)
      // @ts-expect-error
      p = e.clientX - s.offsetLeft - slider.clientWidth
      p += this.onRight ? 25 : 85
      // @ts-expect-error
      this._UpdateShowPrecentage(p / slider.clientWidth)
    }
    const cs = () => {
      // @ts-expect-error
      this.store.e.currentTime = (p / slider.clientWidth) * this.duration
      this.sliding = false
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
  },
  CorePlaySelectSong(id: number) {
    store.PlaySelectSong(id)
  }
})
app.directive('draggable', Draggable)
/** wrapper directive */
app.directive('wrapper-adsorb', Adsorb)
app.mount()

setTimeout(() => {
  store.AppendSong({ name: 'Infected', id: 0, src: 'https://shiinafan.top/static/sample.mp3' })
  store.AppendSong({ name: 'olk', id: 1, src: 'https://shiinafan.top/static/sample2.mp3' })
  store.AppendSong({ name: 'Untitled World', id: 2, src: 'https://shiinafan.top/static/sample3.mp3' })
});

// document.body.appendChild(_p)
