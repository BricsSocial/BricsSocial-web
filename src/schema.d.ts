import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        export interface AgentDto {
            id?: number; // int32
            email?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            position?: string | null;
            photo?: string | null;
            companyId?: number; // int32
        }
        export interface CompanyDto {
            id?: number; // int32
            name?: string | null;
            description?: string | null;
            logo?: string | null;
            countryId?: number; // int32
        }
        export interface CountryDto {
            id?: number; // int32
            name?: string | null;
        }
        export interface CreateAgentCommand {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
            position: string;
            companyId: number; // int32
        }
        export interface CreateCompanyCommand {
            name: string;
            description: string;
            logo?: string | null;
            countryId: number; // int32
        }
        export interface CreateSpecialistCommand {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            countryId: number; // int32
        }
        export interface CreateSpecialistReplyCommand {
            specialistId: number; // int32
            vacancyId: number; // int32
        }
        export interface CreateVacancyCommand {
            name: string;
            requirements: string;
            offerings: string;
            skillTags?: string | null;
        }
        export interface CreateVacancyReplyCommand {
            vacancyId: number; // int32
        }
        export interface CurrentUserDto {
            email?: string | null;
            role?: string | null;
        }
        export interface GetSpecialistRepliesQuery {
            pageNumber?: number; // int32
            pageSize?: number; // int32
            companyId?: null | number; // int32
            vacancyId?: null | number; // int32
            status?: /* 0 = Pending, 1 = Approved, 2 = Rejected */ ReplyStatus /* int32 */;
            type?: /* 0 = Specialist, 1 = Vacancy */ ReplyType /* int32 */;
        }
        export interface GetSpecialistsQuery {
            pageNumber?: number; // int32
            pageSize?: number; // int32
            countryId?: null | number; // int32
            skillTags?: string | null;
        }
        export interface GetVacanciesQuery {
            pageNumber?: number; // int32
            pageSize?: number; // int32
            countryId?: null | number; // int32
            companyId?: null | number; // int32
            status?: /* 0 = Closed, 1 = Open */ VacancyStatus /* int32 */;
            skillTags?: string | null;
        }
        export interface GetVacancyRepliesQuery {
            pageNumber?: number; // int32
            pageSize?: number; // int32
            byAgent?: boolean | null;
            vacancyId?: null | number; // int32
            status?: /* 0 = Pending, 1 = Approved, 2 = Rejected */ ReplyStatus /* int32 */;
            type?: /* 0 = Specialist, 1 = Vacancy */ ReplyType /* int32 */;
        }
        export interface LoginCommand {
            email: string;
            password: string;
        }
        export interface PaginatedListAgentDto {
            items?: AgentDto[] | null;
            pageNumber?: number; // int32
            totalPages?: number; // int32
            totalCount?: number; // int32
            hasPreviousPage?: boolean;
            hasNextPage?: boolean;
        }
        export interface PaginatedListCompanyDto {
            items?: CompanyDto[] | null;
            pageNumber?: number; // int32
            totalPages?: number; // int32
            totalCount?: number; // int32
            hasPreviousPage?: boolean;
            hasNextPage?: boolean;
        }
        export interface PaginatedListReplyDto {
            items?: ReplyDto[] | null;
            pageNumber?: number; // int32
            totalPages?: number; // int32
            totalCount?: number; // int32
            hasPreviousPage?: boolean;
            hasNextPage?: boolean;
        }
        export interface PaginatedListSpecialistDto {
            items?: SpecialistDto[] | null;
            pageNumber?: number; // int32
            totalPages?: number; // int32
            totalCount?: number; // int32
            hasPreviousPage?: boolean;
            hasNextPage?: boolean;
        }
        export interface PaginatedListVacancyDto {
            items?: VacancyDto[] | null;
            pageNumber?: number; // int32
            totalPages?: number; // int32
            totalCount?: number; // int32
            hasPreviousPage?: boolean;
            hasNextPage?: boolean;
        }
        export interface ProblemDetails {
            [name: string]: any;
            type?: string | null;
            title?: string | null;
            status?: null | number; // int32
            detail?: string | null;
            instance?: string | null;
        }
        export interface ReplyDto {
            agentId?: null | number; // int32
            agent?: AgentDto;
            specialistId?: null | number; // int32
            specialist?: SpecialistDto;
            vacancyId?: null | number; // int32
            vacancy?: VacancyDto;
            status?: /* 0 = Pending, 1 = Approved, 2 = Rejected */ ReplyStatus /* int32 */;
            type?: /* 0 = Specialist, 1 = Vacancy */ ReplyType /* int32 */;
        }
        /**
         * 0 = Pending, 1 = Approved, 2 = Rejected
         */
        export type ReplyStatus = 0 | 1 | 2; // int32
        /**
         * 0 = Specialist, 1 = Vacancy
         */
        export type ReplyType = 0 | 1; // int32
        export interface SpecialistDto {
            id?: number; // int32
            email?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            bio?: string | null;
            about?: string | null;
            skillTags?: string | null;
            photo?: string | null;
            countryId?: number; // int32
        }
        export interface TokenResponse {
            token?: string | null;
        }
        export interface UpdateAgentCommand {
            id: number; // int32
            firstName?: string | null;
            lastName?: string | null;
            position?: string | null;
            photo?: string | null;
        }
        export interface UpdateCompanyCommand {
            id: number; // int32
            name?: string | null;
            description?: string | null;
            logo?: string | null;
        }
        export interface UpdateSpecialistCommand {
            id: number; // int32
            firstName?: string | null;
            lastName?: string | null;
            bio?: string | null;
            about?: string | null;
            skillTags?: string | null;
            photo?: string | null;
        }
        export interface UpdateSpecialistReplyCommand {
            id: number; // int32
            status: /* 0 = Pending, 1 = Approved, 2 = Rejected */ ReplyStatus /* int32 */;
        }
        export interface UpdateVacancyCommand {
            id: number; // int32
            name?: string | null;
            requirements?: string | null;
            offerings?: string | null;
            status?: /* 0 = Closed, 1 = Open */ VacancyStatus /* int32 */;
            skillTags?: string | null;
        }
        export interface UpdateVacancyReplyCommand {
            id: number; // int32
            status: /* 0 = Pending, 1 = Approved, 2 = Rejected */ ReplyStatus /* int32 */;
        }
        export interface VacancyDto {
            id?: number; // int32
            name?: string | null;
            requirements?: string | null;
            offerings?: string | null;
            status?: /* 0 = Closed, 1 = Open */ VacancyStatus /* int32 */;
            skillTags?: string | null;
            companyId?: number; // int32
        }
        /**
         * 0 = Closed, 1 = Open
         */
        export type VacancyStatus = 0 | 1; // int32
    }
}
declare namespace Paths {
    namespace AgentsCreate {
        export type RequestBody = Components.Schemas.CreateAgentCommand;
        namespace Responses {
            export type $201 = Components.Schemas.AgentDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AgentsDelete {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AgentsGet {
        namespace Parameters {
            export type CompanyId = number; // int32
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
        }
        export interface QueryParameters {
            CompanyId?: Parameters.CompanyId /* int32 */;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListAgentDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AgentsGetById {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.AgentDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AgentsGetCurrent {
        namespace Responses {
            export type $200 = Components.Schemas.AgentDto;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AgentsUpdate {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateAgentCommand;
        namespace Responses {
            export type $200 = Components.Schemas.AgentDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AuthCurrent {
        namespace Responses {
            export type $200 = Components.Schemas.CurrentUserDto;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace AuthLogin {
        export type RequestBody = Components.Schemas.LoginCommand;
        namespace Responses {
            export type $200 = Components.Schemas.TokenResponse;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CompaniesCreate {
        export type RequestBody = Components.Schemas.CreateCompanyCommand;
        namespace Responses {
            export type $201 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CompaniesDelete {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CompaniesGet {
        namespace Parameters {
            export type CountryId = number; // int32
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
        }
        export interface QueryParameters {
            CountryId?: Parameters.CountryId /* int32 */;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListCompanyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CompaniesGetById {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CompaniesUpdate {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateCompanyCommand;
        namespace Responses {
            export type $200 = Components.Schemas.CompanyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace CountriesGet {
        namespace Responses {
            export type $200 = Components.Schemas.CountryDto[];
            export interface $500 {
            }
        }
    }
    namespace SpecialistsCreate {
        export type RequestBody = Components.Schemas.CreateSpecialistCommand;
        namespace Responses {
            export type $201 = Components.Schemas.SpecialistDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsCreateReply {
        export type RequestBody = Components.Schemas.CreateSpecialistReplyCommand;
        namespace Responses {
            export type $201 = Components.Schemas.ReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsDelete {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsGet {
        namespace Parameters {
            export type CountryId = null | number; // int32
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
            export type SkillTags = string | null;
        }
        export interface QueryParameters {
            CountryId?: Parameters.CountryId /* int32 */;
            SkillTags?: Parameters.SkillTags;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListSpecialistDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsGetById {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.SpecialistDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsGetCurrent {
        namespace Responses {
            export type $200 = Components.Schemas.SpecialistDto;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsGetReplies {
        namespace Parameters {
            export type CompanyId = null | number; // int32
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
            export type Status = /* 0 = Pending, 1 = Approved, 2 = Rejected */ Components.Schemas.ReplyStatus /* int32 */;
            export type Type = /* 0 = Specialist, 1 = Vacancy */ Components.Schemas.ReplyType /* int32 */;
            export type VacancyId = null | number; // int32
        }
        export interface QueryParameters {
            CompanyId?: Parameters.CompanyId /* int32 */;
            VacancyId?: Parameters.VacancyId /* int32 */;
            Status?: Parameters.Status;
            Type?: Parameters.Type;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsUpdate {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateSpecialistCommand;
        namespace Responses {
            export type $200 = Components.Schemas.SpecialistDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace SpecialistsUpdateReply {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateSpecialistReplyCommand;
        namespace Responses {
            export type $200 = Components.Schemas.ReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesCreate {
        export type RequestBody = Components.Schemas.CreateVacancyCommand;
        namespace Responses {
            export type $201 = Components.Schemas.VacancyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesCreateReply {
        export type RequestBody = Components.Schemas.CreateVacancyReplyCommand;
        namespace Responses {
            export type $201 = Components.Schemas.ReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesDelete {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesGet {
        namespace Parameters {
            export type CompanyId = null | number; // int32
            export type CountryId = null | number; // int32
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
            export type SkillTags = string | null;
            export type Status = /* 0 = Closed, 1 = Open */ Components.Schemas.VacancyStatus /* int32 */;
        }
        export interface QueryParameters {
            CountryId?: Parameters.CountryId /* int32 */;
            CompanyId?: Parameters.CompanyId /* int32 */;
            Status?: Parameters.Status;
            SkillTags?: Parameters.SkillTags;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListVacancyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesGetById {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.VacancyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesGetReplies {
        namespace Parameters {
            export type ByAgent = boolean | null;
            export type PageNumber = number; // int32
            export type PageSize = number; // int32
            export type Status = /* 0 = Pending, 1 = Approved, 2 = Rejected */ Components.Schemas.ReplyStatus /* int32 */;
            export type Type = /* 0 = Specialist, 1 = Vacancy */ Components.Schemas.ReplyType /* int32 */;
            export type VacancyId = null | number; // int32
        }
        export interface QueryParameters {
            ByAgent?: Parameters.ByAgent;
            VacancyId?: Parameters.VacancyId /* int32 */;
            Status?: Parameters.Status;
            Type?: Parameters.Type;
            PageNumber?: Parameters.PageNumber /* int32 */;
            PageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export type $200 = Components.Schemas.PaginatedListReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesUpdate {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateVacancyCommand;
        namespace Responses {
            export type $200 = Components.Schemas.VacancyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export type $404 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
    namespace VacanciesUpdateReply {
        namespace Parameters {
            export type Id = number; // int32
        }
        export interface PathParameters {
            id: Parameters.Id /* int32 */;
        }
        export type RequestBody = Components.Schemas.UpdateVacancyReplyCommand;
        namespace Responses {
            export type $200 = Components.Schemas.ReplyDto;
            export type $400 = Components.Schemas.ProblemDetails;
            export type $401 = Components.Schemas.ProblemDetails;
            export type $403 = Components.Schemas.ProblemDetails;
            export interface $500 {
            }
        }
    }
}

export interface OperationMethods {
  /**
   * AgentsGet
   */
  'AgentsGet'(
    parameters?: Parameters<Paths.AgentsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsGet.Responses.$200>
  /**
   * AgentsCreate -  (Auth roles: Administrator)
   */
  'AgentsCreate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AgentsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsCreate.Responses.$201>
  /**
   * AgentsGetById
   */
  'AgentsGetById'(
    parameters?: Parameters<Paths.AgentsGetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsGetById.Responses.$200>
  /**
   * AgentsUpdate -  (Auth roles: Agent)
   */
  'AgentsUpdate'(
    parameters?: Parameters<Paths.AgentsUpdate.PathParameters> | null,
    data?: Paths.AgentsUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsUpdate.Responses.$200>
  /**
   * AgentsDelete -  (Auth roles: Administrator, Agent)
   */
  'AgentsDelete'(
    parameters?: Parameters<Paths.AgentsDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsDelete.Responses.$204>
  /**
   * AgentsGetCurrent -  (Auth roles: Agent)
   */
  'AgentsGetCurrent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AgentsGetCurrent.Responses.$200>
  /**
   * AuthLogin
   */
  'AuthLogin'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthLogin.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthLogin.Responses.$200>
  /**
   * AuthCurrent -  (Auth roles: Administrator, Agent, Specialist)
   */
  'AuthCurrent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthCurrent.Responses.$200>
  /**
   * CompaniesGet
   */
  'CompaniesGet'(
    parameters?: Parameters<Paths.CompaniesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompaniesGet.Responses.$200>
  /**
   * CompaniesCreate -  (Auth roles: Administrator)
   */
  'CompaniesCreate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CompaniesCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompaniesCreate.Responses.$201>
  /**
   * CompaniesGetById
   */
  'CompaniesGetById'(
    parameters?: Parameters<Paths.CompaniesGetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompaniesGetById.Responses.$200>
  /**
   * CompaniesUpdate -  (Auth roles: Agent)
   */
  'CompaniesUpdate'(
    parameters?: Parameters<Paths.CompaniesUpdate.PathParameters> | null,
    data?: Paths.CompaniesUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompaniesUpdate.Responses.$200>
  /**
   * CompaniesDelete -  (Auth roles: Administrator)
   */
  'CompaniesDelete'(
    parameters?: Parameters<Paths.CompaniesDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CompaniesDelete.Responses.$204>
  /**
   * CountriesGet
   */
  'CountriesGet'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CountriesGet.Responses.$200>
  /**
   * SpecialistsGet
   */
  'SpecialistsGet'(
    parameters?: Parameters<Paths.SpecialistsGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsGet.Responses.$200>
  /**
   * SpecialistsCreate
   */
  'SpecialistsCreate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SpecialistsCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsCreate.Responses.$201>
  /**
   * SpecialistsGetById
   */
  'SpecialistsGetById'(
    parameters?: Parameters<Paths.SpecialistsGetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsGetById.Responses.$200>
  /**
   * SpecialistsUpdate -  (Auth roles: Specialist)
   */
  'SpecialistsUpdate'(
    parameters?: Parameters<Paths.SpecialistsUpdate.PathParameters> | null,
    data?: Paths.SpecialistsUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsUpdate.Responses.$200>
  /**
   * SpecialistsDelete -  (Auth roles: Administrator, Specialist)
   */
  'SpecialistsDelete'(
    parameters?: Parameters<Paths.SpecialistsDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsDelete.Responses.$204>
  /**
   * SpecialistsGetCurrent -  (Auth roles: Specialist)
   */
  'SpecialistsGetCurrent'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsGetCurrent.Responses.$200>
  /**
   * SpecialistsGetReplies -  (Auth roles: Specialist)
   */
  'SpecialistsGetReplies'(
    parameters?: Parameters<Paths.SpecialistsGetReplies.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsGetReplies.Responses.$200>
  /**
   * SpecialistsCreateReply -  (Auth roles: Agent)
   */
  'SpecialistsCreateReply'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.SpecialistsCreateReply.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsCreateReply.Responses.$201>
  /**
   * SpecialistsUpdateReply -  (Auth roles: Specialist)
   */
  'SpecialistsUpdateReply'(
    parameters?: Parameters<Paths.SpecialistsUpdateReply.PathParameters> | null,
    data?: Paths.SpecialistsUpdateReply.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.SpecialistsUpdateReply.Responses.$200>
  /**
   * VacanciesGet
   */
  'VacanciesGet'(
    parameters?: Parameters<Paths.VacanciesGet.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesGet.Responses.$200>
  /**
   * VacanciesCreate -  (Auth roles: Agent)
   */
  'VacanciesCreate'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VacanciesCreate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesCreate.Responses.$201>
  /**
   * VacanciesGetById
   */
  'VacanciesGetById'(
    parameters?: Parameters<Paths.VacanciesGetById.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesGetById.Responses.$200>
  /**
   * VacanciesUpdate -  (Auth roles: Agent)
   */
  'VacanciesUpdate'(
    parameters?: Parameters<Paths.VacanciesUpdate.PathParameters> | null,
    data?: Paths.VacanciesUpdate.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesUpdate.Responses.$200>
  /**
   * VacanciesDelete -  (Auth roles: Administrator, Agent)
   */
  'VacanciesDelete'(
    parameters?: Parameters<Paths.VacanciesDelete.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesDelete.Responses.$204>
  /**
   * VacanciesGetReplies -  (Auth roles: Agent)
   */
  'VacanciesGetReplies'(
    parameters?: Parameters<Paths.VacanciesGetReplies.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesGetReplies.Responses.$200>
  /**
   * VacanciesCreateReply -  (Auth roles: Specialist)
   */
  'VacanciesCreateReply'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.VacanciesCreateReply.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesCreateReply.Responses.$201>
  /**
   * VacanciesUpdateReply -  (Auth roles: Agent)
   */
  'VacanciesUpdateReply'(
    parameters?: Parameters<Paths.VacanciesUpdateReply.PathParameters> | null,
    data?: Paths.VacanciesUpdateReply.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.VacanciesUpdateReply.Responses.$200>
}

export interface PathsDictionary {
  ['/api/agents']: {
    /**
     * AgentsGet
     */
    'get'(
      parameters?: Parameters<Paths.AgentsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsGet.Responses.$200>
    /**
     * AgentsCreate -  (Auth roles: Administrator)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AgentsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsCreate.Responses.$201>
  }
  ['/api/agents/{id}']: {
    /**
     * AgentsGetById
     */
    'get'(
      parameters?: Parameters<Paths.AgentsGetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsGetById.Responses.$200>
    /**
     * AgentsUpdate -  (Auth roles: Agent)
     */
    'put'(
      parameters?: Parameters<Paths.AgentsUpdate.PathParameters> | null,
      data?: Paths.AgentsUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsUpdate.Responses.$200>
    /**
     * AgentsDelete -  (Auth roles: Administrator, Agent)
     */
    'delete'(
      parameters?: Parameters<Paths.AgentsDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsDelete.Responses.$204>
  }
  ['/api/agents/current']: {
    /**
     * AgentsGetCurrent -  (Auth roles: Agent)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AgentsGetCurrent.Responses.$200>
  }
  ['/api/auth/login']: {
    /**
     * AuthLogin
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthLogin.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthLogin.Responses.$200>
  }
  ['/api/auth/current']: {
    /**
     * AuthCurrent -  (Auth roles: Administrator, Agent, Specialist)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthCurrent.Responses.$200>
  }
  ['/api/companies']: {
    /**
     * CompaniesGet
     */
    'get'(
      parameters?: Parameters<Paths.CompaniesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompaniesGet.Responses.$200>
    /**
     * CompaniesCreate -  (Auth roles: Administrator)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CompaniesCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompaniesCreate.Responses.$201>
  }
  ['/api/companies/{id}']: {
    /**
     * CompaniesGetById
     */
    'get'(
      parameters?: Parameters<Paths.CompaniesGetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompaniesGetById.Responses.$200>
    /**
     * CompaniesUpdate -  (Auth roles: Agent)
     */
    'put'(
      parameters?: Parameters<Paths.CompaniesUpdate.PathParameters> | null,
      data?: Paths.CompaniesUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompaniesUpdate.Responses.$200>
    /**
     * CompaniesDelete -  (Auth roles: Administrator)
     */
    'delete'(
      parameters?: Parameters<Paths.CompaniesDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CompaniesDelete.Responses.$204>
  }
  ['/api/countries']: {
    /**
     * CountriesGet
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CountriesGet.Responses.$200>
  }
  ['/api/specialists']: {
    /**
     * SpecialistsGet
     */
    'get'(
      parameters?: Parameters<Paths.SpecialistsGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsGet.Responses.$200>
    /**
     * SpecialistsCreate
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SpecialistsCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsCreate.Responses.$201>
  }
  ['/api/specialists/{id}']: {
    /**
     * SpecialistsGetById
     */
    'get'(
      parameters?: Parameters<Paths.SpecialistsGetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsGetById.Responses.$200>
    /**
     * SpecialistsUpdate -  (Auth roles: Specialist)
     */
    'put'(
      parameters?: Parameters<Paths.SpecialistsUpdate.PathParameters> | null,
      data?: Paths.SpecialistsUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsUpdate.Responses.$200>
    /**
     * SpecialistsDelete -  (Auth roles: Administrator, Specialist)
     */
    'delete'(
      parameters?: Parameters<Paths.SpecialistsDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsDelete.Responses.$204>
  }
  ['/api/specialists/current']: {
    /**
     * SpecialistsGetCurrent -  (Auth roles: Specialist)
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsGetCurrent.Responses.$200>
  }
  ['/api/specialists/replies']: {
    /**
     * SpecialistsCreateReply -  (Auth roles: Agent)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.SpecialistsCreateReply.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsCreateReply.Responses.$201>
    /**
     * SpecialistsGetReplies -  (Auth roles: Specialist)
     */
    'get'(
      parameters?: Parameters<Paths.SpecialistsGetReplies.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsGetReplies.Responses.$200>
  }
  ['/api/specialists/replies/{id}']: {
    /**
     * SpecialistsUpdateReply -  (Auth roles: Specialist)
     */
    'put'(
      parameters?: Parameters<Paths.SpecialistsUpdateReply.PathParameters> | null,
      data?: Paths.SpecialistsUpdateReply.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.SpecialistsUpdateReply.Responses.$200>
  }
  ['/api/vacancies']: {
    /**
     * VacanciesGet
     */
    'get'(
      parameters?: Parameters<Paths.VacanciesGet.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesGet.Responses.$200>
    /**
     * VacanciesCreate -  (Auth roles: Agent)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VacanciesCreate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesCreate.Responses.$201>
  }
  ['/api/vacancies/{id}']: {
    /**
     * VacanciesGetById
     */
    'get'(
      parameters?: Parameters<Paths.VacanciesGetById.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesGetById.Responses.$200>
    /**
     * VacanciesUpdate -  (Auth roles: Agent)
     */
    'put'(
      parameters?: Parameters<Paths.VacanciesUpdate.PathParameters> | null,
      data?: Paths.VacanciesUpdate.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesUpdate.Responses.$200>
    /**
     * VacanciesDelete -  (Auth roles: Administrator, Agent)
     */
    'delete'(
      parameters?: Parameters<Paths.VacanciesDelete.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesDelete.Responses.$204>
  }
  ['/api/vacancies/replies']: {
    /**
     * VacanciesCreateReply -  (Auth roles: Specialist)
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.VacanciesCreateReply.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesCreateReply.Responses.$201>
    /**
     * VacanciesGetReplies -  (Auth roles: Agent)
     */
    'get'(
      parameters?: Parameters<Paths.VacanciesGetReplies.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesGetReplies.Responses.$200>
  }
  ['/api/vacancies/replies/{id}']: {
    /**
     * VacanciesUpdateReply -  (Auth roles: Agent)
     */
    'put'(
      parameters?: Parameters<Paths.VacanciesUpdateReply.PathParameters> | null,
      data?: Paths.VacanciesUpdateReply.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.VacanciesUpdateReply.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
