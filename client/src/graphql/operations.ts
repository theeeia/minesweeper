import { gql } from "@apollo/client";

export const START_GAME = gql`
  mutation StartGame {
    startGame {
      id
      state {
        mines
        revealed
        flagged
      }
      elapsedTime
      isFinished
    }
  }
`;

export const REVEAL_CELL = gql`
  mutation RevealCell($gameId: String!, $x: Int!, $y: Int!) {
    revealCell(gameId: $gameId, x: $x, y: $y) {
      state {
        mines
        revealed
        flagged
      }
      isFinished
    }
  }
`;

export const TOGGLE_FLAG = gql`
  mutation ToggleFlag($gameId: String!, $x: Int!, $y: Int!) {
    toggleFlag(gameId: $gameId, x: $x, y: $y) {
      state {
        mines
        revealed
        flagged
      }
      isFinished
    }
  }
`;

export const SUBMIT_SCORE = gql`
  mutation SubmitScore($initials: String!, $time: Int!) {
    submitScore(initials: $initials, time: $time) {
      initials
      time
      date
    }
  }
`;

export const TOP_SCORES = gql`
  query TopScores {
    topScores {
      initials
      time
      date
    }
  }
`;
