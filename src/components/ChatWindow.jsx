import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

function ChatWindow({ onToggleSidebar }) {
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
            src="https://via.placeholder.com/40"
            alt="Group"
            className="rounded-circle bg-light me-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <span className="fw-bold">Warung Bang Yana</span>
        </div>
      </div>

      <div className="flex-grow-1 p-3 overflow-auto bg-secondary-subtle">
        <ChatMessage
          sender="Didik"
          message="Sudah di dorm 13 ya"
          time="12:09 PM"
          isOwnMessage={false}
        />
        <ChatMessage
          sender="Me"
          message="Oke aku otw"
          time="12:10 PM"
          isOwnMessage={true}
        />
      </div>

      <ChatInput />
    </div>
  );
}

export default ChatWindow;
