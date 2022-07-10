import { getconfig } from '@/api/index'

const state = {
    thingtype: [],
    thingtype2: []
}

const mutations = {
   SET_ThingType: (state, thingtype) => {
       state.thingtype = thingtype
   },
   SET_ThingType2: (state, thingtype2) => {
    state.thingtype2 = thingtype2
}
}

const actions = {
    
   async getconfig({ commit } ) {
      await getconfig().then(res => {
          commit('SET_ThingType', res.data.thingtype),
          commit('SET_ThingType2', res.data.thingtype2)
      })
   }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}