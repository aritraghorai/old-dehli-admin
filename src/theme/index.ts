import { SxProps, createTheme } from '@mui/material/styles'
import { checkboxClasses } from '@mui/material'
import { PALETTE } from './themeConstant'
declare module '@mui/material/styles' {
  interface PaletteColorOptions {
    main: string
    '50': string
    '75': string
    '100': string
    '200': string
    '300': string
    '400': string
    Default: string
  }
  interface TypeText {
    highEmphasis?: string
    mediumEmphasis?: string
    lowEmphasis?: string
    light?: string
    interactive?: string
  }

  interface Palette {
    successCustom: {
      main: string
      300: string
      500: string
    }
    warningCustom: {
      WARNING_300: string
      WARNING_500: string
    }
    alertCustom: {
      ALERT_300: string
      ALERT_500: string
    }
    progress: {
      PROGRESS_300: string
      PROGRESS_500: string
    }
    stroke: {
      STROKE_100: string
      STROKE_200: string
      STROKE_300: string
      STROKE_400: string
    }
    icon: {
      ICON_BLUE: string
      ICON_NAVY: string
      ICON_LIGHTGREY: string
      ICON_DARKGREY: string
    }
    avatar: {
      AVATAR_GREY: string
      AVATAR_ORANGE: string
      AVATAR_GREEN: string
      AVATAR_LIGHTBLUE: string
      AVATAR_BLUE: string
      AVATAR_PURPLE: string
      AVATAR_RED: string
      AVATAR_DARKBLUE: string
      AVATAR_LIGHT_GREEN: string
      AVATAR_PINK: string
    }
    structural: {
      STRUCTURAL_50: string
      STRUCTURAL_100: string
      STRUCTURAL_200: string
      STRUCTURAL_300: string
      STRUCTURAL_WHITE: string
      STRUCTURAL_THEME: string
      STRUCTURAL_TABLEHEADER: string
      STRUCTURAL_BACKGROUND: string
      STRUCTURAL_BORDER: string
    }
    heatMap: {
      HEATMAP_CELL_COLOR_1: string
      HEATMAP_CELL_COLOR_2: string
      HEATMAP_CELL_COLOR_3: string
      HEATMAP_CELL_COLOR_4: string
      HEATMAP_CELL_COLOR_5: string
      HEAT_MAP_ACTIVE_BACKGROUND: string
    }
  }

  interface PaletteOptions {
    successCustom: {
      main: string
      300: string
      500: string
    }
    warningCustom: {
      WARNING_300: string
      WARNING_500: string
    }
    alertCustom: {
      ALERT_300: string
      ALERT_500: string
    }
    progress: {
      PROGRESS_300: string
      PROGRESS_500: string
    }
    stroke: {
      STROKE_100: string
      STROKE_200: string
      STROKE_300: string
      STROKE_400: string
    }
    icon: {
      ICON_BLUE: string
      ICON_NAVY: string
      ICON_LIGHTGREY: string
      ICON_DARKGREY: string
    }
    avatar: {
      AVATAR_GREY: string
      AVATAR_ORANGE: string
      AVATAR_GREEN: string
      AVATAR_LIGHTBLUE: string
      AVATAR_BLUE: string
      AVATAR_PURPLE: string
      AVATAR_RED: string
      AVATAR_DARKBLUE: string
      AVATAR_LIGHT_GREEN: string
      AVATAR_PINK: string
    }
    structural: {
      STRUCTURAL_50: string
      STRUCTURAL_100: string
      STRUCTURAL_200: string
      STRUCTURAL_300: string
      STRUCTURAL_WHITE: string
      STRUCTURAL_THEME: string
      STRUCTURAL_TABLEHEADER: string
      STRUCTURAL_BACKGROUND: string
      STRUCTURAL_BORDER: string
    }
    heatMap: {
      HEATMAP_CELL_COLOR_1: string
      HEATMAP_CELL_COLOR_2: string
      HEATMAP_CELL_COLOR_3: string
      HEATMAP_CELL_COLOR_4: string
      HEATMAP_CELL_COLOR_5: string
      HEAT_MAP_ACTIVE_BACKGROUND: string
    }
  }

  interface PaletteColor {
    '50': string
    '75': string
    '100': string
    '200': string
    '300': string
    '400': string
    Default: string
  }

  interface TypographyVariants {
    heading1: SxProps
    heading2: SxProps
    heading3: SxProps
    subtitle1: SxProps
    subtitle2: SxProps
    body1: SxProps
    body2: SxProps
    caption1: SxProps
    caption2: SxProps
    overline1: SxProps
    overline2: SxProps
    tableheader: SxProps
  }

  interface TypographyVariantsOptions {
    heading1: SxProps
    heading2: SxProps
    heading3: SxProps
    subtitle1: SxProps
    subtitle2: SxProps
    body1: SxProps
    body2: SxProps
    caption1: SxProps
    caption2: SxProps
    overline1: SxProps
    overline2: SxProps
    tableheader: SxProps
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    heading1: true
    heading2: true
    heading3: true
    subtitle1: true
    subtitle2: true
    body1: true
    body2: true
    caption1: true
    caption2: true
    overline1: true
    overline2: true
    tableheader: true
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: PALETTE.PRIMARY_100,
      50: PALETTE.PRIMARY_50,
      75: PALETTE.PRIMARY_75,
      100: PALETTE.PRIMARY_100,
      200: PALETTE.PRIMARY_200,
      300: PALETTE.PRIMARY_300,
      400: PALETTE.PRIMARY_400,
      Default: PALETTE.DEFAULT,
    },
    grey: {
      '100': PALETTE.GREY_100,
      '200': PALETTE.GREY_200,
      '300': PALETTE.GREY_300,
      '400': PALETTE.GREY_400,
      '500': PALETTE.GREY_500,
      '600': PALETTE.GREY_600,
    },
    successCustom: {
      main: PALETTE.SUCCESS_300,
      '300': PALETTE.SUCCESS_300,
      '500': PALETTE.SUCCESS_500,
    },
    warningCustom: {
      WARNING_300: PALETTE.WARNING_300,
      WARNING_500: PALETTE.WARNING_500,
    },
    alertCustom: {
      ALERT_300: PALETTE.ALERT_300,
      ALERT_500: PALETTE.ALERT_500,
    },
    progress: {
      PROGRESS_300: PALETTE.PROGRESS_300,
      PROGRESS_500: PALETTE.PROGRESS_500,
    },
    stroke: {
      STROKE_100: PALETTE.STROKE_100,
      STROKE_200: PALETTE.STROKE_200,
      STROKE_300: PALETTE.STROKE_300,
      STROKE_400: PALETTE.STROKE_400,
    },
    icon: {
      ICON_BLUE: PALETTE.ICON_BLUE,
      ICON_NAVY: PALETTE.ICON_NAVY,
      ICON_LIGHTGREY: PALETTE.ICON_LIGHTGREY,
      ICON_DARKGREY: PALETTE.ICON_DARKGREY,
    },
    avatar: {
      AVATAR_GREY: PALETTE.AVATAR_GREY,
      AVATAR_ORANGE: PALETTE.AVATAR_ORANGE,
      AVATAR_GREEN: PALETTE.AVATAR_GREEN,
      AVATAR_LIGHTBLUE: PALETTE.AVATAR_LIGHTBLUE,
      AVATAR_BLUE: PALETTE.AVATAR_BLUE,
      AVATAR_PURPLE: PALETTE.AVATAR_PURPLE,
      AVATAR_RED: PALETTE.AVATAR_RED,
      AVATAR_DARKBLUE: PALETTE.AVATAR_LIGHTBLUE,
      AVATAR_LIGHT_GREEN: PALETTE.AVATAR_LIGHT_GREEN,
      AVATAR_PINK: PALETTE.AVATAR_PINK,
    },
    structural: {
      STRUCTURAL_50: PALETTE.STRUCTURAL_50,
      STRUCTURAL_100: PALETTE.STRUCTURAL_100,
      STRUCTURAL_200: PALETTE.STRUCTURAL_200,
      STRUCTURAL_300: PALETTE.STRUCTURAL_300,
      STRUCTURAL_WHITE: PALETTE.STRUCTURAL_WHITE,
      STRUCTURAL_THEME: PALETTE.STRUCTURAL_THEME,
      STRUCTURAL_TABLEHEADER: PALETTE.STRUCTURAL_TABLEHEADER,
      STRUCTURAL_BACKGROUND: PALETTE.STRUCTURAL_BACKGROUND,
      STRUCTURAL_BORDER: PALETTE.STRUCTURAL_BORDER,
    },
    text: {
      lowEmphasis: PALETTE.TEXT_LOW_EMPHASIS,
      mediumEmphasis: PALETTE.TEXT_MEDIUM_EMPHASIS,
      highEmphasis: PALETTE.TEXT_HIGH_EMPHASIS,
      light: PALETTE.TEXT_LIGHT,
      interactive: PALETTE.TEXT_INTERACTIVE,
    },
    heatMap: {
      HEATMAP_CELL_COLOR_1: PALETTE.HEATMAP_CELL_COLOR_1,
      HEATMAP_CELL_COLOR_2: PALETTE.HEATMAP_CELL_COLOR_2,
      HEATMAP_CELL_COLOR_3: PALETTE.HEATMAP_CELL_COLOR_3,
      HEATMAP_CELL_COLOR_4: PALETTE.HEATMAP_CELL_COLOR_4,
      HEATMAP_CELL_COLOR_5: PALETTE.HEATMAP_CELL_COLOR_5,
      HEAT_MAP_ACTIVE_BACKGROUND: PALETTE.HEAT_MAP_ACTIVE_BACKGROUND,
    },
  },

  typography: {
    fontFamily: ['Inter'].join(','),
    heading1: {
      fontSize: '28px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '36px',
      textTransform: 'none',
    },
    heading2: {
      fontSize: '24px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '32px',
      textTransform: 'none',
    },
    heading3: {
      fontSize: '20px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '30px',
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: '16px',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '24px',
      textTransform: 'none',
    },
    subtitle2: {
      fontSize: '14px',
      fontWeight: 500,
      fontStyle: 'normal',
      lineHeight: '22px',
      textTransform: 'none',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '24px',
      letterSpacing: '.16px',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '22px',
      textTransform: 'none',
    },
    caption1: {
      fontSize: '12px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '18px',
      textTransform: 'none',
    },
    caption2: {
      fontSize: '12px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '18px',
      textTransform: 'none',
    },
    overline1: {
      fontSize: '10px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '14px',
      textTransform: 'none',
    },
    overline2: {
      fontSize: '10px',
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: '14px',
      textTransform: 'none',
    },
    tableheader: {
      fontSize: '12px',
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: '18px',
      textTransform: 'uppercase',
    },
  },
  spacing: 4,
  components: {
    MuiChip: {
      styleOverrides: {
        label: {
          padding: 0,
        },
        outlined: {
          backgroundColor: PALETTE.STRUCTURAL_100,
          border: `1px solid ${PALETTE.STROKE_100}`,
          borderRadius: 4,
          padding: '2px 8px',
        },
        outlinedPrimary: {
          color: PALETTE.TEXT_HIGH_EMPHASIS,
        },
        filledPrimary: {
          backgroundColor: PALETTE.WARNING_300,
          borderRadius: 51,
          padding: '2px 8px',
        },
        colorPrimary: {
          color: PALETTE.WARNING_500,
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            '& .MuiOutlinedInput-root': {
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: '2px solid orange',
              },
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E6EEF0',
            },
            '& .MuiOutlinedInput-input': {
            },
          },
        },
      ],
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: '8px',
          marginTop: '4px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        focusRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: '4px',
          boxShadow: 'none',
          fontSize: '14px',
          fontWeight: 500,
          fontStyle: 'normal',
          lineHeight: '22px',
          textTransform: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          color: PALETTE.TEXT_LIGHT,
          backgroundColor: PALETTE.PRIMARY_100,
          '&:hover': {
            backgroundColor: PALETTE.PRIMARY_200,
          },
          '&:disabled': {
            backgroundColor: PALETTE.GREY_200,
            color: PALETTE.STRUCTURAL_WHITE,
          },
        },
        containedInfo: {
          color: PALETTE.TEXT_LIGHT,
          backgroundColor: PALETTE.PRIMARY_100,
          '&:hover': {
            backgroundColor: PALETTE.PRIMARY_200,
          },
          '&:disabled': {
            backgroundColor: PALETTE.PRIMARY_100,
            opacity: 0.4,
            color: PALETTE.STRUCTURAL_WHITE,
          },
        },
        containedSecondary: {
          color: PALETTE.PRIMARY_100,
          backgroundColor: PALETTE.PRIMARY_50,
          '&:hover': {
            backgroundColor: PALETTE.PRIMARY_50,
          },
          '&:disabled': {
            backgroundColor: PALETTE.STRUCTURAL_WHITE,
            color: PALETTE.GREY_200,
            border: `1px solid ${PALETTE.GREY_200}`,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 3,
        },
        colorPrimary: {
          backgroundColor: '#E4ECF7',
        },
        bar: {
          borderRadius: 3,
          backgroundColor: PALETTE.TEXT_INTERACTIVE,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'transparent',
            color: PALETTE.GREY_300,
          },
        },
        colorPrimary: {
          color: PALETTE.GREY_200,
          '&.Mui-checked': {
            color: PALETTE.STRUCTURAL_THEME,
          },
          [`&.${checkboxClasses.indeterminate}`]: {
            color: PALETTE.STRUCTURAL_THEME,
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          paddingLeft: '224px',
        },
      },
    },
  },
})

export default theme

