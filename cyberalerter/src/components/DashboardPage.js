// PreviewComponent.js
import React, { useEffect, useState } from "react";
import { Upgrade } from "../helpers/apiRequests";
import BarChart from "../helpers/Barchart";
const PreviewComponent = ({ qucikScanData }) => {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [severityCountx, setSeverityCount] = useState({
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  });
  
console.log("quickScanCount ",qucikScanData,  qucikScanData?.severityCount)
  const [userData,setUserData]=useState(null)


useEffect(()=>{
 if(qucikScanData && qucikScanData.severityCount){
  setSeverityCount(qucikScanData?.severityCount)
 }
},[qucikScanData])

useEffect(()=>{
  let user= localStorage.getItem("userData") ?? null;
   if(user)
    setUserData(JSON.parse(user));
    console.log("[sub] initialized userdata", user)
},[])

  useEffect(() => {
    if(userData)
    userData?.subscriptionPlan == "Free"
      ? setShowSubscribe(true)
      : setShowSubscribe(false);
    console.log("[sub] initialized Subscription for user data") 
  }, [userData]);

  useEffect(()=>{

      setUserData(JSON.parse( localStorage.getItem("userData") ))
      console.log("[sub] when showsubscribe changed")
  },[showSubscribe])

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* First Division (Card) */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3>
          <b>Total Vunerabilities</b>
        </h3>
        <BarChart data={severityCountx} />
      </div>

      {/* Second Division (2x2 Cards) */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3>
            <b>Quick Scans </b>
          </h3>
          <p>Today : {qucikScanData?.scansToday}</p>
          <p>scans left :  {qucikScanData?.scansLeftToday}</p>
          
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
        <h3>
            <b>Monitor Scans </b>
          </h3>
          <p>Today : 0</p>
          <p>scans left :  20 or 10</p>
          
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
           what can we add here? time stamp?
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3>
            <b>Subscription plan</b>
          </h3>
          {showSubscribe ? (
            <button
              onClick={() => {
                Upgrade();
                setShowSubscribe(false);
              }}
              className="p-2 text-green-400 border-2 border-green-400 rounded-lg"
            >
              {" "}
              upgrade
            </button>
          ):(
            <div>you are a pro user</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
