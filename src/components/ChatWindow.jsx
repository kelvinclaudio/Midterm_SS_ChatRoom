import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { useEffect, useState } from "react";
import { get, ref, onChildAdded } from "firebase/database";
import { auth, database } from "../firebase";

function ChatWindow({ room, onToggleSidebar }) {
  if (!room) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center text-muted">
        Select a room to start chatting.
      </div>
    );
  }
  const [messages, setMessages] = useState([]);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    if (!room?.key) return;

    const messagesRef = ref(database, `chatrooms/${room.key}/messages`);
    setMessages([]);
    setUsernames({});

    const unsubscribe = onChildAdded(messagesRef, async (snapshot) => {
      const msg = snapshot.val();

      // Show a notification if message is from someone else
      if (
        msg.sender !== auth.currentUser?.uid &&
        Notification.permission === "granted"
      ) {
        new Notification("New message", {
          body: msg.text,
          icon: "/assets/img/chat-icon.png", // optional: custom icon
        });
      }

      // Fetch username if not already cached
      if (!usernames[msg.sender]) {
        const userRef = ref(database, `users/${msg.sender}`);
        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.val();
          setUsernames((prev) => ({
            ...prev,
            [msg.sender]: {
              username: userData.username,
              profileImage: userData.profileImage || "/assets/img/avatar1.png",
            },
          }));
        }
      }

      setMessages((prev) => [...prev, msg]);
    });

    return () => unsubscribe();
  }, [room]);
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-dark text-white p-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <button
            onClick={onToggleSidebar}
            className="d-md-none border-0 bg-transparent me-3"
            style={{ padding: 0 }}
            aria-label="Toggle Sidebar"
          >
            <svg
              fill="white"
              height="24"
              width="24"
              viewBox="0 0 330 330"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
      c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394
      c-5.857,5.857-5.857,15.355,0,21.213c5.857,5.857,15.355,5.857,21.213,0
      l150-150.004C256.463,169.745,256.463,160.247,250.606,154.389z"
              />
            </svg>
          </button>

          <img
            src={room.groupImage || "/assets/img/groupImg.png"}
            alt="Group"
            className="rounded-circle bg-light me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <span className="fw-bold">{room.name}</span>
        </div>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto bg-secondary-subtle">
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            sender={
              msg.sender === auth.currentUser?.uid
                ? "Me"
                : usernames[msg.sender]?.username || "Unknown"
            }
            message={msg.text}
            time={new Date(msg.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            isOwnMessage={msg.sender === auth.currentUser?.uid}
            profileImage={
              usernames[msg.sender]?.profileImage || "/assets/img/avatar1.png"
            }
          />
        ))}
      </div>

      <ChatInput roomKey={room.key} />
    </div>
  );
}

export default ChatWindow;
