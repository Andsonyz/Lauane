import React, { useState, useEffect } from "react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [btnPos, setBtnPos] = useState({ top: "50%", left: "50%" });

  const fotosLocais = [
    "lauane.png", 
    "lauane1.png", 
    "lauane2.png",
    "lauane3.png",
    "lauane4.png"
  ];

  const messages = [
    "Lauane Cabeçuda...",
    "Antes de pedir, eu ja estava fazendo isso aqui...",
    "Eu sei que errei... então serve como pedido de desculpas.",
    "Você é alguém incrível, de verdade.",
    "E por eu ser alguém que não gosta de tratar as pessoas mal.",
    "Principalmente minha Gatinha linda... 🥺",
    "Portanto, queria que soubesse que eu jamais faria algo pra te machucar.",
    "Então...",
    "Preciso te falar uma coisa...",
    "VOCE É MT GATA pqp, não há chance em te deixar magoada ❤️",
  ];

  const heartEmojis = ["❤️", "💖", "💗", "💓", "💕", "🤍", "🌸", "💌"];

  const handleGameClick = () => {
    if (score < 99) {
      setScore(prev => prev + 1);
    } else {
      const randomTop = Math.floor(Math.random() * 60) + 20 + "%";
      const randomLeft = Math.floor(Math.random() * 60) + 20 + "%";
      setBtnPos({ top: randomTop, left: randomLeft });
    }
  };

  return (
    <div style={styles.container}>
      
      {/* BACKGROUND COM ANIMAÇÃO DE ENTRADA */}
      <div style={{
        ...styles.infiniteWrapper,
        opacity: started ? 1 : 0,
        transition: "opacity 2s ease-in-out" // Fundo surge suavemente em 2 segundos
      }}>
        <div style={styles.track}>
          {[...fotosLocais, ...fotosLocais, ...fotosLocais].map((img, index) => (
            <div
              key={index}
              style={{
                ...styles.bgImageItem,
                backgroundImage: `url(${img})`,
              }}
            />
          ))}
        </div>
        <div style={styles.overlay} />
      </div>

      {!started ? (
        <div style={styles.initialCard}>
          <h2 style={{ marginBottom: 15, color: "#fff" }}>💌 Para você, Lauane</h2>
          <p style={{ marginBottom: 25, color: "#ccc" }}>Toque no botão abaixo...</p>
          <button style={styles.primaryButton} onClick={() => setStarted(true)}>
            Abrir ❤️
          </button>
        </div>
      ) : (
        /* CARD PRINCIPAL COM ANIMAÇÃO DE SURGIMENTO */
        <div style={styles.cardAnimado}>
          <div style={styles.videoWrapper}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/-YzDsDMYqdw?autoplay=1&rel=0&controls=0"
              title="YouTube player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              style={{ position: "absolute", top: 0, left: 0, borderRadius: "15px" }}
            ></iframe>
          </div>

          {!choice ? (
            <>
              <div style={styles.messageBox}>
                <p key={step} style={styles.fadeInText}>{messages[step] || ""}</p>
              </div>
              <button style={styles.button} onClick={() => step < messages.length - 1 ? setStep(step + 1) : setChoice("pergunta")}>
                {step < messages.length - 1 ? "Continuar ➜" : "Ver pergunta ❤️"}
              </button>
            </>
          ) : choice === "pergunta" ? (
            <div style={styles.choiceContainer}>
              <p style={{ marginBottom: 15, fontWeight: "bold", color: "#fff" }}>Você me perdoa? 🥺</p>
              <button style={styles.button} onClick={() => setChoice("sim")}>Sim ❤️</button>
              <button style={styles.secondaryButton} onClick={() => setChoice("game")}>Não 💔</button>
            </div>
          ) : choice === "sim" ? (
            <div style={styles.final}>
              <h2 style={{ color: "#ff4d6d" }}>Obrigado, Lauane ❤️</h2>
              <p style={{ color: "#eee" }}>Prometo que vou fazer cada dia valer a pena.</p>
              <button style={styles.secondaryButton} onClick={() => {setChoice(null); setStep(0)}}>Recomeçar</button>
            </div>
          ) : (
            <div style={{ minHeight: "220px" }}>
              <h3 style={{ fontSize: '1.1rem', color: "#fff" }}>Prove que não me perdoa...</h3>
              <div style={styles.scoreBoard}>{score} / 100</div>
              <div style={styles.gameArea}>
                <button
                  onClick={handleGameClick}
                  onMouseEnter={score >= 99 ? handleGameClick : undefined}
                  style={{
                    ...styles.gameButton,
                    position: score >= 99 ? "fixed" : "relative",
                    top: score >= 99 ? btnPos.top : "auto",
                    left: score >= 99 ? btnPos.left : "auto",
                  }}
                >❤️</button>
              </div>
              <button style={styles.secondaryButton} onClick={() => {setChoice(null); setScore(0);}}>Mudei de ideia 🥺</button>
            </div>
          )}
        </div>
      )}

      {/* Corações Caindo */}
      <div style={{ pointerEvents: "none" }}>
        {[...Array(25)].map((_, i) => (
          <span key={i} style={{
            position: "fixed", top: -50, left: Math.random() * 100 + "%",
            fontSize: "20px", animation: `fall ${6 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`, zIndex: 1
          }}>{heartEmojis[i % heartEmojis.length]}</span>
        ))}
      </div>

      <style>{`
        @keyframes fadeInScale { 
          from { opacity: 0; transform: scale(0.8); } 
          to { opacity: 1; transform: scale(1); } 
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fall { 0% { transform: translateY(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(110vh); opacity: 0; } }
        @keyframes scrollBackground {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; font-family: sans-serif; }
      `}</style>
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex", justifyContent: "center", alignItems: "center",
    height: "100vh", width: "100vw", position: "relative", overflow: "hidden"
  },
  infiniteWrapper: {
    position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 0
  },
  track: {
    display: "flex", height: "100%", width: "fit-content",
    animation: "scrollBackground 60s linear infinite",
  },
  bgImageItem: {
    width: "100vw", height: "100%", backgroundSize: "cover", backgroundPosition: "center",
    flexShrink: 0, opacity: 0.45,
  },
  overlay: {
    position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
    background: "radial-gradient(circle, transparent 10%, rgba(0,0,0,0.85) 100%)",
  },
  initialCard: {
    width: "85%", maxWidth: "350px", padding: "30px", borderRadius: "30px",
    background: "rgba(30, 30, 30, 0.9)", textAlign: "center", zIndex: 10,
    border: "1px solid rgba(255,255,255,0.1)",
  },
  cardAnimado: {
    width: "85%", maxWidth: "380px", padding: "20px", borderRadius: "25px",
    background: "rgba(20, 20, 20, 0.8)", backdropFilter: "blur(15px)",
    textAlign: "center", zIndex: 10, border: "1px solid rgba(255,255,255,0.1)",
    animation: "fadeInScale 1s ease-out forwards", // Efeito de zoom suave ao aparecer
  },
  videoWrapper: { width: "100%", paddingTop: "56.25%", position: "relative", marginBottom: 15, borderRadius: "12px", overflow: "hidden" },
  messageBox: { minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" },
  fadeInText: { animation: "fadeIn 0.6s forwards", fontSize: "1.1rem", color: "#fff", lineHeight: "1.4" },
  button: { padding: "16px", borderRadius: "12px", border: "none", background: "#ff4d6d", color: "white", fontWeight: "bold", width: "100%", cursor: "pointer", transition: "0.2s" },
  secondaryButton: { padding: "10px", borderRadius: "12px", border: "1px solid #444", background: "transparent", color: "#ccc", width: "100%", marginTop: "10px", cursor: "pointer" },
  primaryButton: { padding: "18px", borderRadius: "15px", border: "none", background: "#ff2e63", color: "white", fontWeight: "bold", width: "100%", fontSize: "1.1rem", cursor: "pointer" },
  scoreBoard: { fontSize: "1.8rem", fontWeight: "900", color: "#ff4d6d", margin: "10px 0" },
  gameArea: { height: "100px", display: "flex", justifyContent: "center", alignItems: "center" },
  gameButton: { fontSize: "45px", background: "none", border: "none", cursor: "pointer" }
};