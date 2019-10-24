export enum EAnswer {
  HETIC = 1,
  EEMI = 2,
}

export default interface IQuestion {
  text: string;
  answer: EAnswer;
}
