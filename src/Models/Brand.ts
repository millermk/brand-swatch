export type hexColor = string;

export interface Brand {
    id: string;
    name: string;
    description: string;
    colors: hexColor[];
    brandingSite?: string;
}