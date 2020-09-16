import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      white: colors.common.white,
      default: colors.common.white,
      paper: colors.common.white,
    },
    primary: {
      main: colors.green[500],
    },
    secondary: {
      main: colors.green[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows,
  typography,
});

export default theme;
