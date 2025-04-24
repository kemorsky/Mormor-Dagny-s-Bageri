export type User = {
    AnvändareId?: number;
    Användarnamn?: string;
    LösenordHash?: string;
    Roll?: number | string;
    Email?: string;
    Låst?: boolean;
}

export type ForgotPassword = {
    Id?: number,
    Username: string,
    Token: string,
    Expiration?: string,
    CreatedAt?: string,
};

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
};

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
    Beställningsdatum?: string,
    Beställare?: string,
    PreliminärtLeveransdatum?: string,
    Beställningsdetaljer: OrderDetails[],
    Säljare?: string,
    Butik?: Store
};

export type PaginatedOrders = {
    TotalItems: number;
    Page: number;
    PageSize: number;
    TotalPages: number;
    Data: Order[];  
};

export type OrderDetails = {
    BeställningsdetaljId?: number,
    BeställningId?: number,
    ProduktId: number,
    Antal: number,
    Styckpris: number,
    Rabatt: number,
    Produkt?: Product,  
};

export type ProductStats = {
    ProduktId: number;
    ProduktNamn: string;
    TotalAntal: number;
};

export type StoreStats = {
    ButikId: number;
    ButikNamn: string;
    TotalOrders: number;
};

export type DashboardStats = {
    TotalOrders: number;
    TotalRevenue: number;
    MostOrderedProducts: ProductStats[];
    OrdersByStore: StoreStats[];
  }