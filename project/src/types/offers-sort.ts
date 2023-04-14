export type SortProperty = 'popular'| 'lowToHigh' | 'highToLow' | 'rating';

export type SortItem = {
  sortName: string;
  sortProperty: SortProperty;
}
