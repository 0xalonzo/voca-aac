// src/App.tsx
import React, { useMemo, useState } from "react";
import { boards, CORE_TILES, HOME_ID } from "./boards";
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

type UserTile = Tile & { boardId: string };

const LS_KEY = "voca_user_tiles_v1";

function loadUserTiles(): UserTile[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveUserTiles(tiles: UserTile[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(tiles));
}

export default function App() {
  const [boardId, setBoardId] = useState<string>(HOME_ID);
  const [history, setHistory] = useState<string[]>([HOME_ID]);
  const [utterance, setUtterance] = useState<string[]>([]);
  const [userTiles, setUserTiles] = useState<UserTile[]>(() => loadUserTiles());

  // “Make your own button” UI
  const [showAdd, setShowAdd] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newSpeak, setNewSpeak] = useState("");
  const [newColor, setNewColor] = useState("#152043");
  const [newIcon, setNewIcon] = useState(""); // emoji for now

  const baseBoard = useMemo(() => boards[boardId] ?? boards[HOME_ID], [boardId]);

  const boardTiles = useMemo(() => {
    const extras = userTiles.filter((t) => t.boardId === boardId);
    return [...baseBoard.tiles, ...extras];
  }, [baseBoard.tiles, userTiles, boardId]);

  function goToBoard(nextId: string) {
    setBoardId(nextId);
    setHistory((h) => [...h, nextId]);
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

  function goHome() {
    setBoardId(HOME_ID);
    setHistory([HOME_ID]);
  }

  function onTileClick(tile: Tile) {
    if (tile.toBoardId) {
      goToBoard(tile.toBoardId);
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

  function addCustomTile() {
    const label = newLabel.trim();
    if (!label) return;

    const speak = newSpeak.trim();
    const icon = newIcon.trim();

    const tile: UserTile = {
      boardId,
      id: `u-${Date.now()}`,
      label,
      speak: speak.length ? speak : label,
      color: newColor,
      icon: icon.length ? icon : undefined,
    };

    const next = [...userTiles, tile];
    setUserTiles(next);
    saveUserTiles(next);

    setNewLabel("");
    setNewSpeak("");
    setNewIcon("");
    setNewColor("#152043");
    setShowAdd(false);
  }

  function tileStyle(t: Tile): React.CSSProperties {
    const isHomeTile = t.toBoardId === HOME_ID && t.label.toLowerCase() === "home";
    return {
      ...styles.tile,
      background: isHomeTile ? styles.homeTile.background : (t.color ?? styles.tile.background),
      border: isHomeTile ? styles.homeTile.border : styles.tile.border,
    };
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
          <button style={styles.button} onClick={goBack} disabled={history.length <= 1}>
            Back
          </button>
          <button style={styles.button} onClick={goHome}>
            Home
          </button>
          <button style={styles.button} onClick={speakSentence} disabled={!utterance.length}>
            Speak
          </button>
          <button style={styles.button} onClick={clearSentence} disabled={!utterance.length}>
            Clear
          </button>
          <button style={styles.addButton} onClick={() => setShowAdd(true)}>
            + Button
          </button>
        </div>
      </div>

      <div style={styles.boardHeader}>
        <div style={styles.boardTitle}>{baseBoard.title}</div>
        <div style={styles.boardHint}>Core words stay at the bottom</div>
      </div>

      {/* Main board tiles */}
      <div style={styles.gridWrap}>
        <div style={styles.grid}>
          {boardTiles.map((t) => (
            <button key={t.id} style={tileStyle(t)} onClick={() => onTileClick(t)}>
              <span style={styles.tileInner}>
                {t.icon ? <span style={styles.tileIcon}>{t.icon}</span> : null}
                <span>{t.label}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Core words pinned bottom */}
      <div style={styles.coreDock}>
        <div style={styles.coreGrid}>
          {CORE_TILES.map((t) => (
            <button key={t.id} style={styles.coreTile} onClick={() => onTileClick(t)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add button modal */}
      {showAdd ? (
        <div style={styles.modalOverlay} onClick={() => setShowAdd(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalTitle}>Add a custom button</div>

            <label style={styles.fieldLabel}>Label (what shows on the tile)</label>
            <input
              style={styles.input}
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="Example: Doctor"
            />

            <label style={styles.fieldLabel}>Speak text (optional)</label>
            <input
              style={styles.input}
              value={newSpeak}
              onChange={(e) => setNewSpeak(e.target.value)}
              placeholder="Example: I want to see the doctor"
            />

            <label style={styles.fieldLabel}>Icon (emoji for now, optional)</label>
            <input
              style={styles.input}
              value={newIcon}
              onChange={(e) => setNewIcon(e.target.value)}
              placeholder="Example: 🩺"
            />

            <label style={styles.fieldLabel}>Tile color</label>
            <input
              style={styles.colorInput}
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />

            <div style={styles.modalActions}>
              <button style={styles.button} onClick={() => setShowAdd(false)}>
                Cancel
              </button>
              <button style={styles.saveButton} onClick={addCustomTile} disabled={!newLabel.trim()}>
                Save
              </button>
            </div>

            <div style={styles.modalNote}>
              Saved tiles stay even after refresh.
            </div>
          </div>
        </div>
      ) : null}
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
    display: "flex",
    flexDirection: "column",
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
  actions: { display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" },
  button: {
    background: "#1c2a4a",
    color: "white",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
  },
  addButton: {
    background: "#2a3f7a",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 700,
  },
  boardHeader: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  boardTitle: { fontSize: 20, fontWeight: 700 },
  boardHint: { opacity: 0.7, fontSize: 13 },
  gridWrap: {
    flex: 1,
    minHeight: 0,
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
  tileInner: {
    display: "inline-flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIcon: { fontSize: 22, lineHeight: 1 },
  homeTile: {
    background: "#1f7a3b",
    border: "1px solid rgba(255,255,255,0.22)",
  },

  // Core words dock (pinned bottom)
  coreDock: {
    marginTop: 14,
    paddingTop: 12,
    borderTop: "1px solid rgba(255,255,255,0.12)",
  },
  coreGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
    gap: 10,
  },
  coreTile: {
    background: "#0f1a34",
    color: "white",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 12,
    padding: "14px 10px",
    minHeight: 54,
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  modal: {
    width: "min(520px, 100%)",
    background: "#0f1830",
    border: "1px solid rgba(255,255,255,0.14)",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
  },
  modalTitle: { fontSize: 18, fontWeight: 800, marginBottom: 12 },
  fieldLabel: { display: "block", marginTop: 10, marginBottom: 6, opacity: 0.9 },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "#111a2e",
    color: "white",
    outline: "none",
  },
  colorInput: {
    width: 84,
    height: 40,
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "transparent",
    padding: 0,
    cursor: "pointer",
  },
  modalActions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 },
  saveButton: {
    background: "#2f8a4a",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    borderRadius: 10,
    padding: "10px 12px",
    cursor: "pointer",
    fontSize: 14,
    fontWeight: 800,
  },
  modalNote: { marginTop: 10, opacity: 0.7, fontSize: 12 },
};
