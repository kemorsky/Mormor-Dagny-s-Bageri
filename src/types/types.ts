export type Store = {
    ButikId: number;
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
    ProduktId: number;
    Namn: string;
    Baspris: string;
};

export type OrderDetails = {
    BeställningsdetaljId: number,
    BeställningId: number,
    ProduktId: number,
    Antal: number,
    Styckpris: number,
    Rabatt: number,
    Produkt: Product[]
}

export type Order = {
    BeställningId: number,
    ButikId: number,
    Beställningsdatum: string,
    Beställare: string,
    Säljare: string,
    PreliminärtLeveransdatum: string,
    Beställningsdetaljer: OrderDetails[],
    Butik: Store[]
};