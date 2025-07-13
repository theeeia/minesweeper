import { useState, useEffect, type MouseEvent, useCallback } from "react";
import { useMutation } from "@apollo/client";
import {
  START_GAME,
  REVEAL_CELL,
  TOGGLE_FLAG,
  SUBMIT_SCORE,
} from "../graphql/operations";
import { useNavigate } from "react-router-dom";
import { GameOver } from "@/components/GameOver";
import { WonGame } from "@/components/WonGame";

type CurrentGame = {
  isFinished: boolean;
  elapsedTime: number;
  state: {
    mines: string[];
    revealed: string[];
    flagged: string[];
  };
};

export default function Game() {
  const [gameId, setGameId] = useState<string>();
  const [currentGame, setCurrentGame] = useState<CurrentGame>();
  const [startTime] = useState(() => Date.now());
  const navigate = useNavigate();
  const gameOver =
    currentGame?.state.mines.some((m) =>
      currentGame.state.revealed.includes(m)
    ) ?? false;

  const [startGame] = useMutation(START_GAME, {
    onCompleted: ({ startGame }) => {
      setGameId(startGame.id);
      setCurrentGame(startGame);
    },
  });
  const [revealCell] = useMutation(REVEAL_CELL, {
    onCompleted: ({ revealCell }) =>
      setCurrentGame((s) => ({ ...s!, ...revealCell })),
  });
  const [toggleFlag] = useMutation(TOGGLE_FLAG, {
    onCompleted: ({ toggleFlag }) =>
      setCurrentGame((s) => ({ ...s!, ...toggleFlag })),
  });
  const [submitScore] = useMutation(SUBMIT_SCORE, {
    onCompleted: () => navigate("/leaderboard"),
  });

  useEffect(() => {
    startGame();
  }, []);

  const restartGame = useCallback(() => {
    startGame();
    setGameId(undefined);
    setCurrentGame(undefined);
  }, [startGame]);

  if (!currentGame) return <p>Loading…</p>;

  if (currentGame.isFinished) {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);

    return <WonGame submitScore={submitScore} elapsed={elapsed} />;
  }

  return (
    <>
      {gameOver && <GameOver restartGame={restartGame} />}
      <div
        style={{
          display: "grid",
          gridTemplate: "repeat(16, 2rem) / repeat(16, 2rem)",
          gap: "2px",
          margin: "0 auto",
        }}
      >
        {Array.from({ length: 256 }).map((_, idx) => {
          const x = Math.floor(idx / 16);
          const y = idx % 16;
          const key = `${x},${y}`;

          const isMine =
            currentGame.state.mines.includes(key) && currentGame.isFinished;

          const isRevealed = currentGame.state.revealed.includes(key);
          const isFlagged = currentGame.state.flagged.includes(key);
          const count = (() => {
            const [i, j] = key.split(",").map(Number);
            return [-1, 0, 1]
              .flatMap((dx) => [-1, 0, 1].map((dy) => [i + dx, j + dy]))
              .filter(
                ([a, b]) => (a || b) && a >= 0 && a < 16 && b >= 0 && b < 16
              )
              .filter((n) =>
                currentGame.state.mines.includes(`${n[0]},${n[1]}`)
              ).length;
          })();

          return (
            <div
              key={key}
              onClick={
                gameOver
                  ? undefined
                  : () => revealCell({ variables: { gameId, x, y } })
              }
              onContextMenu={
                gameOver
                  ? undefined
                  : (e: MouseEvent) => {
                      e.preventDefault();
                      toggleFlag({ variables: { gameId, x, y } });
                    }
              }
              style={{
                width: "100%",
                height: "100%",
                background: isRevealed ? "#ddd" : "#bbb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {isMine
                ? "💣"
                : isRevealed
                ? count > 0
                  ? count
                  : ""
                : isFlagged
                ? "🚩"
                : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
