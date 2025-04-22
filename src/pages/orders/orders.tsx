import { useState } from "react";
import {
  Card,
  CardDate,
  CardHeader,
  CardStore,
  CardAddress,
  CardClientName,
} from "../../blocks/card";
import Menu from "../../elements/menu/menu";
import { ButtonTab } from "../../components/ui/button";
import { useFilteredOrders } from "../../hooks/useFilteredOrders";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const {upcoming, previous} = useFilteredOrders()
  const [activeTab, setActiveTab] = useState("ongoing");

  const navigate = useNavigate();

  const orders = activeTab === "ongoing" ? upcoming : previous;

  return (
    <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
      <Menu />
      <div className="">
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
      {orders.map((order) => (
        <Card
          key={order.BeställningId}
          className=" w-[400px] h-[100px] p-4 mt-6 rounded-lg"
          onClick={() => navigate(`/order/${order.BeställningId}`)}
        >
          <CardDate></CardDate>
          <CardHeader>
            <CardStore>{order.Butik?.ButikNamn}</CardStore>
            <CardAddress>{order.Butik?.Besöksadress}</CardAddress>
            <CardClientName>
              {order.Butik?.ButikschefNamn} {order.Butik?.ButikschefTelefon}
            </CardClientName>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
}
