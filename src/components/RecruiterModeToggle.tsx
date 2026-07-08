import { useRecruiterMode } from "./RecruiterModeContext";
import { motion } from "framer-motion";
import { Briefcase, Code2 } from "lucide-react";

const RecruiterModeToggle = () => {
  const { recruiterMode, setRecruiterMode } = useRecruiterMode();

  return (
    <motion.button
      onClick={() => setRecruiterMode(!recruiterMode)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
        recruiterMode
          ? "bg-amber-500/20 border-amber-500/50 text-amber-400"
          : "bg-white/5 border-white/10 text-muted-foreground hover:border-primary/40 hover:text-foreground"
      }`}
      title={recruiterMode ? "Switch to Developer View" : "Switch to Recruiter View"}
    >
      {recruiterMode ? (
        <>
          <Briefcase className="w-3 h-3" />
          Recruiter Mode
        </>
      ) : (
        <>
          <Code2 className="w-3 h-3" />
          Dev Mode
        </>
      )}
    </motion.button>
  );
};

export default RecruiterModeToggle;
