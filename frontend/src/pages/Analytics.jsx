import { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    // Load the Tableau visualization
    const initViz = () => {
      const containerDiv = document.getElementById("vizContainer");
      const url =
        "https://public.tableau.com/views/Marketbasketanalysis_17180361008960/Sheet1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

      if (window.tableau) {
        new window.tableau.Viz(containerDiv, url);
      }
    };

    initViz();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Analytics</h1>
      </div>
      <div id="vizContainer" style={{ width: "100%", height: "700px" }}></div>
    </div>
  );
};

export default Analytics;
