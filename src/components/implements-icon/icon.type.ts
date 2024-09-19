// 식별 1:1, 1:n, m,n, 비식별 1:1, 1:n, m,n
export type IconType =
  | 'IdentifyOneToOne'
  | 'IdentifyOneToMany'
  | 'IdentifyManyToMany'
  | 'NonIdentifyOneToOne'
  | 'NonIdentifyOneToMany'
  | 'NonIdentifyManyToMany';
