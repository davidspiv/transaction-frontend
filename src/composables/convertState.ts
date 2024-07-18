import store from '@/models/GlobalState'
import ApiUrl from '@/models/ApiUrl'

const toLocalState = (apiUrl: ApiUrl, view: string) => {
  for (const key in store) {
    if (key.includes(view)) {
      Object.assign(apiUrl, {
        [key.slice(view.length)]: store[key]
      })
    }
  }
}

const toGlobalState = (apiUrl: ApiUrl, view: string) => {
  for (const key in apiUrl) {
    Object.assign(store, {
      [`${view}${key}`]: apiUrl[key as keyof typeof apiUrl]
    })
  }
}

export { toLocalState, toGlobalState }
