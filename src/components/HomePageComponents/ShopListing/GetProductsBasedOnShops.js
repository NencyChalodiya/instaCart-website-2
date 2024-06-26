import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import API from "../../../services/api";
import AddToCart from "../../../pages/AddToCart/AddToCart";
import HeaderProducts from "../HeaderOfProducts/HeaderProducts";
import DeliveryTimesModal from "../../../pages/DeliveryTimesModal/DeliveryTimesModal";

import { SetCategoryItems } from "../../../utils/Reducers/ProductSlice";
import { SetCategoryItemsProducts } from "../../../utils/Reducers/CategorySlice";
import { SetSubCategoryItemsProducts } from "../../../utils/Reducers/SubCategorySlice";
import { AddItem, RemoveItem } from "../../../utils/Reducers/ProductSlice";

import ShopProducts from "../../ProductsComponent/ShopProducts";
import CategoryProducts from "../../ProductsComponent/CategoryProducts";
import ProductsOfSubcategory from "../../ProductsComponent/ProductsOfSubcategory";
import StoreFrontDetails from "../../ProductsComponent/StoreFrontDetails";
import StoreFilteredProducts from "../../ProductsComponent/StoreFilteredProducts";
import TopStoreFrontDetails from "../../ProductsComponent/TopStoreFrontDetails";

import { Skeleton } from "antd";

import Checkout from "../../../pages/CheckoutPage/Checkout";
import ShopIconSvg from "../../../assets/images/shopIcon.svg";
import BuySvg from "../../../assets/images/buyAgain.svg";
import ListIconSvg from "../../../assets/images/listIcon.svg";
import TickSvg from "../../../assets/images/tick.svg";
import ArrowSvg from "../../../assets/images/arrow.svg";

import {
  AddCategoryItem,
  RemoveCategoryItem,
} from "../../../utils/Reducers/CategorySlice";
import {
  AddSubCategoryItem,
  RemoveSubCategoryItem,
} from "../../../utils/Reducers/SubCategorySlice";
import {
  AddItemToCart,
  RemoveItemFromCart,
} from "../../../utils/Reducers/CartSlice";

const GetProductsBasedOnShops = ({ storeFilteredProducts }) => {
  const { storeId, categoryId, subcategoryId } = useParams();

  const productStoreSideBarData = [
    {
      id: 1,
      iconSvg: ShopIconSvg,
      title: "Shop",
      route: `/store/${storeId}/front`,
    },
    {
      id: 2,
      iconSvg: BuySvg,
      title: "Buy it again",
      route: "#",
    },
    {
      id: 3,
      iconSvg: ListIconSvg,
      title: "Lists",
      route: `/store/your-lists/${storeId}`,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addToCartModal, setaddToCartModal] = useState(false);
  const [deliveryTimeModal, openDeliveryTimeModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [storeFrontDetails, setStoreFrontDetails] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [deliveryDetails, setDeliveryDetails] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const { productItems } = useSelector((state) => state);
  const { categoryItems } = useSelector((state) => state);
  const { subcategoryItems } = useSelector((state) => state);

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const AddtoCart = (
    e,
    product,
    subCategoryId,
    categoryId,
    storeId,
    selectedValue
  ) => {
    e.stopPropagation();
    if (selectedValue) {
      dispatch(
        AddItem({
          ...product,
          subcategory_id: subCategoryId,
          category_id: categoryId,
          storeId: storeId,
          selectedQty: selectedValue,
        })
      );
      dispatch(
        AddItemToCart({
          ...product,
          subcategory_id: subCategoryId,
          category_id: categoryId,
          storeId: storeId,
          selectedQty: selectedValue,
        })
      );
    } else {
      dispatch(
        AddItem({
          ...product,
          subcategory_id: subCategoryId,
          category_id: categoryId,
          storeId: storeId,
        })
      );
      dispatch(
        AddItemToCart({
          ...product,
          subcategory_id: subCategoryId,
          category_id: categoryId,
          storeId: storeId,
        })
      );
    }

    // dispatch(AddNewItem({ product: product, storeId: storeId }));
  };

  const RemoveFromCart = (e, product, subCategoryId, categoryId) => {
    e.stopPropagation();
    dispatch(
      RemoveItem({
        ...product,
        subcategory_id: subCategoryId,
        category_id: categoryId,
        storeId: storeId,
      })
    );
    dispatch(
      RemoveItemFromCart({
        ...product,
        subcategory_id: subCategoryId,
        category_id: categoryId,
        storeId: storeId,
      })
    );
  };

  const AddtoCartCategoryProducts = (e, product, subCategoryId) => {
    e.stopPropagation();
    dispatch(
      AddCategoryItem({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
    dispatch(
      AddItemToCart({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
  };

  const RemoveFromCartCategoryProducts = (e, product, subCategoryId) => {
    e.stopPropagation();
    dispatch(
      RemoveCategoryItem({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
    dispatch(
      RemoveItemFromCart({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
  };

  const AddtoCartSubCategoryProducts = (e, product, subCategoryId) => {
    e.stopPropagation();
    dispatch(
      AddSubCategoryItem({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
    dispatch(
      AddItemToCart({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
  };
  const RemoveFromSubCartCategoryProducts = (e, product, subCategoryId) => {
    e.stopPropagation();
    dispatch(
      RemoveSubCategoryItem({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
    dispatch(
      RemoveItemFromCart({
        ...product,
        subcategory_id: subCategoryId,
        storeId: storeId,
      })
    );
  };

  useEffect(() => {
    setLoading(true);
    const fetchStoreFrontDetails = async () => {
      try {
        const response = await API.getStoreFrontDetails(storeId);
        if (response.status === "success") {
          setStoreFrontDetails(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStoreFrontDetails();
  }, [storeId]);

  useEffect(() => {
    setLoading(true);
    const fetchProductsOfShop = async () => {
      try {
        const response = await API.getProductsOfShop(storeId);
        if (response.status === "success") {
          dispatch(SetCategoryItems(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (storeId) fetchProductsOfShop();
  }, [storeId]);

  useEffect(() => {
    setLoading(true);
    const fetchStoreSubCategory = async () => {
      try {
        const response = await API.getStoreSubCategory(categoryId);
        if (response.status === "success") {
          dispatch(SetCategoryItemsProducts(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (categoryId) fetchStoreSubCategory();
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);
    const fetchProductsOfSubCategory = async () => {
      try {
        const response = await API.getProductsOfSubCategory(subcategoryId);
        if (response.status === "success") {
          dispatch(SetSubCategoryItemsProducts(response.data));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (subcategoryId) fetchProductsOfSubCategory();
  }, [subcategoryId]);

  const handleSubCatClick = async (categoryId) => {
    setSelectedSubCategory(categoryId);

    navigate(`/store/${storeId}/front/collection/${categoryId}`);
  };

  const handleSubProductClick = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
    navigate(
      `/store/${storeId}/front/collection/${categoryId}/${subcategoryId}`
    );
  };

  const fetchStoreDeliveryDetails = async () => {
    try {
      setLoading(true);
      const response = await API.getStoreDeliveryDetails(storeId);
      setDeliveryDetails(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const openModalWithApiCall = () => {
    openDeliveryTimeModal(true);
    fetchStoreDeliveryDetails();
  };

  const fetchProductDetail = async (productId) => {
    try {
      const response = await API.getIndividualProductDetail(productId);
      if (response.status === "success") {
        setProductDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openProductDetailModal = (productId) => {
    setaddToCartModal(true);
    fetchProductDetail(productId);
  };

  return (
    <>
      <HeaderProducts storeId={storeId} />
      <div className="h-full bg-white">
        <div
          className="fixed z-10 w-64 overflow-y-auto bg-white border-r-2 top-20"
          style={{ height: `calc(100% - 80px)` }}
        >
          <div className="sticky bg-white z-1 ">
            <div className="flex flex-col items-center px-1 pt-6 pb-4 text-center flex-nowrap">
              {isLoading ? (
                <>
                  <div>
                    <div className="circle">
                      <Skeleton.Avatar active />
                    </div>
                    <div className="line-1">
                      <Skeleton.Avatar active />
                    </div>
                    <div className="line-2">
                      <Skeleton.Avatar active />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  {storeFrontDetails ? (
                    storeFrontDetails?.map((store) => (
                      <TopStoreFrontDetails
                        store={store}
                        openModalWithApiCall={openModalWithApiCall}
                        ArrowSvg={ArrowSvg}
                      />
                    ))
                  ) : (
                    <div>Loading...</div>
                  )}
                </>
              )}

              <button>
                <div className="flex items-center mt-1 cursor-pointer">
                  <img src={TickSvg} alt="tickSvg" />
                  <p className="text-sm leading-4 text-[#3C84CA]">
                    100% satisfaction guarantee
                  </p>
                  <img src={ArrowSvg} alt="arrowSvg" />
                </div>
              </button>
            </div>
          </div>
          <hr />
          <ul className="w-full px-3 py-4 list-none">
            {productStoreSideBarData.map((data) => (
              <li key={data.id}>
                <Link
                  to={`${data.route}`}
                  className={`box-border relative flex items-center w-full pl-3 pr-3 text-sm leading-5 rounded-lg cursor-pointer flex-nowrap hover:bg-gray-100 
                   
                  `}
                >
                  <span className="flex items-center h-10">
                    <img src={data.iconSvg} alt="shopIconSvg" />
                  </span>
                  <span className="pt-2 pb-2 ml-2">{data.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <hr />

          <ul className="px-3 pt-4 pb-3">
            {isLoading ? (
              <div className="px-6 py-2 ">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div key={index}>
                    <div className="line-4 mt-3">
                      <Skeleton.Avatar active />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {storeFrontDetails &&
                  storeFrontDetails.length > 0 &&
                  storeFrontDetails?.map((store) =>
                    store?.categories?.map((category) => (
                      <StoreFrontDetails
                        category={category}
                        handleSubCatClick={handleSubCatClick}
                        selectedSubCategory={selectedSubCategory}
                        catItems={categoryItems.categoryItems}
                        handleSubProductClick={handleSubProductClick}
                      />
                    ))
                  )}
              </>
            )}
          </ul>
        </div>

        {subcategoryId ? (
          <>
            <div className="ml-72">
              <div className="h-14"></div>{" "}
              {isLoading ? (
                <div className="grid grid-cols-3 w-[1000px]">
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-2 gap-2 mt-40 w-[150px]">
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="line-1">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-2">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-3">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              ) : (
                <div>
                  {subcategoryItems.subCategoryItems &&
                  subcategoryItems.subCategoryItems.products ? (
                    <>
                      {" "}
                      <div
                        key={subcategoryItems.subCategoryItems.subcategory_id}
                      >
                        <div className="flex items-center justify-between mt-6">
                          <h2 className="flex mr-2">
                            <div className="text-3xl font-bold leading-5 max-md:text-2xl">
                              {
                                subcategoryItems.subCategoryItems
                                  ?.subcategory_name
                              }
                            </div>
                          </h2>
                          <div className="flex items-center justify-center  max-md:hidden">
                            <div className="flex items-center justify-center">
                              <button className="flex w-full h-10 text-green-600 rounded-xl">
                                <span className="flex items-center gap-1 mt-2 ml-2 mr-6 overflow-hidden text-sm leading-5 text-ellipsis">
                                  View all (80+)
                                  <img src={TickSvg} alt="tickSvg" />
                                </span>
                              </button>
                            </div>
                            <div className="flex items-center ml-4 mr-2 min-h-20"></div>
                          </div>
                        </div>
                        <div>
                          <div className="relative flex ">
                            <div className="w-full">
                              <ul className="w-full h-full min-h-[304px] grid grid-cols-5 gap-9 justify-between mt-2 max-2xl:grid-cols-6 max-lg:grid-cols-4 max-xl:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-1">
                                {subcategoryItems.subCategoryItems &&
                                subcategoryItems.subCategoryItems.products &&
                                subcategoryItems.subCategoryItems.products
                                  .length > 0 ? (
                                  <>
                                    {subcategoryItems?.subCategoryItems?.products.map(
                                      (product) => (
                                        <ProductsOfSubcategory
                                          product={product}
                                          openProductDetailModal={
                                            openProductDetailModal
                                          }
                                          RemoveFromSubCartCategoryProducts={
                                            RemoveFromSubCartCategoryProducts
                                          }
                                          AddtoCartSubCategoryProducts={
                                            AddtoCartSubCategoryProducts
                                          }
                                          handleMouseLeave={handleMouseLeave}
                                          handleMouseEnter={handleMouseEnter}
                                          hoveredProductId={hoveredProductId}
                                          items={
                                            subcategoryItems.subCategoryItems
                                          }
                                          storeId={storeId}
                                        />
                                      )
                                    )}
                                  </>
                                ) : (
                                  <div>No Products found...</div>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : categoryId ? (
          <>
            {" "}
            <div className="ml-72">
              <div className="h-14"></div>
              {isLoading ? (
                <div className="grid grid-cols-3 w-[1000px]">
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-2 gap-2 mt-40 w-[150px]">
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="line-1">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-2">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-3">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              ) : (
                <div>
                  {categoryItems?.categoryItems?.map((subCategory) => (
                    <CategoryProducts
                      subCategory={subCategory}
                      openProductDetailModal={openProductDetailModal}
                      RemoveFromCartCategoryProducts={
                        RemoveFromCartCategoryProducts
                      }
                      AddtoCartCategoryProducts={AddtoCartCategoryProducts}
                      handleMouseLeave={handleMouseLeave}
                      handleMouseEnter={handleMouseEnter}
                      hoveredProductId={hoveredProductId}
                      storeId={storeId}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : storeFilteredProducts?.products?.length > 0 ? (
          <div>
            <div className="ml-72">
              <div className="h-14"></div>

              <div>
                <div className="flex items-center justify-between  ">
                  <div className="flex items-center justify-center max-md:hidden mt-16"></div>
                </div>

                <div>
                  <div>
                    <div className="relative flex flex-row">
                      <div className="w-full">
                        <ul className="w-full h-full min-h-[304px] grid grid-cols-5 gap-9 justify-between mt-8 max-2xl:grid-cols-6 max-lg:grid-cols-4 max-xl:grid-cols-5 max-md:grid-cols-3 max-sm:grid-cols-1">
                          {storeFilteredProducts?.products?.map((cat) => (
                            <StoreFilteredProducts cat={cat} />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="ml-72">
              <div className="h-14"></div>

              {isLoading ? (
                <div className="grid grid-cols-3 w-[1000px]">
                  <>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index}>
                        <div className="grid grid-cols-2 gap-2 mt-40 w-[150px]">
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="circle">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="square">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="line-1">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-2">
                            <Skeleton.Avatar active />
                          </div>
                          <div className="line-3">
                            <Skeleton.Avatar active />
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                </div>
              ) : (
                <div>
                  {productItems.items.map((category) => (
                    <ShopProducts
                      category={category}
                      openProductDetailModal={openProductDetailModal}
                      RemoveFromCart={RemoveFromCart}
                      AddtoCart={AddtoCart}
                      handleMouseLeave={handleMouseLeave}
                      handleMouseEnter={handleMouseEnter}
                      hoveredProductId={hoveredProductId}
                      storeId={storeId}
                      productDetail={productDetail}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <AddToCart
        addToCartModal={addToCartModal}
        onBackClick={() => setaddToCartModal(false)}
        productDetail={productDetail}
        storeId={storeId}
        AddtoCart={AddtoCart}
      />

      <DeliveryTimesModal
        deliveryTimeModal={deliveryTimeModal}
        onCancel={() => openDeliveryTimeModal(false)}
        deliveryDetails={deliveryDetails}
        isLoading={isLoading}
      />
      {productDetail && productDetail.length > 0 && (
        <Checkout productDetail={productDetail} />
      )}
    </>
  );
};

export default GetProductsBasedOnShops;
