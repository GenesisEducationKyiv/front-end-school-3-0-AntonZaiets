import { SelectChangeEvent } from '@mui/material';
import { FilterType } from '../../../stores/types.ts';
import { TFetchTracksResponse } from '../../../types/types.ts';

export interface FiltersSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sort: string;
  onSortChange: (value: SelectChangeEvent) => void;
  filter: Record<string, string>;
  onFilterChange: (type: FilterType, value: string) => void;
  genres: string[];
  tracksData?: TFetchTracksResponse;
}
