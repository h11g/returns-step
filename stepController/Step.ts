import { IOrder, IReturn, IReturnIntention } from "@/types";

export interface IReturnStep {
  name: string;
  setNext(step: IReturnStep): IReturnStep | null;

  process(): Promise<void>;

  shouldSkip(): Promise<boolean>;

  validate(): Promise<boolean>;

  onSkip(): void;

  onEnd(): void;
}

export interface ReturnStepConfig {
  name: string;
  onStepStart: () => void;
  onStepSkip?: () => void;
  onStepEnd?: () => void;
}

export class ReturnStep implements IReturnStep {
  name: string;
  onStepStart: () => void;
  onStepSkip?: () => void;
  onStepEnd?: () => void;

  private nextStep: IReturnStep | null = null;

  constructor({ name, onStepStart, onStepSkip, onStepEnd }: ReturnStepConfig) {
    this.name = name;
    this.onStepStart = onStepStart;
    this.onStepSkip = onStepSkip;
    this.onStepEnd = onStepEnd;
  }

  setNext(step: IReturnStep) {
    this.nextStep = step;
    return step;
  }

  shouldSkip(): Promise<boolean> {
    console.log('%c [ shouldSkip ]', 'font-size:13px; background:pink; color:#bf2c9f;', this.constructor.name)
    return Promise.resolve(false);
  }

  validate(): Promise<boolean> {
    console.log('%c [ validate ]', 'font-size:13px; background:pink; color:#bf2c9f;', this.constructor.name)
    return Promise.resolve(true);
  }

  public async process() {
    console.log('%c [ process ]', 'font-size:13px; background:pink; color:#bf2c9f;', this.constructor.name)
    this.onStepStart();
  }

  public onSkip() {
    this.onStepSkip?.()
    this.onEnd()
  }

  public onEnd() {
    this.onStepEnd?.()
  }
}
