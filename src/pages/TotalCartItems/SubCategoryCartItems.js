import React from "react";

import ChooseReplacementSvg from "../../assets/images/chooseReplacement.svg";
import RemoveSvg from "../../assets/images/removeSvg.svg";

const SubCategoryCartItems = ({
  subCategoryItems,
  DeleteSubCategoryItemsProductsFromCart,
}) => {
  return (
    <li key={subCategoryItems.id}>
      <div>
        <div className="flex flex-col p-3">
          <div className="flex">
            <div className="basis-[50px] h-full mr-2">
              <button className="relative mr-2 cursor-pointer">
                <span className="flex items-center text-ellipsis ">
                  <img src={subCategoryItems.image} className="max-w-full" />
                </span>
              </button>
            </div>
            <div className="flex flex-col justify-start flex-grow ml-2">
              <div className="flex">
                <div className="flex flex-col justify-start flex-grow ml-2 ">
                  <div className="">
                    <button className="relative mr-2 cursor-pointer ">
                      <span className="flex items-center text-ellipsis">
                        <h3 className="text-left text-gray-500">
                          {subCategoryItems.title},{subCategoryItems.label}
                        </h3>
                      </span>
                    </button>
                  </div>
                  <div className="mb-3 mt-[2px] text-gray-400 ">each</div>
                </div>
                <div className="relative z-10 flex items-center self-center justify-end bg-black mb-14 basis-20">
                  <div className="absolute cursor-pointer top-1 right-1">
                    <div className="inline-block rounded-[8px] border">
                      <button className="cursor-pointer flex relative items-center justify-evenly min-w-9 py-[6px] px-1 whitespace-nowrap">
                        <span>{subCategoryItems.qty} ct</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="h-9 flex flex-col basis-[54px] items-end justify-center">
                  ${subCategoryItems.qty * subCategoryItems.selling_price}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap cursor-pointer ml-[66px] gap-2">
              <button className="relative mr-4 cursor-pointer ">
                <span className="flex items-center text-ellipsis ">
                  <img src={ChooseReplacementSvg} alt="replacement-svg" />
                  <span className="text-gray-500">Choose replacement</span>
                </span>
              </button>
              <button className="relative mr-2 cursor-pointer ">
                <span className="flex items-center text-ellipsis ">
                  <img src={RemoveSvg} alt="remove-svg" />
                  <span
                    className="text-gray-500"
                    onClick={() =>
                      DeleteSubCategoryItemsProductsFromCart(subCategoryItems)
                    }
                  >
                    Remove
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SubCategoryCartItems;
