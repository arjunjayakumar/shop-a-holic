// API_METHODS
export enum REQUEST_METHOD {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
  MULTIPART = "MULTIPART",
}
// CONTENT_TYPE
export enum CONTENT_TYPE {
  APPLICATION_JSON = "application/json",
}

// HEADERS
export const HTTP_HEADERS = {
  "Content-Type": CONTENT_TYPE.APPLICATION_JSON,
  Accept: CONTENT_TYPE.APPLICATION_JSON,
};

export const API_STATUS = {
  SUCCESS: "SUCCESS",
  PENDING: "PENDING",
  FAILED: "FAILED",
  IDLE: "IDLE",
};