interface ErrorType extends Error {
  code?: string;
}

const getMessage = (code: string, message: string) => {
  // error code resolution from db or default message
  return message || "Server cannot process your request this time";
};

export class ErrorHandler {
  static translate({ message, code }: ErrorType) {
    const derviedMessage = getMessage(code || "default", message);
    throw new Error(derviedMessage);
  }
}
