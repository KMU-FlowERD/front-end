// 식별 1:1, 1:n, m,n, 비식별 1:1, 1:n, m,n
export type MappingType =
  | 'IdentifyOneToOne'
  | 'IdentifyOneToMany'
  | 'IdentifyManyToMany'
  | 'NonIdentifyOneToOne'
  | 'NonIdentifyOneToMany'
  | 'NonIdentifyManyToMany'
  | 'none';
