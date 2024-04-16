import { IReturnIntention } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface IReturnIntentionState {
  returnIntention: IReturnIntention
  updateReturnIntention: (returnIntention: Partial<IReturnIntention>) => void
}

export const useReturnIntentionStore = create<IReturnIntentionState>()(
  devtools(
    persist(
      (set) => ({
        returnIntention: {} as IReturnIntention,
        updateReturnIntention: (returnIntention) =>
          set((state) => ({
            returnIntention: { ...state.returnIntention, ...returnIntention }
          }))
      }),
      {
        name: 'return-intention-storage',
      }
    )
  )
)
