import { OrderDetails, Product, Store, RegisterUser, User } from "../types/types";

export const defaultStore: Store = {
    ButikNummer: '',
    ButikNamn: '',
    Besöksadress: '',
    BrödansvarigNamn: '',
    BrödansvarigTelefon: '',
    ButikschefNamn: '',
    ButikschefTelefon: '',
    Fakturaadress: '',
    Låst: false,
    Telefonnummer: ''
};

export const defaultProduct: Product = {
    Namn: '',
    Baspris: undefined,
};

export const defaultUser: RegisterUser = {
    Användarnamn: '',
    Lösenord: '',
    Roll: '',
    Email: '',
    Låst: false
}

export const defaultDetail: OrderDetails = {
    ProduktId: 0,
    Antal: 0,
    Styckpris: 0,
    Rabatt: 0
}
