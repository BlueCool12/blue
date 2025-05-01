export interface ThemeType {
    backgroundColor: string;
    textColor: string;
    headerBg: string;
    headerTextColor: string;
    mobileMenuBg: string;
    mobileMenuTextColor: string;
    borderColor: string;
    selectionBg: string;
    selectionText: string;
    linkHoverColor: string;
    layout: {
        headerHeight: {
            mobile: number;
            desktop: number;
        };
    };
}

export const lightTheme: ThemeType = {
    backgroundColor: '#f9fafb',
    textColor: '#212529',
    headerBg: '#ffffff',
    headerTextColor: '#212529',
    mobileMenuBg: '#e8f1fa',
    mobileMenuTextColor: '#1565c0',
    borderColor: '#e0e0e0',
    selectionBg: '#bcdffb',
    selectionText: '#1c1c1c',
    linkHoverColor: '#0d6efd',

    layout: {
        headerHeight: {
            mobile: 64,
            desktop: 80,
        },
    },
};

export const darkTheme: ThemeType = {
    backgroundColor: '#121212',
    textColor: '#e0e0e0',
    headerBg: '#1f1f1f',
    headerTextColor: '#f1f1f1',
    mobileMenuBg: '#0a192f',
    mobileMenuTextColor: '#ffffff',
    borderColor: '#2c2c2c',
    selectionBg: '#3b6ea5',
    selectionText: '#ffffff',
    linkHoverColor: '#4dabf7',

    layout: {
        headerHeight: {
            mobile: 64,
            desktop: 80,
        },
    },
};
