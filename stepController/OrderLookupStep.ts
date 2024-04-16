import { IOrder } from "@/types";
import { ReturnStep, ReturnStepConfig } from "./Step";

export interface OrderLookupStep {
  orderProvider: () => Promise<IOrder>;
}

export interface OrderLookupStepConstructorProps extends ReturnStepConfig {
  dataHooks: OrderLookupStep,
}

export class ReturnOrderLookupStep extends ReturnStep {
  private dataHooks: OrderLookupStepConstructorProps['dataHooks']

  constructor({ dataHooks, ...rest }: OrderLookupStepConstructorProps) {
    super(rest);
    this.dataHooks = dataHooks;
  }
  // public async process() {}
}
