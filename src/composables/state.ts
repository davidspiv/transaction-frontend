import ApiUrl from '@/models/ApiUrl'
import Entry from '@/models/Entry'

const globalState: { [k: string]: string } = {}
const journalState: { entries: Entry[] } = { entries: [] }

const toLocalState = (apiUrl: ApiUrl, view: string) => {
  for (const key in globalState) {
    if (key.includes(view)) {
      Object.assign(apiUrl, {
        [key.slice(view.length)]: globalState[key]
      })
    }
  }
}

const toGlobalState = (apiUrl: ApiUrl, view: string) => {
  for (const key in apiUrl) {
    Object.assign(globalState, {
      [`${view}${key}`]: apiUrl[key as keyof typeof apiUrl]
    })
  }
}

export { journalState, toLocalState, toGlobalState }
