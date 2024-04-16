import { ReturnOrderLookupStep } from "@/stepController/OrderLookupStep";
import { useReturnIntentionStore } from "@/store";
import { getOrder } from "@/utils";
import { useRef } from "react";

export function useOrderLookupStepInstance() {
  const orderLookupStepInstanceRef = useRef<ReturnOrderLookupStep | null>()

  const {orderNumber, email} =  useReturnIntentionStore(({ returnIntention }) =>
  ({ orderNumber: returnIntention.orderNumber, email: returnIntention.email }))

  const fetchOrder = () => {
    return getOrder({orderNumber, email})
 }


  if(!orderLookupStepInstanceRef.current) {
    orderLookupStepInstanceRef.current = new ReturnOrderLookupStep({
      name: 'OrderLookupStep',
      dataHooks: {
        orderProvider: fetchOrder,
      },
      onStepStart: () => {
        console.log('OrderLookupStep started')
      },
      onStepSkip: () => {
        console.log('OrderLookupStep skipped')
      },
      onStepEnd: () => {
        console.log('OrderLookupStep ended')
      }
    })
  }

  return orderLookupStepInstanceRef.current
}
