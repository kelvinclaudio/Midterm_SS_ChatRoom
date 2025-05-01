import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { ref, get, update } from "firebase/database";
import { useAuth } from "../AuthContext";
import { signOut } from "firebase/auth";

function UserProfile() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, "users/" + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUsername(data.username);
            setDisplayName(data.username);
            setProfileImage(data.profileImage);
            console.log(data);
          } else {
            console.log("No user data found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    setShowModal(false);
  };

  const handleSave = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, "users/" + currentUser.uid);
      update(userRef, {
        username: displayName,
        profileImage: profileImage,
      })
        .then(() => {
          setUsername(displayName);
          alert("Username updated successfully!");
          setShowModal(false);
        })
        .catch((error) => {
          console.error("Failed to update username:", error);
          alert("Failed to update username.");
        });
    }
  };

  if (!user) return null;

  return (
    <>
      <div
        className="bg-dark text-white border-top d-flex align-items-center justify-content-between px-3"
        style={{ height: "64px" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={profileImage}
            alt="profile"
            className="me-2"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "white",
            }}
          />
          <div>
            <div
              className="fw-semibold text-truncate"
              style={{ maxWidth: "140px" }}
            >
              {username}
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
                    onClick={() => {
                      setDisplayName(username);
                      setProfileImage(profileImage);
                      setShowModal(false);
                    }}
                  />
                </div>

                <div className="modal-body text-center">
                  <img
                    src={profileImage}
                    alt="profile"
                    className="me-2"
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      objectFit: "cover",
                      backgroundColor: "white",
                      border: "1px solid black",
                    }}
                  />

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
