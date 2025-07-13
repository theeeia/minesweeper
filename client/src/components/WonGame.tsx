import { useState } from "react";

interface WonGameProps {
  submitScore: (options: {
    variables: { initials: string; time: number };
  }) => void;
  elapsed: number;
}

export const WonGame = ({ submitScore, elapsed }: WonGameProps) => {
  const [initials, setInitials] = useState("");
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
        <p>You won in {elapsed}s!</p>
        <div>
          Enter initials:
          <input
            style={{
              border: "1px solid black",
              borderRadius: "8px",
              marginLeft: "10px",
            }}
            required
            onChange={(e) => setInitials(e.target.value.toUpperCase())}
          />
          <div>
            <button
              onClick={() =>
                submitScore({ variables: { initials, time: elapsed } })
              }
              disabled={initials.length === 0}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                border: "1px solid black",
                borderRadius: "8px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
