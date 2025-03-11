export interface SchoolResult {
    result: { id: number; name: string; tenancyName: string; isActive: boolean }[];
    targetUrl: string | null;
    success: boolean;
    error: any;
    unAuthorizedRequest: boolean;
    __abp: boolean;
  }
  