import { useState } from "react";
import { auth } from "../firebase";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";

function UserProfile() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");

  const handleLogout = () => {
    signOut(auth);
    setShowModal(false);
  };

  const handleSave = () => {
    alert(`Saved name: ${displayName}`);
    setShowModal(false);
  };

  if (!user) return null;

  return (
    <>
      <div
        className="bg-dark text-white border-top d-flex align-items-center justify-content-between px-3"
        style={{ height: "64px" }}
      >
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-secondary me-2"
            style={{ width: 40, height: 40 }}
          ></div>
          <div>
            <div
              className="fw-semibold text-truncate"
              style={{ maxWidth: "140px" }}
            >
              {user.email.split("@")[0]}
            </div>
          </div>
        </div>
        <i
          className="bi bi-gear text-white fs-5"
          style={{ cursor: "pointer" }}
          onClick={() => setShowModal(true)}
        />
      </div>

      {showModal && (
        <>
          <div
            className="modal-backdrop fade show"
            style={{ zIndex: 1040 }}
          ></div>

          <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
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
              <div className="modal-content p-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title">Profile Settings</h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>

                <div className="modal-body text-center">
                  <div
                    className="rounded-circle bg-secondary mx-auto mb-3"
                    style={{ width: 100, height: 100 }}
                  ></div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Display Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={user.email}
                      disabled
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 d-flex justify-content-between">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
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

export default UserProfile;
