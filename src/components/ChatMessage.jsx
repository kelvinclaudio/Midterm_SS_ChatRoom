function ChatMessage({ sender, message, time, isOwnMessage }) {
  return (
    <div
      className={`d-flex ${
        isOwnMessage ? "justify-content-end" : "justify-content-start"
      } mb-3`}
    >
      {!isOwnMessage && (
        <div className="me-2">
          <div
            className="rounded-circle bg-secondary"
            style={{ width: 32, height: 32 }}
            title={sender}
          />
        </div>
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
