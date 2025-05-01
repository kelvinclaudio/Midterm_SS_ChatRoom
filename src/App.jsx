import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  const sidebarStyle = {
    width: "300px",
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    zIndex: 1051,
    transform: isDesktop || showSidebar ? "translateX(0)" : "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
  };

  const showBackdrop = !isDesktop && showSidebar;

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <div className="bg-dark text-white sidebar-slide" style={sidebarStyle}>
        <Sidebar
          onSelectRoom={(room) => {
            setSelectedRoom(room);
            if (!isDesktop) setShowSidebar(false); // auto-close sidebar on mobile
          }}
        />
      </div>

      {showBackdrop && (
        <div
          className="d-md-none"
          onClick={() => setShowSidebar(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1050,
          }}
        />
      )}

      <div
        className="flex-grow-1"
        style={{
          marginLeft: isDesktop ? "300px" : "0",
          transition: "margin-left 0.3s ease",
          height: "100%",
        }}
      >
        <ChatWindow
          room={selectedRoom}
          onToggleSidebar={() => setShowSidebar((prev) => !prev)}
        />
      </div>
    </div>
  );
}

export default App;
