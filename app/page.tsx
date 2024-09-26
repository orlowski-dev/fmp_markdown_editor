import { Button, ThemeToggler } from "@/components";
import { SaveIcon } from "@/components/icons";

const App = () => {
  return (
    <>
      <div style={{ display: "flex", gap: 24, padding: 24 }}>
        <Button>Iconless button</Button>
        <Button startIcon={<SaveIcon />}>Save document</Button>
        <Button variant="icon-only-mobile" startIcon={<SaveIcon />}>
          Only icon on mobile
        </Button>
        <Button variant="icon-only" startIcon={<SaveIcon />}>
          Desc text
        </Button>
      </div>
      <div style={{ display: "flex", gap: 24, padding: 24 }}>
        <Button color="dark">Iconless button</Button>
        <Button color="dark" startIcon={<SaveIcon />}>
          Save document
        </Button>
        <Button
          color="dark"
          variant="icon-only-mobile"
          startIcon={<SaveIcon />}
        >
          Only icon on mobile
        </Button>
        <Button color="dark" variant="icon-only" startIcon={<SaveIcon />}>
          Desc text
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: 24,
          backgroundColor: "var(--color-900)",
        }}
      >
        <ThemeToggler />
      </div>
    </>
  );
};

export default App;
