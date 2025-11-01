import type { FieldErrors } from "@/lib/errors";

interface MockApiErrorOptions {
  status?: number;
  fieldErrors?: FieldErrors;
}

export class MockApiError extends Error {
  status?: number;
  fieldErrors?: FieldErrors;

  constructor(message: string, options: MockApiErrorOptions = {}) {
    super(message);
    this.name = "MockApiError";
    this.status = options.status;
    this.fieldErrors = options.fieldErrors;
  }
}
