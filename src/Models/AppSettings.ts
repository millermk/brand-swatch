export enum greyVisibility {
    NONE = 'none',
    BELOW = 'below',
    INTEGRATED = 'integrated'
}

export enum colorCodeVisibility {
    ALWAYS = 'always',
    HOVER = 'hover'
}

export interface AppSettings {
    greyVisibility: greyVisibility;
    colorCodeVisibility: colorCodeVisibility;
}