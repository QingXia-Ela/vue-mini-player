import MusicPlayerCore from '../MusicPlayerCore'
import execSecTime from '../../utils/execSecTime'
import Draggable from '../../directives/draggable'
import Adsorb from '../../directives/wrapperAdsorb'
// @ts-expect-error: use plugin to register import raw
import template from '../../template/index.html'
import '../../css/index.css'
import '../../assets/fonts/iconfont/iconfont.css'

export interface VueMiniPlayerCoreProps {
  defaultIconPath?: string
  rootElement?: string | HTMLElement
  /** player github link log on console, set to false if you don't want to show */
  ad?: boolean
  /** player will show at right if set to true */
  initRight?: boolean
}

let store: MusicPlayerCore
const a = "CoreWrapper"
let hiddenTimer: number

export default class VueMiniPlayerCore {
  PlayerCore: MusicPlayerCore
  e: HTMLAudioElement
  constructor(o?: VueMiniPlayerCoreProps) {
    const { rootElement, ad = true, initRight = false, defaultIconPath = '' } = o || {}
    this.PlayerCore = PetiteVue.reactive(new MusicPlayerCore(o))
    this.e = this.PlayerCore.e
    store = this.PlayerCore

    if (ad) console.log('Vue-Mini-Player powered by: https://github.com/QingXia-Ela/vue-mini-player');

    const _p = document.createElement('div')
    _p.setAttribute('id', 'CorePlayer')
    _p.innerHTML = template
    _p.querySelector("#CoreWrapper")?.setAttribute("style", initRight ? "right: 0;" : "left: 0;")
    if (rootElement) {
      if (typeof rootElement === 'string')
        document.querySelector(rootElement)?.appendChild(_p)
      else
        rootElement.appendChild(_p)
    }
    else
      document.body.appendChild(_p)

    const b = PetiteVue.createApp({
      store,
      dragging: false,
      onRight: initRight,
      hidden: true,
      hover: false,
      currentTime: 0,
      duration: 0,
      showupPrecentage: 0,
      showList: false,
      sliding: false,
      slidingTime: 0,
      defaultIconPath,
      onMounted() {
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

        this.store.e.addEventListener('ended', () => {
          const { SongIdList, CurrentSongId, PlayMode } = this.store
          const p = SongIdList.indexOf(CurrentSongId)
          switch (PlayMode) {
            case 1:
              if (p !== SongIdList.length) store.NextSong()
              break;
            case 2:
              store.NextSong()
              break;
            case 3:
              store.Play()
              break;
            case 4:
              let l = parseInt(SongIdList.length * Math.random() + '')
              while (l === CurrentSongId) {
                l = parseInt(SongIdList.length * Math.random() + '')
              }
              store.PlaySelectSong(SongIdList[l])
              break;
            default:
              store.NextSong()
              break;
          }
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
      get SONGinfoLIST() {
        const res = []
        for (const j of store.SongIdList) {
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
        }, 8000) as unknown as number
      },
      /** wrapper */
      wrapperMouseDown() {
        this.dragging = true
        this.hidden = false
      },
      wrapperMouseUp() {
        this.dragging = false
        const e = document.getElementById(WrapperID)
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
        if (isNaN(this.store.e.duration)) return
        const slider = e.currentTarget
        // @ts-expect-error
        let p = e.offsetX / slider.clientWidth
        this._UpdateShowPrecentage(p)
        this.sliding = true
        // exec p 2 slider length
        // @ts-expect-error
        p *= slider.clientWidth

        const slide = (e: MouseEvent) => {
          const s = document.getElementById(Wrapper-ID)
          // @ts-expect-error
          p = (e.clientX - s.offsetLeft - slider.client-Width)
          p += this.onRight ? 25 : 85
          // @ts-expect-error
          this._UpdateShowPrecentage(p / slider.client-Width)
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
      CorePlaySelectSong(id: string) {
        store.PlaySelectSong(id)
      }
    })

    app.directive('draggable', Draggable)
    /** wrapper directive */
    app.directive('wrapper-adsorb', Adsorb)
    app.mount(_p)
  }
}