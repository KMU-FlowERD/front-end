import axios from 'axios';

import type {
  GetDuplicateEmailRequestDTO,
  GetDuplicateEmailResponseDTO,
  GetEmailVerificationRequestDTO,
  GetLogoutResponseDTO,
  GetReissueTokenResponseDTO,
  PostCheckEmailVerificationRequestDTO,
  PostCheckEmailVerificationResponseDTO,
  PostLoginRequestDTO,
  PostLoginResponseDTO,
  PostRegisterMemberRequestDTO,
  PostRegisterMemberResponseDTO,
} from './auth.dto';

export const getDuplicateEmail = ({ email }: GetDuplicateEmailRequestDTO) =>
  axios.get<GetDuplicateEmailResponseDTO>(`/api/duplicate/email/${email}`).then((res) => res.data);

export const getEmailVerification = ({ email }: GetEmailVerificationRequestDTO) =>
  axios.get(`/api/send/email/${email}`).then((res) => res.data);

export const postCheckEmailVerification = ({ email, uuid }: PostCheckEmailVerificationRequestDTO) =>
  axios.post<PostCheckEmailVerificationResponseDTO>(`/api/check/mail`, { email, uuid }).then((res) => res.data);

export const postRegisterMember = ({ email, password, name }: PostRegisterMemberRequestDTO) =>
  axios
    .post<PostRegisterMemberResponseDTO>(`/api/register/member/local`, { email, password, name })
    .then((res) => res.data);

export const getReissueToken = () => axios.get<GetReissueTokenResponseDTO>('/api/reissue').then((res) => res.data);

export const postLogin = ({ email, password }: PostLoginRequestDTO) =>
  axios.post<PostLoginResponseDTO>('/api/login', { email, password }).then((res) => res.data);

export const getLogout = () => axios.get<GetLogoutResponseDTO>('/api/logout').then((res) => res.data);
