import { useEffect, useState } from "react";
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
// import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5139/api";

type Store = {
  ButikId: number;
  ButikNummer: string;
  ButikNamn: string;
  Telefonnummer: number;
  Besöksadress: string;
  Fakturaadress: string;
  ButikschefNamn: string;
  ButikschefTelefon: string;
  BrödansvarigNamn: string;
  Brödansvarigtelefon: number;
  låst: boolean;
};

type Order = {
  Butik: Store;
};

export default function OrdersPage() {
  const [stores, setStores] = useState<Store[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${BASE_URL}/beställningar`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Fel vid hämtning av beställningar:", response.status);
          return;
        }

        const result = await response.json();
        const orders: Order[] = result.Data;

        const store = new Map<number, Store>();
        orders.forEach((order: Order) => {
          const butik = order.Butik;
          if (!store.has(butik.ButikId)) {
            store.set(butik.ButikId, butik);
          }
        });

        const storeOrder = [...store.values()];

        setStores(storeOrder as Store[]);
      } catch (error) {
        console.error("Något gick fel", error);
      }
    };

    fetchStoreOrders();
  }, []);

  const currentOrders = stores.filter((store) => !store.låst);
  const previousOrders = stores.filter((store) => store.låst);
  const [activeTab, setActiveTab] = useState("ongoing");

  const orders = activeTab === "ongoing" ? currentOrders : previousOrders;

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
      {orders.map((store) => (
        <Card
          key={store.ButikId}
          className=" w-[400px] h-[100px] p-4 mt-6 rounded-lg"
          // onClick={() => navigate(`/order-details/${store.ButikId}`)}
        >
          <CardDate></CardDate>
          <CardHeader>
            <CardStore>{store.ButikNamn}</CardStore>
            <CardAddress>{store.Besöksadress}</CardAddress>
            <CardClientName>
              {store.ButikschefNamn} {store.ButikschefTelefon}
            </CardClientName>
          </CardHeader>
        </Card>
      ))}
    </main>
  );
}
