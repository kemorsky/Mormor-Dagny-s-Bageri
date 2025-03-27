import { useState } from "react";
import {
  Card,
  CardDate,
  CardHeader,
  CardStore,
  CardAddress,
  CardClientName,
} from "../../blocks/card";
import data from "../../../customers.json";
import Menu from "../../elements/menu/menu";
import { ButtonTab } from "../../components/ui/button";

type Address = {
  street: string;
  city: string;
};

type Customer = {
  date: string;
  name: string;
  address: Address;
  contactPerson: string;
  customerNumber: number;
  active: boolean;
};

export default function OrdersPage() {
  const currentOrders: Customer[] = data.customers.filter((c) => c.active);
  const previousOrders: Customer[] = data.previousOrders.filter((c) => !c.active);
  const [activeTab, setActiveTab] = useState("ongoing");

  const orders = activeTab === "ongoing" ? currentOrders : previousOrders;

  return (
    <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
      <Menu />
      <div>
        <ButtonTab
          isActive={activeTab === "ongoing"}
          onClick={() => setActiveTab("ongoing")}
          className="rounded-l-lg"
        >
          Pågående
        </ButtonTab>
        <ButtonTab
          isActive={activeTab === "delivered"}
          onClick={() => setActiveTab("delivered")}
          className="rounded-r-lg"
        >
          Levererade
        </ButtonTab>
      </div>

      {orders.map((customer) => (
        <Card
          key={customer.customerNumber}
          className=" w-[400px] h-[100px] p-4 mt-6 rounded-lg "
        >
          <CardDate>{customer.date}</CardDate>
          <CardHeader>
            <CardStore>{customer.name}</CardStore>
            <CardAddress>
              {customer.address.street}, {customer.address.city}
            </CardAddress>
            <CardClientName>
              {customer.contactPerson} {customer.customerNumber}
            </CardClientName>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
}