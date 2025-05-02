export interface ThemeType {
    
    backgroundColor: string;
    textColor: string;
    headerBg: string;
    headerTextColor: string;
    footerBg: string;
    footerTextColor: string;
    mobileMenuBg: string;
    mobileMenuTextColor: string;
    borderColor: string;
    selectionBg: string;
    selectionText: string;
    cardBg: string;
    linkHoverColor: string;

    layout: {

        headerHeight: {
            desktop: number;
            mobile: number;
        };

        footerHeight: {
            desktop: number;
            mobile: number;
        }
    };
}

export const lightTheme: ThemeType = {
    backgroundColor: '#f9fafb',
    textColor: '#212529',
    headerBg: '#ffffff',
    headerTextColor: '#212529',
    footerBg: '#ffffff',
    footerTextColor: '#212529',
    mobileMenuBg: '#e8f1fa',
    mobileMenuTextColor: '#1565c0',
    borderColor: '#e0e0e0',
    selectionBg: '#bcdffb',
    selectionText: '#1c1c1c',
    cardBg: 'fff',
    linkHoverColor: '#0d6efd',

    layout: {
        headerHeight: {
            desktop: 80,
            mobile: 64,
        },
        footerHeight: {
            desktop: 24,
            mobile: 16,
        },
    },
};

export const darkTheme: ThemeType = {
    backgroundColor: '#121212',
    textColor: '#e0e0e0',
    headerBg: '#1f1f1f',
    headerTextColor: '#f1f1f1',
    footerBg: '#1f1f1f',
    footerTextColor: '#f1f1f1',
    mobileMenuBg: '#0a192f',
    mobileMenuTextColor: '#ffffff',
    borderColor: '#2c2c2c',
    selectionBg: '#3b6ea5',
    selectionText: '#ffffff',
    cardBg: '#1e1e1e',
    linkHoverColor: '#4dabf7',

    layout: {
        headerHeight: {
            desktop: 80,
            mobile: 64,
        },
        footerHeight: {
            desktop: 24,
            mobile: 16,
        },
    },
};
