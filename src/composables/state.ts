import ApiUrl from '@/models/ApiUrl'
import Entry from '@/models/Entry'
import { ref, computed } from 'vue'

type GlobalState = {
  journalEntries: Entry[]
  journalFilters: Entry[]
  ledgerFilters: Entry[]
  reportFilters: Entry[]
}

const globalState = ref<GlobalState>({
  journalEntries: [],
  journalFilters: [],
  ledgerFilters: [],
  reportFilters: []
})

const toLocalState = (apiUrl: ApiUrl, view: string) => {
  // for (const key in globalState) {
  //   if (key.includes(view)) {
  //     Object.assign(apiUrl, {
  //       [key.slice(view.length)]: globalState[key]
  //     })
  //   }
  // }
}

const toGlobalState = (apiUrl: ApiUrl, view: string) => {
  // for (const key in apiUrl) {
  //   Object.assign(globalState, {
  //     [`${view}${key}`]: apiUrl[key as keyof typeof apiUrl]
  //   })
  // }
}

const getJournal = () => {
  return {
    entries: globalState.value.journalEntries,
    total: computed(
      () =>
        globalState.value.journalEntries.reduce(
          (sum, item) => sum + item.amount,
          0
        ) / 1000
    )
  }
}

export { getJournal, toLocalState, toGlobalState }
