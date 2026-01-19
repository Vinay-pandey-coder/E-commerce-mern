import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrderd = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items),
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        // api calls for cod
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } },
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } },
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        className=" flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
      >
        {/* Left side */}
        <div className=" flex flex-col gap-4 w-full sm:max-w-120">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>
          <div className=" flex gap-3">
            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First Name"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last Name"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            required
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Email address"
            className=" border border-gray-300 py-1.5 px-3.5 w-full"
          />
          <input
            required
            name="street"
            value={formData.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            className=" border border-gray-300 py-1.5 px-3.5 w-full"
          />
          <div className=" flex gap-3">
            <input
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
            <input
              required
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
          </div>
          <div className=" flex gap-3">
            <input
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              type="number"
              placeholder="Zipcode"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              className=" border border-gray-300 py-1.5 px-3.5 w-full"
            />
          </div>
          <input
            required
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            type="number"
            placeholder="Phone"
            className=" border border-gray-300 py-1.5 px-3.5 w-full"
          />
        </div>

        {/* Right Side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            {/* payment method */}
            <div className=" flex gap-3 flex-col lg:flex-row">
              <div
                onClick={() => setMethod("stripe")}
                className=" flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "stripe" ? "bg-green-400" : ""
                  }`}
                ></p>
                <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
              </div>
              <div
                onClick={() => setMethod("cod")}
                className=" flex items-center gap-3 border p-2 px-3 cursor-pointer"
              >
                <p
                  className={`min-w-3.5 h-3.5 border rounded-full ${
                    method === "cod" ? "bg-green-400" : ""
                  }`}
                ></p>
                <p className=" text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>

            <div className="w-full text-end">
              <button
                type="submit"
                className="bg-black text-white text-sm my-8 px-8 py-3 cursor-pointer"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrderd;
