import { useState } from "react";
import { auth, database } from "../firebase";
import { ref, push } from "firebase/database";

function ChatInput({ roomKey }) {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || !roomKey) return;

    const user = auth.currentUser;
    if (!user) return;

    const messageObj = {
      text: trimmed,
      sender: user.uid,
      timestamp: Date.now(),
    };

    try {
      await push(ref(database, `chatrooms/${roomKey}/messages`), messageObj);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-3 border-top bg-light">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
