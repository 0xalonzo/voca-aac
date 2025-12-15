// src/App.tsx
import React, { useMemo, useState } from "react";
import { boards, HOME_ID } from "./boards";
import type { Tile } from "./boards";

function speakText(text: string) {
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = 1;
  utter.pitch = 1;
  utter.volume = 1;
  synth.speak(utter);
}

const CORE_TILES: Tile[] = [
  { id: "core_i", label: "I", speak: "i" },
  { id: "core_you", label: "you" },
  { id: "core_want", label: "want" },
  { id: "core_need", label: "need" },
  { id: "core_go", label: "go" },
  { id: "core_stop", label: "stop" },
  { id: "core_more", label: "more" },
  { id: "core_help", label: "help" },
  { id: "core_yes", label: "yes" },
  { id: "core_no", label: "no" },
];

export default function App() {
  const [boardId, setBoardId] = useState<string>(HOME_ID);
  const [history, setHistory] = useState<string[]>([HOME_ID]);
  const [utterance, setUtterance] = useState<string[]>([]);

  const board = useMemo(() => boards[boardId] ?? boards[HOME_ID], [boardId]);

  function goToBoard(nextId: string) {
    setBoardId(nextId);
    setHistory((h) => [...h, nextId]);
  }

  function goHome() {
    setBoardId(HOME_ID);
    setHistory([HOME_ID]);
  }

  function goBack() {
    setHistory((h) => {
      if (h.length <= 1) return h;
      const next = h.slice(0, -1);
      const last = next[next.length - 1] ?? HOME_ID;
      setBoardId(last);
      return next;
    });
  }

  function onTileClick(tile: Tile) {
    if (tile.toBoardId) {
      if (tile.toBoardId === HOME_ID) goHome();
      else goToBoard(tile.toBoardId);
      return;
    }

    const word = (tile.speak ?? tile.label).trim();
    if (!word) return;

    setUtterance((u) => [...u, tile.label]);
    speakText(word);
  }

  function speakSentence() {
    const sentence = utterance.join(" ").trim();
    if (!sentence) return;
    speakText(sentence);
  }

  function clearSentence() {
    setUtterance([]);
  }

  function deleteLast() {
    setUtterance((u) => u.slice(0, -1));
  }

  function tileStyle(t: Tile): React.CSSProperties {
    const isHomeTile = t.toBoardId === HOME_ID || t.id === "home";
    return isHomeTile ? { ...styles.tile, ...styles.tileHome } : styles.tile;
  }

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <div style={styles.brand}>Voca</div>

        <div style={styles.sentenceBox}>
          <div style={styles.sentenceText}>
            {utterance.length ? utterance.join(" ") : "Tap tiles to speak..."}
          </div>
        </div>

        <div style={styles.actions}>
          <button style={{ ...styles.button, ...styles.homeButton }} onClick={goHome}>
            Home
          </button>
          <button style={styles.button} onClick={goBack} disabled={history.length <= 1}>
            Back
          </button>
          <button style={styles.button} onClick={speakSentence} disabled={!utterance.length}>
            Speak
          </button>
          <button style={styles.button} onClick={deleteLast} disabled={!utterance.length}>
            Delete
          </button>
          <button style={styles.button} onClick={clearSentence} disabled={!utterance.length}>
            Clear
          </button>
        </div>
      </div>

      <div style={styles.boardHeader}>
        <div style={styles.boardTitle}>{board.title}</div>
      </div>

      <div style={styles.grid}>
        {board.tiles.map((t) => (
          <button key={t.id} style={tileStyle(t)} onClick={() => onTileClick(t)}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={styles.coreBar}>
        <div style={styles.coreLabel}>Core Words</div>
        <div style={styles.coreRow}>
          {CORE_TILES.map((t) => (
            <button key={t.id} style={{ ...styles.tile, ...styles.coreTile }} onClick={() => onTileClick(t)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: 16,
    boxSizing: "border-box",
    fontFamily:
      'system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
    background: "#0b1220",
    color: "white",
    paddingBottom: 120,
  },
  topBar: {
    display: "grid",
    gridTemplateColumns: "160px 1fr auto",
    gap: 12,
    alignItems: "center",
    marginBottom: 14,
  },
  brand: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 0.4,
  },
  sentenceBox: {
    background: "#111a2e",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: "12px 14px",
    minHeight: 52,
    display: "flex",
    alignItems: "center",
  },
  sentenceText: {
    fontSize: 18,
    opacity: 0.95,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
  },
  actions: { display: "flex", gap: 10, flexWrap: "wrap" },
  button: {
    background: "#1c2a4a",
    color: "white",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
  },
  homeButton: {
    background: "#1f7a3d",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  boardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  boardTitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
    gap: 12,
  },
  tile: {
    background: "#152043",
    color: "white",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 14,
    padding: "18px 12px",
    minHeight: 80,
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
  },
  tileHome: {
    background: "#1f7a3d",
    border: "1px solid rgba(255,255,255,0.18)",
  },
  coreBar: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    background: "rgba(11, 18, 32, 0.92)",
    borderTop: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(10px)",
  },
  coreLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  coreRow: {
    display: "grid",
    gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
    gap: 10,
  },
  coreTile: {
    minHeight: 64,
    padding: "12px 10px",
    fontSize: 16,
    borderRadius: 12,
  },
};
