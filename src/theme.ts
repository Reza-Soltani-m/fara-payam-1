import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    direction: 'rtl',

    palette: {
        mode: 'light',
        primary: {
            main: '#2563eb', // blue-600
        },
        secondary: {
            main: '#7c3aed', // violet-600
        },

        background: {
            default: '#f8fafc', // slate-50
            paper: '#ffffff',
        },
        text: {
            primary: '#0f172a', // slate-900
            secondary: '#475569', // slate-600
        },
        divider: '#e2e8f0',
    },

    typography: {
        fontFamily: `"Vazirmatn", "IRANSans", "Roboto", sans-serif`,
        fontSize: 14,

        h6: {
            fontWeight: 700,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },

    components: {
        // 🔹 Table container
        MuiPaper: {
            styleOverrides: {
                root: {
                    // borderRadius: 14,
                },
            },
        },

        // 🔹 Table cells
        MuiTableCell: {
            styleOverrides: {
                body: {
                    textAlign: 'right',
                    justifyContent: 'flex-end',
                },
                head: {
                    fontWeight: 700,
                    color: '#fff',
                    backgroundColor: '#673ab7 !important',
                },
            },
        },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:nth-of-type(even)': {
                        backgroundColor: '#fff !important',
                    },
                    '&:nth-of-type(odd)': {
                        backgroundColor: '#ccc !important',
                    },
                    justifyContent: 'flex-end !important',
                },
                head: {
                    fontWeight: 700,
                    color: '#0f172a',
                    backgroundColor: 'red !important',
                },
            },
        },

        // 🔹 Buttons
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    '&:focus, &:focus-visible': {
                        outline: 0,
                        boxShadow: 'none',
                    },
                },
                containedSecondary: ({ theme }) => ({
                    backgroundColor: '#fff',
                    color: theme.palette.primary.main,
                }),
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: 0,
                    lineHeight: 1.1,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: 0,
                },
            },
        },

        // 🔹 Text fields (filters)
        MuiTextField: {
            defaultProps: {
                size: 'small',
                variant: 'outlined',
            },
        },

        // MuiOutlinedInput: {
        //   styleOverrides: {
        //     input: {
        //       padding: '4px 14px', // تغییر padding پیش‌فرض
        //     },
        //   },
        // },

        // MuiInputLabel: {
        //   styleOverrides: {
        //     root: {
        //       lineHeight: '1em',
        //     },
        //   },
        // },

        // 🔹 Icons
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#475569',
                },
            },
        },
    },
});
