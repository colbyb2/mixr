import React from "react";
import "./Content.css";
import GameBoard from "./GameBoard";

function Content() {
  return (
    <div className="content">
      <GameBoard />
    </div>
  );
}

export function Header() {
  return <div className="header">Mixr</div>;
}

export function Footer() {
  return <div className="footer">© Colby Brown</div>;
}

export default Content;
