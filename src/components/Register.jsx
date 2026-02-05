import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./register.css";

export default function Register() {
  const [showBoxes, setShowBoxes] = useState(false);

  return (
    <section className="register-section" id="register">
      <div className="glass register-glass">
        <h2 className="section-heading">EVENT REGISTRATION</h2>

        <div className="assemble-wrapper">
          <button
            className="assemble-btn"
            onClick={() => setShowBoxes(!showBoxes)}
          >
            {showBoxes ? "HIDE OPTIONS" : "ASSEMBLE HERE"}
          </button>
        </div>

        <AnimatePresence>
          {showBoxes && (
            <motion.div
              className="register-boxes"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="flex flex-wrap justify-center gap-[34px] w-full mt-[10px]">
                {/* INTERNAL */}
                <div className="register-card">
                  <h3 className="register-title">INTERNAL PARTICIPATION</h3>
                  <p className="register-fee">₹ 300 per team</p>
                  <a href="#" className="register-link">REGISTER HERE</a>
                </div>

                {/* EXTERNAL */}
                <div className="register-card">
                  <h3 className="register-title">EXTERNAL PARTICIPATION</h3>
                  <p className="register-fee">₹ 400 per team</p>
                  <a href="#" className="register-link">REGISTER HERE</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
