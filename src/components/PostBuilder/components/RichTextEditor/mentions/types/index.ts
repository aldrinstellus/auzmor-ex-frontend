export interface IMention {
  index: string;
  denotationChar: string;
  id: string;
  value: string;
}

export interface IInsertOp {
  insert: string | { mention: IMention };
}

export interface ITransformedOp {
  insert: string | { hashtag: IMention };
}

export interface IQuillDelta {
  ops: IInsertOp[];
}

export interface TransformedQuillDelta {
  ops: ITransformedOp[];
}
