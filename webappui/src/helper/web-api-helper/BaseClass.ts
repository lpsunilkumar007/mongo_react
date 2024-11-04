/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-extra-semi */
  
/* eslint-disable prefer-const */
export class BaseClass {
  protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
    const User = sessionStorage.getItem('user_Info');
    let token = '';
    if (User) {
      const user = JSON.parse(User);
      token = user.token;
    }
 
 
 
    options.headers = {
      ...options.headers,
      Authorization: 'Bearer ' + token,
    };
    return Promise.resolve(options);
  };
 
 
  protected async handleResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = 'An error occurred hello';
 
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData?.message || errorMessage;
      } catch {
        errorMessage = errorText;
      }
 
      // Handle specific status codes
      if (response.status === 400) {
        throw new BadRequestException(errorMessage);
      } else if (response.status === 401) {
        throw new UnauthorizedException(errorMessage);
      }
      throw new Error(errorMessage);
    }
 
    return response;
  }
 
  protected async fetch(url: RequestInfo, init?: RequestInit): Promise<Response> {
    const options = await this.transformOptions(init || {});
    const response = await fetch(url, options);
    return this.handleResponse(response);
  }
 
  protected getBaseUrl(defaultBaseUrl: string, _providedBaseUrl?: string): string
  {
    debugger
  return import.meta.env.VITE_BASE_URL ?? defaultBaseUrl;
  };
}
 
// Custom exception classes for specific error types
class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestException';
  }
}
 
class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}
 