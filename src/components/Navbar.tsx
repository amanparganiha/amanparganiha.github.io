import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Search, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { OPEN_PALETTE_EVENT } from "@/components/CommandPalette";

type NavItem = { label: string; path: string; icon?: LucideIcon };

const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Resume", path: "/resume" },
  { label: "Projects", path: "/projects" },
  { label: "Open Source", path: "/open-source" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight font-[Space_Grotesk]">
          <span className="text-primary">A</span>P
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground"
                      : item.icon
                        ? "text-primary/80 hover:text-primary hover:bg-accent/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.icon && <item.icon size={15} strokeWidth={1.75} />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            className="ml-1 flex items-center gap-2 rounded-md border border-border/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="Open command palette"
          >
            <Search size={13} />
            <kbd className="font-mono text-[10px] tracking-wide">Ctrl K</kbd>
          </button>
          <ThemeToggle />
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border/50 bg-background">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-accent text-accent-foreground"
                      : item.icon
                        ? "text-primary/80 hover:text-primary hover:bg-accent/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.icon && <item.icon size={16} strokeWidth={1.75} />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
