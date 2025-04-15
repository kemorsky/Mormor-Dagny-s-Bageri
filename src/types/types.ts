export type User = {
    AnvändareId?: number;
    Användarnamn?: string;
    LösenordHash?: string;
    Roll?: number | string;
    Email?: string;
    Låst?: boolean;
}

export type RegisterUser = {
    Användarnamn: string;
    Lösenord: string;
    Roll: number | string;
    Email: string;
    Låst: boolean;
}

export enum Role {
    Admin = 0,
    Säljare = 1,
    Planerare = 2
};

export type UserLogin = {
    Användarnamn: string;
    LösenordHash: string;
    Roll: string;
}

export type Store = {
    ButikId?: number;
    ButikNummer: string;
    ButikNamn: string;
    Besöksadress: string;
    BrödansvarigNamn: string;
    BrödansvarigTelefon: string;
    ButikschefNamn: string;
    ButikschefTelefon: string;
    Fakturaadress: string;
    Låst: boolean;
    Telefonnummer: string;
};

export type Product = {
    ProduktId?: number;
    Namn?: string;
    Baspris?: number;
    isDeleted?: boolean;
};

export type Order = {
    BeställningId?: number,
    ButikId?: number,
    Beställningsdatum: string,
    Beställare: string,
    PreliminärtLeveransdatum: string,
    Beställningsdetaljer: OrderDetails[],
    Säljare: string,
    Butik?: Store
};

export type OrderDetails = {
    BeställningsdetaljId?: number,
    BeställningId?: number,
    ProduktId: number,
    Antal: number,
    Styckpris: number,
    Totalltpris: number,
    Rabatt: number,
    TotalltBeställningpris: number,
    Produkt?: Product,  
};