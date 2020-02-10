import util from '@/helper/util'


const state = {
  address: {
    name: '珠海市人民政府'
  },
  city: '',
  memory_session: JSON.parse(util.sessionStorageGet('memory_session')) || {},
}

export default state