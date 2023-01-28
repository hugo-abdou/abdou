import { loadModules } from '@/utils/helpers'
import { createStore } from 'vuex'
const { modules } = loadModules(import.meta.glob('./**/*.ts', { eager: true }))


const store = createStore({
    modules: modules
})
export default store