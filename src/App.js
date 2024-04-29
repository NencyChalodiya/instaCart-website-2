import "./App.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import BrandStoreCategoryPage from "./pages/BrandStoreCategoryPages/BrandStoreCategoryPage";
import OffersCategoryPage from "./pages/OffersCategoryPage/OffersCategoryPage";
import YourOrders from "./pages/StoreSidebarPages/YourOrders";
import YourLists from "./pages/StoreSidebarPages/YourLists";
import YourRecipes from "./pages/StoreSidebarPages/YourRecipes";
import AccountSettings from "./pages/StoreSidebarPages/AccountSettings/AccountSettings";
import InstaCart_Plus from "./pages/StoreSidebarPages/InstaCart_Plus";
import Refferals from "./pages/StoreSidebarPages/Refferals";
import Gift_Cards from "./pages/StoreSidebarPages/Gift_Cards";
import Manage_promos from "./pages/StoreSidebarPages/Manage_promos";
import HelpCenter from "./pages/StoreSidebarPages/HelpCenter";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";

import GetProductsBasedOnShops from "./components/HomePageComponents/ShopListing/GetProductsBasedOnShops";

function App() {
  const location = useLocation();
  console.log(location);
  const userData = JSON.parse(localStorage.getItem("userData"));
  //console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.pathname.includes("/change-password")) {
      if (!userData || !userData?.id) {
        navigate("/"); // Redirect to login if userData is not present
      } else {
        navigate("/store");
      }
    }
  }, []);

  return (
    <>
      <Routes>
        {userData ? (
          <>
            <Route path="/store" element={<Home />} />
            <Route
              path="/store/:storeId"
              element={<BrandStoreCategoryPage />}
            />
            <Route
              path="/store/:offerTitle/:offerId"
              element={<OffersCategoryPage />}
            />
            <Route path="/store/orders" element={<YourOrders />} />
            <Route path="/store/your-lists" element={<YourLists />} />
            <Route path="/store/recipes" element={<YourRecipes />} />
            <Route path="/store/account" element={<AccountSettings />} />
            <Route path="/store/instacart-plus" element={<InstaCart_Plus />} />
            <Route path="/store/referrals" element={<Refferals />} />
            <Route path="/store/gift-cards" element={<Gift_Cards />} />
            <Route path="/store/manage_promos" element={<Manage_promos />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route
              path="/products/:shopId"
              element={<GetProductsBasedOnShops />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/change-password/:token"
              element={<ForgotPassword />}
            />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
