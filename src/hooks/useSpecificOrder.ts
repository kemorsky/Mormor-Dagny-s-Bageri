import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router';
import { useProducts } from "../components/auth/ProductContext";
import {
  fetchSpecificOrder,
  deleteOrder,
  deleteOrderDetails,
  editOrderDeliveryDate,
  editOrderDetails,
  addOrderDetail
} from "../lib/api";
import { defaultDetail } from "../constants/prefab-consts";
import { Order, OrderDetails } from "../types/types";

export function useSpecificOrderPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();

  const [order, setOrder] = useState<Order>();
  const [isEditing, setIsEditing] = useState(false);
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);
  const [editedDetails, setEditedDetails] = useState<OrderDetails[]>([]);
  const [editedDate, setEditedDate] = useState(order?.PreliminärtLeveransdatum || '');
  const [newDetail, setNewDetail] = useState<OrderDetails>(() => ({ ...defaultDetail }));

  useEffect(() => {
    const getOrder = async () => {
        const orderId = parseInt(id);
        try {
            const order = await fetchSpecificOrder(orderId);
            setOrder(order);
            setEditedDetails(order.Beställningsdetaljer || []);
        } catch (error) {
            console.error("Error fetching this order:", error);
        }
    };
    getOrder();
}, [id]);

const finalTotal = order?.Beställningsdetaljer?.reduce((acc, item) => {
    const base = item.Styckpris || 0;
    const discounted = base * (1 - order?.Beställningsdetaljer?.[0]?.Rabatt / 100);
    return acc + discounted;
}, 0);

  const handleSubmitDate = async () => {
    if (editedDate) {
        const updateDTO = {
            PreliminärtLeveransdatum: editedDate
        }
        const success = await editOrderDeliveryDate(order?.BeställningId ?? 0, updateDTO);
        if (success) {
            if (success) {
                setOrder((prevDate) => ({
                    ...prevDate!,
                    PreliminärtLeveransdatum: editedDate,
                }));
                setEditedDate('')
            }
        }
    }
}

const handleEdit = () => {
    setIsEditing(true);
};

const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDetails(order?.Beställningsdetaljer || []);
};

const handleAmountChange = (id: number, value: string) => {
    const numericValue = value === '' ? 0 : parseInt(value);
    setEditedDetails((prevDetails) =>
        prevDetails.map((detail) => {
            if (detail.BeställningsdetaljId === id) {
                const basePrice = detail.Produkt?.Baspris || 0;
                return {
                    ...detail,
                    Antal: value === '' ? 0 : numericValue,
                    Styckpris: numericValue * basePrice
                };
            }
            return detail;
        })
    );
};

const handleDelete = async (BeställningsdetaljId: number) => {
    try {
      console.log('Attempting to delete BeställningsdetaljId:', BeställningsdetaljId);
  
      const orderDetailsToDelete = editedDetails.find((detail) => detail.BeställningsdetaljId === BeställningsdetaljId);
  
      if (orderDetailsToDelete) {
        console.log('Detail to delete:', orderDetailsToDelete);
        await deleteOrderDetails([orderDetailsToDelete]);
      } else {
        console.log('Detail not found to delete.');
      }
  
      setOrder((prev) => prev ? {
        ...prev,
        Beställningsdetaljer: prev.Beställningsdetaljer.filter((orderDetail) => orderDetail.BeställningsdetaljId !== BeställningsdetaljId),
      } : prev);
  
      setEditedDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.BeställningsdetaljId !== BeställningsdetaljId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  
  const handleDeleteOrder = async (BeställningId: number) => {
    const confirmDelete = window.confirm("Är du säker på att du vill ta bort hela beställningen?");
    if (!confirmDelete) {
        console.log("Användaren avbröt borttagningen.");
        return;
    }

    try {
        await deleteOrder(BeställningId);
        console.log("Deleted order with id:", BeställningId);
        navigate('/');
    } catch (error) {
        console.error("Error deleting order:", error);
    }
};

const handleSubmit = async () => {
    if (editedDetails) {
        const success = await editOrderDetails(editedDetails);
        if (success) {
            setOrder((prevOrder) => ({
                ...prevOrder!,
                Beställningsdetaljer: editedDetails,
            }));
            setIsEditing(false);
        }
    }
};

const handleAddDetail = async () => {
    try {
      if (!order) return;
  
      const response = await addOrderDetail(order.BeställningId ?? 0, newDetail);
      console.log('Backend response:', response);
    
      const fullProduct = products.find(p => p.ProduktId === newDetail.ProduktId);
  
      const newDetailWithProduct = {
        ...newDetail,
        Produkt: fullProduct,
        BeställningId: response.BeställningId,
        BeställningsdetaljId: response.BeställningsdetaljId,
      };

      setOrder((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          Beställningsdetaljer: [...prev.Beställningsdetaljer, newDetailWithProduct],
        };
      });

      setEditedDetails((prevDetails) => {
        const updatedDetails = [...prevDetails, newDetailWithProduct];
        console.log('Updated editedDetails:', updatedDetails);
        return updatedDetails;
      });
  
      // Reset the new detail form
      setNewDetail({ ...defaultDetail });
      setEditedDetails((prevDetails) => [...prevDetails, newDetailWithProduct]);
      setIsCompletingOrder(false);
      console.log(editedDetails)
  
    } catch (error) {
      console.log("Could not add new detail", error);
    }
  };
  
  return {
    order,
    products,
    isEditing,
    isCompletingOrder,
    editedDetails,
    editedDate,
    newDetail,
    finalTotal,
    setIsCompletingOrder,
    setEditedDate,
    setNewDetail,
    handleEdit,
    handleCancelEdit,
    handleSubmitDate,
    handleSubmit,
    handleAmountChange,
    handleDelete,
    handleDeleteOrder,
    handleAddDetail,
  };
}
