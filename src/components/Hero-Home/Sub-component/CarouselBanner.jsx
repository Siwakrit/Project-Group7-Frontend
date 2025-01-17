import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Checkout/CartContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;


function CarouselBanner({ selectedId }) {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fade, setFade] = useState(true);
  
  const { buyNow } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/game`);
        if (selectedId) {
          const selectedItem = response.data.game.find((item) => item._id === selectedId);
          setSelectedData(selectedItem || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedId]);

  //Effect สำหรับเปลี่ยนรูป
  useEffect(() => {
    if (selectedData) {
      setFade(false);
      const timeout = setTimeout(() => {
        setFade(true);
      }, 50);
      return () => clearTimeout(timeout); // Clear timeout เพื่อป้องกันปัญหา
    }
  }, [selectedData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/game/${id}`);
  };

  const BuyNowClick = async () => {
    const token = localStorage.getItem("authToken");
    
    if (!token) {
      toast.warning("Please sign in to proceed with checkout.", { autoClose: 2500 });
      navigate("/login");
      return;
    }
  
    await buyNow(selectedData);
    navigate("/checkout");
  };

  if (!selectedData) {
    return null;
  }

  return (
    <div className="relative w-auto h-[570px]">
      <img
        src={selectedData.images[0]}
        alt={selectedData.title}
        className={`bg-auto bg-no-repeat rounded-xl w-full h-full object-center transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        } cursor-pointer`}
        onClick={() => handleCardClick(selectedData._id)}
      />

      <div className="absolute bottom-5 left-5 p-5 bg-black opacity-80 rounded-xl z-10 w-[450px]">
        <div className="text-start text-white">
          <div className="font-bold text-2xl pb-2">{selectedData.title}</div>
          <div className="text-lg">
            {selectedData.mainContent || "No description available."}
          </div>
        </div>
        <div className="mt-4">
          <Button
            color="primary"
            flat={false}
            size="large"
            className="px-7 z-30"
            key={selectedData._id}
            onClick={() => BuyNowClick(selectedData._id)}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CarouselBanner;
