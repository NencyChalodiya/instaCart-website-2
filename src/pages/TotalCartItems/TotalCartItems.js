import React, { useState, useEffect } from "react";

import { Drawer } from "antd";
import { Form } from "antd";
import { Switch } from "antd";

import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DeleteParticularItemFromCart } from "../../utils/Reducers/CartSlice";
import { DeleteTotalItems } from "../../utils/Reducers/ItemSlice";
import { DeleteTotalCategoryItems } from "../../utils/Reducers/CategorySlice";
import { DeleteTotalSubCategoryItems } from "../../utils/Reducers/SubCategorySlice";
import { UpdateGiftOption } from "../../utils/Reducers/CartSlice";
import CartEmpty from "./CartEmpty";
import SubCategoryCartItems from "./SubCategoryCartItems";
import CatgeoryCartItems from "./CatgeoryCartItems";
import ShopCartItems from "./ShopCartItems";

import TickSvg from "../../assets/images/tick.svg";
import MenuSvg from "../../assets/images/menuSvg.svg";
import GiftSvg from "../../assets/images/gift.svg";

const TotalCartItems = ({ totalCartItemsModal, onCancel }) => {
  const dispatch = useDispatch();
  const { storeId, categoryId, subcategoryId } = useParams();
  const { cartItems, giftOption } = useSelector((state) => state.cartItems);

  const [giftOptionState, setGiftOptionState] = useState(giftOption);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    setGiftOptionState(giftOption);
  }, [giftOption]);

  useEffect(() => {
    calculateSubtotal();
  }, [cartItems]);

  const calculateSubtotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.qty * item.selling_price;
    });
    setSubtotal(total);
  };

  const handleGiftOptionChange = (checked) => {
    setGiftOptionState(checked);
    dispatch(UpdateGiftOption(checked));
  };

  const DeleteItemsFromCart = (items) => {
    dispatch(DeleteParticularItemFromCart(items));
    dispatch(DeleteTotalItems(items));
  };

  const DeleteCategoryItemsProductsFromCart = (CategoryItems) => {
    dispatch(DeleteParticularItemFromCart(CategoryItems));
    dispatch(DeleteTotalCategoryItems(CategoryItems));
  };

  const DeleteSubCategoryItemsProductsFromCart = (subCategoryItems) => {
    dispatch(DeleteParticularItemFromCart(subCategoryItems));
    dispatch(DeleteTotalSubCategoryItems(subCategoryItems));
  };

  return (
    <>
      <Drawer
        title={
          <header>
            <div className="flex justify-center bg-white">
              <div className="flex flex-col items-center ">
                <h1 className="text-base leading-5">Personal Petro cart</h1>
                <h2 className="text-sm leading-5 text-gray-400">
                  Shopping in 94105
                </h2>
              </div>
            </div>
          </header>
        }
        placement="right"
        width={500}
        onClose={onCancel}
        open={totalCartItemsModal}
      >
        {cartItems?.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="flex-grow overflow-x-hidden overflow-y-auto">
            <div className="p-3 border-t border-b">
              <div className="flex">
                <div className="mr-4">
                  <div className="h-[50px] w-[50px] z-10 rounded-[50%] relative overflow-hidden border">
                    <img
                      src="https://www.instacart.com/assets/domains/warehouse/logo/5/65f2304b-908e-4cd0-981d-0d4e4effa8de.png"
                      alt="store-img"
                      className="absolute block h-auto max-w-full m-auto "
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-center flex-grow">
                  <span className="">Costco</span>
                  <span className="flex items-center">
                    <span className="text-sm leading-4">Tomorrow, 12pm</span>
                  </span>
                  <div className="flex items-center cursor-pointer">
                    <img src={TickSvg} alt="tick-svg" />
                    <a href="#">
                      <p className="text-[#669FD6] underline">
                        100% satisfaction guarantee
                      </p>
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-end min-w-16">
                  $22.35
                </div>
              </div>
            </div>
            <div className="bg-white">
              <div className="px-3 pt-3">
                <div>
                  <button className="float-right cursor-pointer p-3 m-[-12px] ">
                    <img src={MenuSvg} alt="menu-svg" />
                  </button>
                </div>
                <div></div>
              </div>
            </div>
            <ul>
              {subcategoryId ? (
                <>
                  {cartItems.map((subCategoryItems) => (
                    <SubCategoryCartItems
                      key={subCategoryItems.id}
                      subCategoryItems={subCategoryItems}
                      DeleteSubCategoryItemsProductsFromCart={
                        DeleteSubCategoryItemsProductsFromCart
                      }
                    />
                  ))}
                </>
              ) : categoryId ? (
                <>
                  {cartItems.map((CategoryItems) => (
                    <CatgeoryCartItems
                      key={CategoryItems.id}
                      CategoryItems={CategoryItems}
                      DeleteCategoryItemsProductsFromCart={
                        DeleteCategoryItemsProductsFromCart
                      }
                    />
                  ))}
                </>
              ) : (
                <>
                  {cartItems.map((items) => (
                    <ShopCartItems
                      key={items.id}
                      items={items}
                      DeleteItemsFromCart={DeleteItemsFromCart}
                    />
                  ))}
                </>
              )}
            </ul>
            <label className="relative flex px-2  border-t border-b cursor-pointer">
              <img src={GiftSvg} alt="gift-svg" />
              <span className="flex-grow flex-shrink text-xl mt-6 pl-2 ">
                Make this order a gift
              </span>
              <div className="mt-4">
                <Form>
                  <Form.Item valuePropName="checked">
                    <Switch
                      onChange={handleGiftOptionChange}
                      checked={giftOptionState}
                    />
                  </Form.Item>
                </Form>
              </div>
            </label>

            <div className="fixed bottom-0 right-0 p-2 bg-white w-[500px] ">
              <Link to={`/store/checkout/${storeId}`}>
                <span className="flex justify-between items-center bg-[#2C890F] rounded-[27px] h-[54px] w-full text-white">
                  <div className="pl-40 text-lg">Go to checkout</div>
                  <div className="bg-[#23720C] rounded-[27px] w-20 h-12 flex items-center text-base justify-center ">
                    ${subtotal.toFixed(2)}
                  </div>
                </span>
              </Link>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default TotalCartItems;
