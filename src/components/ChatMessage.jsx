function ChatMessage({ sender, message, time, isOwnMessage, profileImage }) {
  return (
    <div
      className={`d-flex ${
        isOwnMessage ? "justify-content-end" : "justify-content-start"
      } mb-3`}
    >
      {!isOwnMessage && (
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
      )}

      <div>
        {!isOwnMessage && <div className="text-muted small mb-1">{sender}</div>}
        <div
          className={`p-2 rounded ${
            isOwnMessage ? "bg-primary text-white" : "bg-light"
          }`}
          style={{ maxWidth: "300px", wordBreak: "break-word" }}
        >
          {message}
        </div>
        <div className="text-muted small mt-1 text-end">{time}</div>
      </div>
    </div>
  );
}

export default ChatMessage;
