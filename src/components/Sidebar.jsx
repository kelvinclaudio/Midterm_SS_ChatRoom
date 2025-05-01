import { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { push, ref, set, get, update, onValue } from "firebase/database";
import UserProfile from "./UserProfile";

function Sidebar({ onSelectRoom }) {
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create");
  const [inputValue, setInputValue] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userRooms, setUserRooms] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, "users/" + user.uid);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUsername(data.username);
            setProfileImage(data.profileImage);
            console.log(data);
          } else {
            console.log("No user data found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });

      const chatroomsRef = ref(database, "chatrooms");
      onValue(chatroomsRef, (snapshot) => {
        if (snapshot.exists()) {
          const rooms = snapshot.val();
          const filteredRooms = [];

          for (const key in rooms) {
            if (rooms[key].members && rooms[key].members[user.uid]) {
              filteredRooms.push({
                key,
                name: rooms[key].name,
                groupImage:
                  rooms[key].groupImage || "/assets/img/groupProfile.png",
              });
              console.log(rooms[key].groupImage);
            }
          }

          setUserRooms(filteredRooms);
        } else {
          setUserRooms([]); // no rooms found
        }
      });
    }
  }, []);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (!inputValue.trim()) return;

    try {
      if (mode === "create") {
        // Create a new chatroom with a unique key
        const roomKey = push(ref(database, "chatrooms")).key;
        await set(ref(database, `chatrooms/${roomKey}`), {
          name: inputValue,
          createdBy: user.uid,
          groupImage: "/assets/img/groupProfile.png",
          createdAt: Date.now(),
          members: {
            [user.uid]: true,
          },
          messages: {},
        });

        alert(`Group "${inputValue}" created! Group code: ${roomKey}`);
      } else {
        // Join existing chatroom
        const roomKey = inputValue.trim();
        const roomRef = ref(database, `chatrooms/${roomKey}`);
        const snapshot = await get(roomRef);

        if (snapshot.exists()) {
          await update(ref(database, `chatrooms/${roomKey}/members`), {
            [user.uid]: true,
          });
          alert(`Joined group "${snapshot.val().name}"`);
        } else {
          alert("Group not found. Check the code and try again.");
          return;
        }
      }

      setInputValue("");
      setShowModal(false);
    } catch (error) {
      console.error("Error in chatroom handling:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // const chats = userRooms;

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

        {userRooms.map((chat, i) => (
          <div
            key={i}
            className="d-flex align-items-center py-2 border-bottom"
            onClick={() => onSelectRoom(chat)}
          >
            <img
              src={chat.groupImage}
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
            <div className="flex-grow-1">
              <div className="fw-bold">{chat.name}</div>
              <small>Code: {chat.key}</small>
            </div>
          </div>
        ))}
      </div>

      <div className="position-absolute bottom-0 start-0 w-100">
        <UserProfile />
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
