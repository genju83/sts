import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import App from './App.vue'
import VueRouter from 'vue-router'
import Diff from 'text-diff'

import Characters from './components/Characters.vue'
import CharacterCards from './components/CharacterCards.vue'
import Relics from './components/Relics.vue'
import SoyHelper from './mixins/SoyHelper'

import charactersData from "./assets/data/characters.json"

import ironcladCardsData from "./assets/data/ironclad.json"
import silentCardsData from "./assets/data/silent.json"
import defectCardsData from "./assets/data/defect.json"
import neutralCardsData from "./assets/data/neutral.json"

import relicsData from "./assets/data/relic.json"

const cardsMap = {
  "ironclad": ironcladCardsData,
  "silent": silentCardsData,
  "defect": defectCardsData,
  "neutral": neutralCardsData
}

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: '/sts/',
  routes: [
    {
      path: '/',
      components: { default: Characters, content: CharacterCards },
      props: {
        default: { characters: charactersData.characters, characterId: 'ironclad', deckId: 0 },
        content: { characterId: 'ironclad', cards: ironcladCardsData }
      }
    },
    {
      path: '/relic',
      components: { default: Characters, content: Relics },
      props: {
        default: { characters: charactersData.characters, characterId: 'ironclad', deckId: 0 },
        content: { relics: relicsData }
      }
    },
    {
      path: '/:characterId',
      components: { default: Characters, content: CharacterCards },
      props: {
        default: (route) => ({ characters: charactersData.characters, characterId: route.params.characterId, deckId: 0 }),
        content: (route) => ({ characterId: route.params.characterId, cards: cardsMap[route.params.characterId] })
      }
    },
    {
      path: '/:characterId/:deckId',
      components: { default: Characters, content: CharacterCards },
      props: {
        default: (route) => ({ characters: charactersData.characters, characterId: route.params.characterId, deckId: route.params.deckId }),
        content: (route) => (
          {
            characterId: route.params.characterId,
            cards: cardsMap[route.params.characterId],
            deckKeyCards: charactersData.characters.find(array => array.id == route.params.characterId).decks.find(array => array.id == parseInt(route.params.deckId)).keyCards,
            deckCards: charactersData.characters.find(array => array.id == route.params.characterId).decks.find(array => array.id == parseInt(route.params.deckId)).cards
          })
      }
    }
  ]
})

Vue.use(Vuex)
export const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    allVisible: true
  },
  mutations: {
    setVisiblility(state, newValue) {
      state.allVisible = newValue
    }
  }
})

const plugin = {
  install(Vue) {
    Vue.prototype.$helper = SoyHelper;
  }
};
Vue.use(plugin)
Vue.use(Diff)

Vue.config.productionTip = false
require('./assets/sass/app.scss');
// eslint-disable-next-line
Vue.prototype.$log = console.log.bind(console)
Vue.prototype.$diff = new Diff()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
