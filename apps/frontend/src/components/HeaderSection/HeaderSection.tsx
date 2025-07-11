import Box from '@/ui/Box/Box.tsx';
import Button from '@/ui/Button/Button.tsx';
import Typography from '@/ui/Typography/Typography.tsx';
import Add from '@mui/icons-material/Add';
import Delete from '@mui/icons-material/Delete';

const HeaderSection = ({ isSelectMode, onToggleSelectMode, onOpenModal }) => (
  <Box display="flex" justifyContent="space-between" mb={3}>
    <Typography variant="h4" data-testid="tracks-header">
      Music Tracks
    </Typography>
    <Box display="flex" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={onOpenModal}
        data-testid="create-track-button"
      >
        Create Track
      </Button>
      <Button
        variant="outlined"
        startIcon={<Delete />}
        onClick={onToggleSelectMode}
        data-testid="select-mode-toggle"
      >
        {isSelectMode ? 'Cancel' : 'Select'}
      </Button>
    </Box>
  </Box>
);

export default HeaderSection;
