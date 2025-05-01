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
import { ButtonPaginationNext, ButtonPaginationPrev, ButtonTab } from "../../components/ui/button";
import { useFilteredOrders } from "../../hooks/useFilteredOrders";
import { formatDate } from "../../lib/formatDate";
import { Main, Wrapper } from "../../blocks/wrappers";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const { upcoming, previous } = useFilteredOrders(page, pageSize);
  
  const paginated = activeTab === "ongoing" ? upcoming : previous;

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(paginated.TotalPages, p + 1));

  function getSimplePagination(current: number, total: number): (number | "...")[] {
    const pages: (number | "...")[] = [];
  
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    pages.push(1);
    if (current > 3) pages.push("...");
    const middlePages = [current - 1, current, current + 1].filter(
      (n) => n > 1 && n < total
    );
    pages.push(...middlePages);
    
    if (current < total - 2) pages.push("...");
    if (total !== 1) pages.push(total);
    return pages;
  }

  const pageNumbers = getSimplePagination(page, paginated.TotalPages);

  return (
    <Main>
      <Wrapper>
        <Menu />
        <div className="flex">
          <ButtonTab
            isActive={activeTab === "ongoing"}
            onClick={() => {
              setActiveTab("ongoing")
              setPage(1)
            }}
            className="rounded-l-xl"
          >
            Pågående
          </ButtonTab>
          <ButtonTab
            isActive={activeTab === "delivered"}
            onClick={() => {
              setActiveTab("delivered")
              setPage(1)
            }}
            className="rounded-r-xl"
          >
            Levererade
          </ButtonTab>
        </div>
        <div>
          {paginated.Data.map((order) => (
            <a href={`/order/${order.BeställningId}`} key={order.BeställningId} role="button">
              <Card className="w-[23.75rem] h-[5.313rem] rounded-xl bg-Branding-cardPrimary flex justify-center relative mb-4">
                <CardDate className="absolute right-4 top-2 text-sm">
                  {order.PreliminärtLeveransdatum && formatDate(order.PreliminärtLeveransdatum)}
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
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          <ButtonPaginationPrev onClick={handlePrev} disabled={page === 1}>a</ButtonPaginationPrev>
          <section className="inline-flex items-center justify-center gap-1">
          {pageNumbers.map((pageNumber, i) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">...</span>
            ) : (
              <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`items-center px-4 py-2 mx-1 transition-colors rounded-md sm:flex hover:text-gray-200
                    ${pageNumber === page
                      ? "bg-blue-600 text-Branding-textPrimary"
                      : "bg-gray-800 text-gray-200 hover:bg-blue-600"
                  }`}
                >
                  {pageNumber}
                </button>
            )
          )}
          </section>
          <ButtonPaginationNext onClick={handleNext} disabled={page === paginated.TotalPages}>b</ButtonPaginationNext>
        </div>
      </Wrapper>
    </Main>
  );
}
