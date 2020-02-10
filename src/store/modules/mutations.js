import util from '@/helper/util'

const mutations = {
  setCity(state, city) {
    state.city = city
  },
  setMemorySession(state, memory_session) {
    util.sessionStorageSet(
      "memory_session",
      JSON.stringify(memory_session)
    );
    state.memory_session = memory_session
  },
  setMoreNumber(state, value) {
    state.more_number = value
  }
}

export default mutations