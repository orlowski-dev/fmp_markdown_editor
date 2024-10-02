import { FileIcon, Logo } from "@/components/icons";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/button";
import { MdDocument } from "@/data/types";
import Link from "next/link";
import "./styles.css";

export interface SidebarProps {
  docs: MdDocument[];
  onLinkClick: () => void;
  onNewDocumentClick: () => void;
}

const Sidebar = ({ docs, onLinkClick, onNewDocumentClick }: SidebarProps) => {
  return (
    <div className="sidebar">
      <div className="logo-area">
        <Logo />
      </div>
      <h2>My documents</h2>
      <Button onClick={onNewDocumentClick}>+ New document</Button>
      <div className="docs-area-wrapper">
        <div className="docs-area">
          {docs.map((doc) => {
            return (
              <Link
                onClick={onLinkClick}
                key={doc.id}
                href={`/?doc=${doc.id}`}
                className="doc"
              >
                <span className="icon">
                  <FileIcon />
                </span>
                <div className="details">
                  <span>
                    {new Date(doc.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <p>{doc.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <ThemeToggler />
    </div>
  );
};

export default Sidebar;
