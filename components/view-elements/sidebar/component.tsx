import { FileIcon, Logo } from "@/components/icons";
import "./styles.css";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/button";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <Logo />
      </div>
      <h2>My documents</h2>
      <Button>+ New document</Button>
      <div className="docs-area-wrapper">
        <div className="docs-area">
          <Link href={`#`} className="doc">
            <span className="icon">
              <FileIcon />
            </span>
            <div className="details">
              <span>01 April 2022</span>
              <p>untitled-document.md</p>
            </div>
          </Link>
        </div>
      </div>
      <ThemeToggler />
    </div>
  );
};

export default Sidebar;
