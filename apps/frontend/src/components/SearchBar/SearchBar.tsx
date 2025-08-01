import TextField from '@/ui/TextField/TextField.tsx';
import { ISearchBar } from './Interface';

const SearchBar = ({ value, onChange }: ISearchBar) => {
  return (
    <TextField
      fullWidth
      label="Search tracks..."
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-testid="search-input"
    />
  );
};

export default SearchBar;
