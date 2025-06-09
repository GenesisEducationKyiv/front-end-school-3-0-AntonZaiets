import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import SearchBar from '../SearchBar/SearchBar';

const FiltersSection = ({
  searchTerm,
  onSearchChange,
  sort,
  onSortChange,
  filter,
  onFilterChange,
  genres,
  tracksData,
}) => {
  const menuItems = [
    { label: 'Title', value: 'title', testId: 'sort-option-title' },
    { label: 'Artist', value: 'artist', testId: 'sort-option-artist' },
    { label: 'Album', value: 'album', testId: 'sort-option-album' },
  ];
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
          {menuItems.map((item) => (
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
          {genres?.map((genre) => (
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
          {[...new Set(tracksData?.tracks.map((t) => t.artist))].map(
            (artist) => (
              <MenuItem
                key={artist}
                value={artist}
                data-testid={`artist-option-${artist}`}
              >
                {artist}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FiltersSection;
