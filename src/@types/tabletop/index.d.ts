declare module 'tabletop' {
    interface element {
        [key: string]: any;
    }
    
    function init (options: {
       key: string,
       callback: (data: any, tabletop: {}) => void,
       simpleSheet?: boolean,
       parseNumbers?: boolean,
       orderby?: string,
       reverse?: boolean,
       postProcess?: (e: element) => void,
       wanted?: string[],
       endpoint?: string,
       singleton?: boolean,
       proxy?: string,
       wait?: boolean,
       debug?: boolean,
       parameterize?: boolean,
       callbackContext?: object,
       prettyColumnNames?: boolean
    }): void;
}