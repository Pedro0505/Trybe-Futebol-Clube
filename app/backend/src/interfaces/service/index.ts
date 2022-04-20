interface IServiceReturnSuccess<U> {
  code: number;
  data: U,
}

interface IServiceReturnError {
  code: number;
  data: { message: string }
}

export { IServiceReturnSuccess, IServiceReturnError };
