import Box from '@/ui/Box/Box.tsx';
import FormControl from '@/ui/FormControl/FormControl.tsx';
import InputLabel from '@/ui/InputLabel/InputLabel.tsx';
import Select from '@/ui/Select/Select.tsx';
import MenuItem from '@/ui/MenuItem/MenuItem.tsx';
import { SelectChangeEvent } from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';
import { MENU_ITEMS } from './constants/menuItems.ts';
import { FiltersSectionProps } from './Interface';

const FiltersSection = ({
  searchTerm,
  onSearchChange,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  genres,
  tracksData,
}: FiltersSectionProps) => {
  const uniqueArtists =
    tracksData?.tracks && tracksData.tracks.length > 0
      ? [...new Set(tracksData.tracks.map((t) => t.artist))]
      : [];

  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      <SearchBar
        value={searchTerm}
        onChange={onSearchChange}
        data-testid="search-input"
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sort}
          onChange={onSortChange}
          label="Sort By"
          data-testid="sort-select"
        >
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.value}
              value={item.value}
              data-testid={item.testId}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          value={filter.genre || 'All'}
          onChange={(e: SelectChangeEvent) =>
            onFilterChange('genre', e.target.value)
          }
          label="Genre"
          data-testid="filter-genre"
        >
          <MenuItem value="All">All</MenuItem>
          {genres?.map((genre: string) => (
            <MenuItem
              key={genre}
              value={genre}
              data-testid={`genre-option-${genre}`}
            >
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="artist-select-label">Artist</InputLabel>
        <Select
          labelId="artist-select-label"
          value={filter.artist || 'All'}
          onChange={(e: SelectChangeEvent) =>
            onFilterChange('artist', e.target.value)
          }
          label="Artist"
          data-testid="filter-artist"
        >
          <MenuItem value="All" data-testid="artist-option-all">
            All
          </MenuItem>
          {uniqueArtists.map((artist: string) => (
            <MenuItem
              key={artist}
              value={artist}
              data-testid={`artist-option-${artist}`}
            >
              {artist}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersSection;
