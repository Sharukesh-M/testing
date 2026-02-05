import { useRef } from "react";
import "./backgroundText.css";

export default function BackgroundText() {
    return (
        <div className="bg-text-container">
            <div className="bg-text-wrapper">
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
            </div>
            <div className="bg-text-wrapper reverse">
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
                <span className="bg-text-span">TECHATHON 2K26</span>
            </div>
        </div>
    );
}
