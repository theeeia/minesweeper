import { useQuery } from "@apollo/client";
import { TOP_SCORES } from "../graphql/operations";
import { useNavigate } from "react-router";

type Entry = {
  initials: string;
  time: number;
  date: string;
};

export default function Leaderboard() {
  const { data, loading, error } = useQuery<{ topScores: Entry[] }>(
    TOP_SCORES,
    {
      fetchPolicy: "network-only",
    }
  );

  const navigate = useNavigate();

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p>Error loading leaderboard.</p>;

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Top 10 Fastest Wins</h2>
      <ol style={{ padding: 0, listStyle: "decimal inside" }}>
        {data!.topScores.map(({ initials, time, date }, i) => (
          <li key={i} style={{ margin: "0.5rem 0" }}>
            <strong>{initials}</strong> — {time}s on{" "}
            {new Date(date).toLocaleDateString()}
          </li>
        ))}
      </ol>
      <button
        onClick={() => navigate("/game")}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          border: "1px solid black",
          borderRadius: "8px",
        }}
      >
        Play
      </button>
    </div>
  );
}
