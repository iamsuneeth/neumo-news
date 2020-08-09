import { ErrorHandler } from "./error_handler";

describe("Tests for error handler", () => {
  it("should throw default error if no message provided", () => {
    try {
      ErrorHandler.translate({ message: "", name: "random Error" });
    } catch (error) {
      expect(error.message).toBe(
        "Server cannot process your request this time"
      );
    }
  });

  it("should throw error with custom message provided", () => {
    const message = "Test error message";
    try {
      ErrorHandler.translate({ message: message, name: "random Error" });
    } catch (error) {
      expect(error.message).toBe(message);
    }
  });
});
