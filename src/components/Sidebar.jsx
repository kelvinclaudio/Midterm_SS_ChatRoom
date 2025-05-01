import { useState } from "react";

function Sidebar() {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      if (mode === "create") {
        alert(`Creating group: ${inputValue}`);
      } else {
        alert(`Joining group with code: ${inputValue}`);
      }
      setInputValue("");
      setShowModal(false);
    }
  };

  const chats = [
    {
      name: "Warung Bang Yana",
      message: "Sudah di dorm 13 ya",
      time: "12:09 PM",
    },
    { name: "kerja kelompok", message: "wah tai", time: "1:25 PM" },
    { name: "Geraldo Yovan", message: "You were mentioned.", time: "12:24 PM" },
  ];

  return (
    <>
      <div className="p-3 h-100 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Chats</h5>
          <button
            className="btn btn-sm btn-outline-light"
            onClick={() => {
              setMode("create");
              setShowModal(true);
            }}
          >
            Join Group
          </button>
        </div>

        {chats.map((chat, i) => (
          <div key={i} className="d-flex align-items-center py-2 border-bottom">
            <div
              className="rounded-circle bg-secondary me-2"
              style={{ width: 40, height: 40 }}
            ></div>
            <div className="flex-grow-1">
              <div className="fw-bold">{chat.name}</div>
              <small>{chat.message}</small>
            </div>
            <div className="text-muted small ms-2">{chat.time}</div>
          </div>
        ))}
      </div>

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>

          <div
            className="modal fade show d-block"
            role="dialog"
            tabIndex="-1"
            style={{
              zIndex: 1050,
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {mode === "create"
                      ? "Create New Group"
                      : "Join Existing Group"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="btn-group w-100 mb-3">
                    <button
                      className={`btn ${
                        mode === "create"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => {
                        setMode("create");
                        setInputValue("");
                      }}
                    >
                      ➕ Create
                    </button>
                    <button
                      className={`btn ${
                        mode === "join" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => {
                        setMode("join");
                        setInputValue("");
                      }}
                    >
                      🔗 Join
                    </button>
                  </div>

                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder={
                      mode === "create"
                        ? "Enter group name"
                        : "Enter group code"
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  <button
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                    disabled={!inputValue.trim()}
                  >
                    {mode === "create" ? "Create Group" : "Join Group"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;
