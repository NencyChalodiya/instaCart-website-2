import React from "react";
import Navbar from "../../components/LandingPageComponents/Navbar";

const YourRecipes = () => {
  return (
    <>
      <Navbar />
      <div>
        <div className="bg-white">
          <div className="min-h-screen bg-white">
            <div className="pt-16">
              <div className="flex items-center justify-between">
                <div className="px-16 pt-8 pb-1 text-3xl font-bold leading-7 text-[#343538]">
                  Recipes
                </div>
                <div className="flex items-center gap-1 px-16 pt-12 pb-1">
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    fill="#72767E"
                    xmlns="http://www.w3.org/2000/svg"
                    color="systemGrayscale50"
                    class="e-1m01c8l"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 4.5v14.117c0 .254 0 .465.002.644q.238-.117.577-.287l2.811-1.405.051-.026c.187-.095.573-.292 1.006-.373a3 3 0 0 1 1.106 0c.433.08.82.278 1.006.373l.051.026 2.811 1.406.577.286c.002-.179.002-.39.002-.644V4.5H7M5.164 3.32C5 3.639 5 4.059 5 4.9v13.717c0 1.285 0 1.928.27 2.316a1.5 1.5 0 0 0 1.01.624c.468.069 1.043-.219 2.193-.794l2.811-1.405c.263-.131.394-.197.532-.223a1 1 0 0 1 .368 0c.138.026.27.092.532.223l2.81 1.405c1.15.575 1.726.863 2.193.794a1.5 1.5 0 0 0 1.01-.624c.271-.387.271-1.03.271-2.316V4.9c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656c-.32-.163-.74-.163-1.581-.163H7.4c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656"
                    ></path>
                  </svg>

                  <span className="text-base">Saved</span>
                </div>
              </div>
              {/* <div>
                <div className="flex pb-7">
                  <span className="px-16 ">
                    <button className="  box-border border-[2px] min-w-[58px] h-8 rounded-[18px] m-1 relative px-4 bg-[#E8E9EB]">
                      All
                    </button>
                  </span>
                  <span className="pr-16">
                    <button className="box-border border-[2px] min-w-[58px] h-8 rounded-[18px] m-1 relative px-4 bg-[#E8E9EB] font-normal">
                      Created by me
                    </button>
                  </span>
                </div>
              </div> */}

              <div>
                <div className="flex px-16 text-2xl font-semibold text-gray-700 py-9">
                  <span className="">Saved recipes</span>
                </div>
              </div>
              <div className="max-w-[500px] mx-auto">
                <div className="pt-12 pb-12 text-center">
                  <div className="text-sm leading-4 text-[#797D85] font-medium">
                    No saved recipes yet
                  </div>
                  <p className="text-sm leading-4 text-[#8A8D94]">
                    Keep track of what’s delicious. When you save recipes,
                    they’ll show up right here.
                  </p>
                </div>
              </div>
              <div className="mt-12 "></div>
              <div className="px-16 my-12">
                <div className="mb-6">
                  <h1 className="text-xl leading-6">
                    Explore main ingredients1
                  </h1>
                </div>
              </div>
              <div>
                <div className="relative flex flex-row">
                  <div className="w-full">
                    <ul className="w-full h-full gap-6 bg-cover gird grid-col-6 isolate">
                      <li>
                        <a className="relative block">
                          <div className="flex rounded-xl h-[92px]">
                            <div className="pt-4 px-2 min-w-[1%] flex-grow flex-shrink">
                              <span className="text-sm leading-4">
                                Vegetables
                              </span>
                            </div>
                            <div
                              className="w-[70px] bg-no-repeat bg-cover"
                              style={{
                                backgroundImage:
                                  "url(https://www.instacart.com/image-server/200x200/d2lnr5mha7bycj.cloudfront.net/collections/collection-collection/image/fd4f6b73-8929-43e9-bebe-b2c5623f01a2.png)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default YourRecipes;
