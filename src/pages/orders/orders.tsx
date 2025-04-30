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
import { formatDate } from "../../lib/formatDate";

export default function OrdersPage() {
  const { upcoming, previous } = useFilteredOrders();
  const [activeTab, setActiveTab] = useState("ongoing");

  const navigate = useNavigate();

  const orders = activeTab === "ongoing" ? upcoming : previous;

  return (
    <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4 pt-12">
      <Menu />
      <div className="flex pt-10">
        <ButtonTab
          isActive={activeTab === "ongoing"}
          onClick={() => setActiveTab("ongoing")}
          className="rounded-l-xl"
        >
          Pågående
        </ButtonTab>
        <ButtonTab
          isActive={activeTab === "delivered"}
          onClick={() => setActiveTab("delivered")}
          className="rounded-r-xl"
        >
          Levererade
        </ButtonTab>
      </div>
      <div className="mt-6 ">
        {orders.map((order) => (
          <Card
            key={order.BeställningId}
            className="w-[23.75rem] h-[5.313rem] rounded-xl bg-Branding-cardPrimary flex justify-center relative mb-4"
            onClick={() => navigate(`/order/${order.BeställningId}`)}
          >
            <CardDate className="absolute right-4 top-2 text-sm">
            {order.PreliminärtLeveransdatum &&
    formatDate(order.PreliminärtLeveransdatum)}
            </CardDate>
            <CardHeader>
              <CardStore className="text-lg font-normal">
                {order.Butik?.ButikNamn}
              </CardStore>
              <CardAddress className="text-Branding-textPrimary text-sm">
                {order.Butik?.Besöksadress}
              </CardAddress>
              <CardClientName className="text-sm">
                {order.Butik?.ButikschefNamn} {order.Butik?.ButikschefTelefon}
              </CardClientName>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
