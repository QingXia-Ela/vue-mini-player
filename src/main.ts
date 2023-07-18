/** browser debug */

import './style.css'

import VueMiniPlayerCore from './pack/WithoutPvue'

const { PlayerCore } = new VueMiniPlayerCore()

PlayerCore.AppendSong({
  name: "Libertas",
  id: "1",
  src: "./Libertas.mp3"
})