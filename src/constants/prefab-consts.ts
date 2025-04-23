import { Product, Store, User } from "../types/types";

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

export const defaultUser: User = {
    Användarnamn: '',
    LösenordHash: '',
    Roll: '',
    Email: '',
    Låst: false
}
