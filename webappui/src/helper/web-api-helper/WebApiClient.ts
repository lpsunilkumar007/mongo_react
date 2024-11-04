//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v14.1.0.0 (NJsonSchema v11.0.2.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

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

export interface IClient {

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: UserRegisterDTO | undefined): Promise<string>;

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body: UserLoginDTO | undefined): Promise<string>;

    /**
     * @param body (optional) 
     * @return Success
     */
    employeePOST(body: EmployeeDTO | undefined): Promise<Employee>;

    /**
     * @return Success
     */
    employeeAll(): Promise<Employee[]>;

    /**
     * @return Success
     */
    employeeGET(id: string): Promise<Employee>;

    /**
     * @param body (optional) 
     * @return Success
     */
    employeePUT(id: string, body: Employee | undefined): Promise<string>;

    /**
     * @return Success
     */
    employeeDELETE(id: string): Promise<string>;
}

export class Client extends BaseClass implements IClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        super();
        this.http = http ? http : window as any;
        this.baseUrl = this.getBaseUrl("", baseUrl);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    register(body: UserRegisterDTO | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/Auth/register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processRegister(_response);
        });
    }

    protected processRegister(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    login(body: UserLoginDTO | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/Auth/login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    employeePOST(body: EmployeeDTO | undefined): Promise<Employee> {
        let url_ = this.baseUrl + "/api/Employee";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processEmployeePOST(_response);
        });
    }

    protected processEmployeePOST(response: Response): Promise<Employee> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Employee.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Employee>(null as any);
    }

    /**
     * @return Success
     */
    employeeAll(): Promise<Employee[]> {
        let url_ = this.baseUrl + "/api/Employee";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processEmployeeAll(_response);
        });
    }

    protected processEmployeeAll(response: Response): Promise<Employee[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            if (Array.isArray(resultData200)) {
                result200 = [] as any;
                for (let item of resultData200)
                    result200!.push(Employee.fromJS(item));
            }
            else {
                result200 = <any>null;
            }
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Employee[]>(null as any);
    }

    /**
     * @return Success
     */
    employeeGET(id: string): Promise<Employee> {
        let url_ = this.baseUrl + "/api/Employee/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processEmployeeGET(_response);
        });
    }

    protected processEmployeeGET(response: Response): Promise<Employee> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = Employee.fromJS(resultData200);
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<Employee>(null as any);
    }

    /**
     * @param body (optional) 
     * @return Success
     */
    employeePUT(id: string, body: Employee | undefined): Promise<string> {
        let url_ = this.baseUrl + "/api/Employee/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processEmployeePUT(_response);
        });
    }

    protected processEmployeePUT(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }

    /**
     * @return Success
     */
    employeeDELETE(id: string): Promise<string> {
        let url_ = this.baseUrl + "/api/Employee/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Accept": "text/plain"
            }
        };

        return this.transformOptions(options_).then(transformedOptions_ => {
            return this.http.fetch(url_, transformedOptions_);
        }).then((_response: Response) => {
            return this.processEmployeeDELETE(_response);
        });
    }

    protected processEmployeeDELETE(response: Response): Promise<string> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<string>(null as any);
    }
}

export class Employee implements IEmployee {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    lastSalary?: string | undefined;
    dateOfJoining?: Date;
    dob?: Date;

    constructor(data?: IEmployee) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
            this.lastSalary = _data["lastSalary"];
            this.dateOfJoining = _data["dateOfJoining"] ? new Date(_data["dateOfJoining"].toString()) : <any>undefined;
            this.dob = _data["dob"] ? new Date(_data["dob"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): Employee {
        data = typeof data === 'object' ? data : {};
        let result = new Employee();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        data["lastSalary"] = this.lastSalary;
        data["dateOfJoining"] = this.dateOfJoining ? this.dateOfJoining.toISOString() : <any>undefined;
        data["dob"] = this.dob ? this.dob.toISOString() : <any>undefined;
        return data;
    }
}

export interface IEmployee {
    id?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    lastSalary?: string | undefined;
    dateOfJoining?: Date;
    dob?: Date;
}

export class EmployeeDTO implements IEmployeeDTO {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    lastSalary?: string | undefined;
    dateOfJoining?: Date;
    dob?: Date;

    constructor(data?: IEmployeeDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.email = _data["email"];
            this.lastSalary = _data["lastSalary"];
            this.dateOfJoining = _data["dateOfJoining"] ? new Date(_data["dateOfJoining"].toString()) : <any>undefined;
            this.dob = _data["dob"] ? new Date(_data["dob"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): EmployeeDTO {
        data = typeof data === 'object' ? data : {};
        let result = new EmployeeDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["email"] = this.email;
        data["lastSalary"] = this.lastSalary;
        data["dateOfJoining"] = this.dateOfJoining ? this.dateOfJoining.toISOString() : <any>undefined;
        data["dob"] = this.dob ? this.dob.toISOString() : <any>undefined;
        return data;
    }
}

export interface IEmployeeDTO {
    firstName?: string | undefined;
    lastName?: string | undefined;
    email?: string | undefined;
    lastSalary?: string | undefined;
    dateOfJoining?: Date;
    dob?: Date;
}

export class UserLoginDTO implements IUserLoginDTO {
    email!: string;
    password!: string;

    constructor(data?: IUserLoginDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): UserLoginDTO {
        data = typeof data === 'object' ? data : {};
        let result = new UserLoginDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}

export interface IUserLoginDTO {
    email: string;
    password: string;
}

export class UserRegisterDTO implements IUserRegisterDTO {
    name!: string;
    email!: string;
    password!: string;

    constructor(data?: IUserRegisterDTO) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.name = _data["name"];
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): UserRegisterDTO {
        data = typeof data === 'object' ? data : {};
        let result = new UserRegisterDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["name"] = this.name;
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }
}

export interface IUserRegisterDTO {
    name: string;
    email: string;
    password: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-extra-semi */
  
/* eslint-disable prefer-const */
 
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