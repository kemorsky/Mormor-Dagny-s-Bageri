import { useState, useEffect, useRef } from "react";
import { OrdersCard, OrdersCardHeader, OrdersCardOrderId, OrdersCardDate, OrdersCardStore, OrdersCardAddress, 
        OrdersCardClientInfo, OrdersCardClientName, OrdersCardClientNumber, } from "../../blocks/orders-card";
import Menu from "../../elements/menu/menu";
import { useFilteredOrders } from "../../hooks/useFilteredOrders";
import { formatDate } from "../../lib/formatDate";
import { Main, Wrapper } from "../../blocks/wrappers";
import { Button } from "../../components/ui/button-shadcn";
import { ArrowRight, ArrowLeft } from "lucide-react";
import {  } from "react";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [page, setPage] = useState(1);

  const pageSize = 10;
  const { upcoming, previous } = useFilteredOrders(page, pageSize);
  
  const paginated = activeTab === "ongoing" ? upcoming : previous;

  const handlePrev = () => handlePageChange(Math.max(1, page - 1));
  const handleNext = () => handlePageChange(Math.min(paginated.TotalPages, page + 1));

  // Inside the component
  const lastScrollY = useRef<number>(0);

  // Save scroll position before pagination
  const handlePageChange = (newPage: number) => {
    lastScrollY.current = window.scrollY;
    setPage(newPage);
  };

  // Restore scroll position after content updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0); // Delay to ensure DOM is painted
  
    return () => clearTimeout(timeout);
  }, [page]);

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
          <Button variant='tab'
                  size='smaller'
                  isActive={activeTab === "ongoing"}
                  onClick={() => {
                    setActiveTab("ongoing")
                    handlePageChange(1);
                  }}
                  className="rounded-l-xl">
            Pågående
          </Button>
          <Button variant='tab'
                  size='smaller'
                  isActive={activeTab === "delivered"}
                  onClick={() => {
                    setActiveTab("delivered")
                    handlePageChange(1);
                  }}
                  className="rounded-r-xl">
            Levererade
          </Button>
        </div>
        <div className="w-full max-w-[25rem] inline-flex flex-col items-start justify-center gap-3">
          {paginated.Data.map((order) => (
            <a href={`/order/${order.BeställningId}`} key={order.BeställningId} role="button" className="w-full">
              <OrdersCard>
                <OrdersCardHeader>
                  <OrdersCardOrderId>#{order.BeställningId}</OrdersCardOrderId>
                  <OrdersCardDate>{order.PreliminärtLeveransdatum && formatDate(order.PreliminärtLeveransdatum)}</OrdersCardDate>
                </OrdersCardHeader>
                <section className="self-start">
                  <OrdersCardStore>{order.Butik?.ButikNamn}</OrdersCardStore>
                  <OrdersCardAddress>{order.Butik?.Besöksadress}</OrdersCardAddress>
                </section>
                <section className="self-start">
                  <OrdersCardClientName className="self-start font-medium text-Branding-textPrimary text-sm">Brödansvarig</OrdersCardClientName>
                  <OrdersCardClientInfo>
                    <OrdersCardClientName>{order.Butik?.BrödansvarigNamn}</OrdersCardClientName>
                    <OrdersCardClientNumber>{order.Butik?.BrödansvarigTelefon}</OrdersCardClientNumber>
                  </OrdersCardClientInfo>
                </section>
              </OrdersCard>
            </a>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="prev" size="pagination" onClick={handlePrev} disabled={page === 1}><ArrowLeft className="h-4 w-4" /></Button>
          <section className="inline-flex items-center justify-center gap-1">
          {pageNumbers.map((pageNumber, i) =>
            pageNumber === "..." ? (
              <span key={`ellipsis-${i}`} className="px-2 text-gray-400">...</span>
            ) : (
              <Button
                  variant="pageNumber"
                  size="pagination"
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`${pageNumber === page ? "bg-Branding-buttonPrimary text-Branding-textAccent" : 
                            "bg-gray-700 text-gray-500 hover:bg-blue-600"}`}>
                  {pageNumber}
                </Button>
            )
          )}
          </section>
          <Button variant="next" size="pagination" onClick={handleNext} disabled={page === paginated.TotalPages}><ArrowRight className="h-4 w-4" /></Button>
        </div>
      </Wrapper>
    </Main>
  );
}
