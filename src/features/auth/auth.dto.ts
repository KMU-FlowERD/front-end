export interface GetDuplicateEmailRequestDTO {
  email: string;
}

export interface GetDuplicateEmailResponseDTO {
  status: string;
  data: boolean;
  message: string;
}

export interface GetEmailVerificationRequestDTO {
  email: string;
}

export interface PostCheckEmailVerificationRequestDTO {
  email: string;
  uuid: string;
}

export interface PostCheckEmailVerificationResponseDTO {
  status: string;
  data: boolean;
  message: string;
}

export interface PostRegisterMemberRequestDTO {
  email: string;
  password: string;
  name: string;
}

export interface PostRegisterMemberResponseDTO {
  status: string;
  data: string;
  message: string;
}

export interface PostLoginRequestDTO {
  email: string;
  password: string;
}

export interface PostLoginResponseDTO {
  status: string;
  data: string;
  message: string;
}

export interface GetReissueTokenResponseDTO {
  status: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface GetLogoutResponseDTO {
  status: string;
  data: string;
  message: string;
}
