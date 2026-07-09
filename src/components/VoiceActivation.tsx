import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2 } from "lucide-react";

const VOICE_COMMANDS: Record<string, { action: () => void; response: string }> = {
  about: { action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), response: "Navigating to About section..." },
  projects: { action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }), response: "Opening Projects section..." },
  skills: { action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }), response: "Opening Skills section..." },
  terminal: { action: () => document.getElementById("terminal")?.scrollIntoView({ behavior: "smooth" }), response: "Opening Interactive Terminal..." },
  research: { action: () => document.getElementById("research")?.scrollIntoView({ behavior: "smooth" }), response: "Navigating to Research section..." },
  experience: { action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }), response: "Navigating to Experience section..." },
  contact: { action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), response: "Opening Contact section..." },
  github: { action: () => document.getElementById("github")?.scrollIntoView({ behavior: "smooth" }), response: "Opening GitHub Dashboard..." },
  "download resume": { action: () => window.open("/resume.pdf", "_blank"), response: "Downloading resume..." },
  top: { action: () => window.scrollTo({ top: 0, behavior: "smooth" }), response: "Back to top!" },
};

const VoiceActivation = () => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [supported, setSupported] = useState(false);
  const recognitionRef = useState<any>(null);

  useEffect(() => {
    setSupported("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  }, []);

  const startListening = () => {
    if (!supported) return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => { setListening(false); setFeedback("Could not hear you. Try again."); };

    recognition.onresult = (event: any) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(spoken);

      const match = Object.keys(VOICE_COMMANDS).find(cmd => spoken.includes(cmd));
      if (match) {
        const { action, response } = VOICE_COMMANDS[match];
        setFeedback(response);
        setTimeout(action, 500);
      } else {
        setFeedback(`Didn't recognize: "${spoken}". Try: "projects", "skills", "contact"...`);
      }
      setTimeout(() => { setTranscript(""); setFeedback(""); }, 3000);
    };

    recognition.start();
  };

  if (!supported) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9980] flex flex-col items-start gap-2">
      <AnimatePresence>
        {(transcript || feedback) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="max-w-xs p-3 rounded-xl bg-zinc-900/95 border border-white/10 shadow-xl text-sm"
          >
            {transcript && <p className="text-muted-foreground text-xs mb-1">You said: "{transcript}"</p>}
            {feedback && <p className="text-primary font-medium">{feedback}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={startListening}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all ${
          listening
            ? "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            : "bg-zinc-900/90 border border-white/10 hover:border-primary/40"
        }`}
        title="Voice control: say 'projects', 'skills', 'contact'..."
      >
        <AnimatePresence mode="wait">
          {listening ? (
            <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>
                <Mic className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Volume2 className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
      <span className="text-[10px] text-muted-foreground ml-1">Voice</span>
    </div>
  );
};

export default VoiceActivation;
