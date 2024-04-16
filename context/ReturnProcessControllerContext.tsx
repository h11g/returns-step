import React, { createContext, useContext, useMemo, useRef } from 'react'
import StepController from '../stepController/StepController'
import { useOrderLookupStepInstance } from '@/hooks/useOrderLookupStepInstance'
import { useReturnListStepInstance } from '@/hooks/useReturnListStepInstance'
import { useReturnResolutionStepInstance } from '@/hooks/useReturnResolutionStepInstance'
import { useItmeSelectionStepInstance } from '@/hooks/useItemSelectionStepInstance'

export interface ReturnProcessControllerContextProps {
  goNextStep: () => Promise<void>
}

export const ReturnProcessControllerContext = createContext<ReturnProcessControllerContextProps | null>(null)

export default function ReturnProcessControllerProvider({ children }: { children: React.ReactNode }) {
  const processControllerRef = useRef<StepController | null>(null)

  const orderLookupStepInstantce = useOrderLookupStepInstance()
  const itemSelectionStepInstance = useItmeSelectionStepInstance()
  const returnListStepInstance = useReturnListStepInstance()
  const returnResolutionStepInstance = useReturnResolutionStepInstance()

  if(processControllerRef.current === null) {
    processControllerRef.current = new StepController([
      orderLookupStepInstantce,
      returnListStepInstance,
      itemSelectionStepInstance,
      returnResolutionStepInstance
    ])
  }

  const ctxValue: ReturnProcessControllerContextProps = useMemo(() => {
    return {
      goNextStep: async () => {
        await processControllerRef.current?.processNextStep()
      }
    }
  }, [])

  console.log('%c [ processController ]', 'font-size:13px; background:pink; color:#bf2c9f;', processControllerRef.current.currentStep.name)

  return (
    <ReturnProcessControllerContext.Provider value={ctxValue}>
      {children}
    </ReturnProcessControllerContext.Provider>
  )
}


export function useReturnProcessController() {
  const context = useContext(ReturnProcessControllerContext)
  if (!context) {
    throw new Error('useReturnProcessController must be used within a ReturnProcessControllerProvider')
  }
  return context
}
