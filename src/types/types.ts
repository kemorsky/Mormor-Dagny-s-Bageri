export type Store = {
    butikId: number;
    butikNummer: string;
    butikNamn: string;
    besöksadress: string;
    brödansvarigNamn: string;
    brödansvarigTelefon: string;
    butikschefNamn: string;
    butikschefTelefon: string;
    fakturaadress: string;
    låst: boolean;
    telefonnummer: string;
};

export type Product = {
    produktId: number;
    namn: string;
    baspris: string;
};