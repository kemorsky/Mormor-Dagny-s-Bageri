import { Card, CardDate, CardHeader, CardStore, CardAddress, CardFooter, CardClientName, CardClientNumber } from "../../blocks/card"
import customersData from '../../../customers.json';

type Address = {
    street: string;
    postalCode: string;
    city: string;
}

type Customer = {
    date: string;
    address: Address;
    name: string;
    contactPerson: string;
    customerNumber: number;
    active: boolean;
}


export default function DashBoard() {
    const customers: Customer[] = customersData.customers;

    return (
        <main className="min-h-[59.75rem] w-full bg-gradient-primary inline-flex flex-col items-center justify-start pt-[3.125rem]">
            <div className="w-[25.5rem] inline-flex flex-col items-center justify-start gap-6">
                <section className="h-11">icons</section>
                <h1 className="font-open-sans font-bold text-[2rem] leading-[2.75rem] text-Branding-textAccent">Välkommen, Michael!</h1>
                <div className="w-full inline-flex flex-col items-end justify-center gap-3">
                    <div className="w-full inline-flex flex-col items-center justify-center gap-3">
                        <article className="w-[380px] flex items-center justify-between">
                            <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">Dina pågående beställningar</p>
                            <button>Se alla</button>
                        </article>
                        <div className="inline-flex items-center justify-center gap-3 py-2">
                            {customers.map((customer) => (
                                <Card key={customer.customerNumber}>
                                <CardDate>{customer.date}</CardDate>
                                <CardHeader>
                                    <CardStore>{customer.name}</CardStore>
                                    <CardAddress>
                                        {customer.address.street} {customer.address.postalCode} {customer.address.city}
                                    </CardAddress>
                                </CardHeader>
                                <CardFooter>
                                    <CardClientName>{customer.contactPerson}</CardClientName>
                                    <CardClientNumber>{customer.customerNumber}</CardClientNumber>
                                </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <button>Skapa ny beställning</button>
                </div>
                <div className="w-full inline-flex flex-col items-center justify-center gap-3">
                    <article className="w-[380px] flex items-center justify-between">
                        <p className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textPrimary">Dina tidigare beställningar</p>
                        <button>Se alla</button>
                    </article>
                    <div className="inline-flex items-center justify-center gap-3 py-2">
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </main>
    )
};