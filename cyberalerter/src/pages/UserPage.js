import { useEffect, useState } from "react";
import { getAPI, postAPI, Upgrade } from "../helpers/apiRequests";
import Sidebar from "../components/sidebar";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const UserPage = () => {
  const storedData = localStorage.getItem("userData");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  const logout = () => {
    postAPI({
      endpoint: "/Users/logout",
      params: {
        token: Cookies.get("token"),
      },
      callback: (response) => {
        if (response.status === 200) {
          // Handle success, e.g., display a success message
          localStorage.removeItem("userData");
          Cookies.remove("token");
          Cookies.remove("userId");
          navigate("/");
        } else {
          // Handle error response
          console.error(response.data.message);
        }
      },
    });
  };

  useEffect(() => {
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, [storedData]);

  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar isActive={isActive} />
      
      {/* Main content on the right */}
      <div className="flex-1 ml-24 p-6 mr-20 w-1/2"> {/* Adjusted width to make it less wide */}
        {/* Header at the top */}
        <h2 className="text-2xl font-bold mb-4">User Information</h2>
        {userData ? (
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                value={userData.username}
                readOnly
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={userData.email}
                readOnly
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Subscription Plan</label>
              <input
                type="text"
                value={userData.subscriptionPlan}
                readOnly
                className="w-full p-2 border rounded-md"
              />

              {userData.subscriptionPlan=="Free" && <button onclick={Upgrade()}className="text-green-500 border-2 border-green-800 hover:text-green hover:bg-green-200">
                 upgrade to Pro now
              </button>}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Quick Scan Limit</label>
              <input
                type="number"
                value={userData.scanLimit.quickScan}
                readOnly
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Quick Scans Performed Today</label>
              <input
                type="number"
                value={userData.scansPerformedToday.quickScan}
                readOnly
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <button
                type="button"
                onClick={logout}
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
              >
                Logout
              </button>
            </div>
          </form>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserPage;
