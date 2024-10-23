export interface IResError {
  statusCode?: number;
  success: boolean;
  message?: string;
  errorSources?: {
    path?: string;
    message?: string;
  }[];
  err?: {
    statusCode?: number;
  };
  stack?: string;
}
