export const GameOver = ({ restartGame }: { restartGame: () => void }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "200px",
        }}
      >
        <h2>Game Over</h2>
        <button
          onClick={restartGame}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            border: "1px solid black",
            borderRadius: "8px",
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
};
