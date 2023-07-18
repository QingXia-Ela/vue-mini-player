/** standalone packed entry */
import { createApp, reactive } from 'petite-vue'
import VueMiniPlayerCore from '../core/VueMiniPlayerCore'

window.PetiteVue = {
  createApp,
  reactive
}

export default VueMiniPlayerCore