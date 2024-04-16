import { IReturnResolution } from "@/types";
import { ReturnStep, ReturnStepConfig } from "./Step";

export interface ReturnResolutionStepConstructorProps extends ReturnStepConfig {
  dataHooks: {
    resolutionProvider: () => Promise<IReturnResolution[]>;
  },
}

export class ReturnResolutionStep extends ReturnStep {
  dataHooks: ReturnResolutionStepConstructorProps['dataHooks']

  constructor({ dataHooks, ...rest}: ReturnResolutionStepConstructorProps) {
    super(rest);
    this.dataHooks = dataHooks;
  }

  // public process() {
  //   return Promise.resolve();
  // }
}
