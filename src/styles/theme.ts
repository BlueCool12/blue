export interface ThemeType {

    bgColor: string;
    contrastBgColor: string;
    textColor: string;
    contrastTextColor: string;
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
    btnBg: string;
    btnColor: string;
    codeBg: string;
    codeColor: string;
    btnHoverColor: string;
    linkHoverColor: string;

    themeColor1: string;
    themeColor2: string;
    themeColor3: string;
    themeColor4: string;
    themeColor5: string;
    themeColor6: string;
    themeColor7: string;
    themeColor8: string;
    themeColor9: string;

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
    bgColor: '#f8f9fa',
    contrastBgColor: '#212529',
    textColor: '#212529',
    contrastTextColor: '#f8f9fa',
    headerBg: '#ffffff',
    headerTextColor: '#212529',
    footerBg: '#ffffff',
    footerTextColor: '#212529',
    mobileMenuBg: '#e8f1fa',
    mobileMenuTextColor: '#1565c0',
    borderColor: '#e0e0e0',
    selectionBg: '#AEE1F9',
    selectionText: '#0D1B2A',
    cardBg: '#ffffff',
    btnBg: '#0D1B2A',
    btnColor: '#ffffff',
    codeBg: '#f5f5f5',
    codeColor: '#222',    
    btnHoverColor: '#13293D',
    linkHoverColor: '#0d6efd',

    themeColor1: '#E6F7FB',
    themeColor2: '#D2F0F8',
    themeColor3: '#BEE9F4',
    themeColor4: '#A9E2F0',
    themeColor5: '#8BD0E8',
    themeColor6: '#6DBEDC',
    themeColor7: '#4FACC8',
    themeColor8: '#328AA3',
    themeColor9: '#145B6F',

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
    bgColor: '#121212',
    contrastBgColor: '#121212',
    textColor: '#e0e0e0',
    contrastTextColor: '#e0e0e0',
    headerBg: '#1f1f1f',
    headerTextColor: '#f1f1f1',
    footerBg: '#1f1f1f',
    footerTextColor: '#f1f1f1',
    mobileMenuBg: '#0a192f',
    mobileMenuTextColor: '#ffffff',
    borderColor: '#2c2c2c',
    selectionBg: '#2DAEEA',
    selectionText: '#ffffff',
    cardBg: '#1e1e1e',
    btnBg: '#0D1B2A',
    btnColor: '#EDEDED',
    codeBg: '#1e1e1e',
    codeColor: '#eee',
    btnHoverColor: '#13293D',
    linkHoverColor: '#4dabf7',

    themeColor1: '#E6F7FB',
    themeColor2: '#D2F0F8',
    themeColor3: '#BEE9F4',
    themeColor4: '#A9E2F0',
    themeColor5: '#8BD0E8',
    themeColor6: '#6DBEDC',
    themeColor7: '#4FACC8',
    themeColor8: '#328AA3',
    themeColor9: '#145B6F',

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
