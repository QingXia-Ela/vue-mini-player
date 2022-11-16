import MusicPlayerCore from './core'
import './css/index.css'

const store = PetiteVue.reactive(new MusicPlayerCore({}))
/** @ts-ignore */
window._PlayerCore = store

const _p = document.createElement('div')
_p.setAttribute('id', '_player')

_p.innerHTML = `
<div v-scope>
  <p>{{ count }}</p>
  <p>{{ plusOne }}</p>
  <div>{{ store.SongIdList }}</div>
  <button @click="increment">increment</button>
</div>
`

PetiteVue.createApp({
  store
}).mount()

setTimeout(() => {
  store.AppendSong({ name: 'test', id: 0, src: '' })
}, 1000);

// document.body.appendChild(_p)
