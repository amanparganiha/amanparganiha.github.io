import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Download,
  FileText,
  FolderKanban,
  Github,
  GitPullRequest,
  Home,
  Mail,
  Moon,
  Newspaper,
  Sun,
  type LucideIcon,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { githubUsername, personalInfo, projects } from "@/data/portfolio";
import { getAllPosts } from "@/lib/posts";

/** Navbar (or anything else) can open the palette by dispatching this event. */
export const OPEN_PALETTE_EVENT = "open-command-palette";

const pages: { label: string; path: string; icon: LucideIcon }[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Resume", path: "/resume", icon: FileText },
  { label: "Projects", path: "/projects", icon: FolderKanban },
  { label: "Open Source", path: "/open-source", icon: GitPullRequest },
  { label: "Blogs", path: "/blogs", icon: Newspaper },
  { label: "Contact", path: "/contact", icon: Mail },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();
  const posts = getAllPosts();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  /** Close first so the dialog doesn't linger over the next page. */
  const run = (action: () => void) => {
    setOpen(false);
    action();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, projects, posts…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Pages">
          {pages.map((page) => (
            <CommandItem key={page.path} onSelect={() => run(() => navigate(page.path))}>
              <page.icon size={15} className="mr-2 text-muted-foreground" />
              {page.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />

        <CommandGroup heading="Projects">
          {projects.map((project) => (
            <CommandItem
              key={project.id}
              value={`${project.title} ${project.category}`}
              onSelect={() =>
                run(() =>
                  navigate(
                    // In-app demos (Air Canvas) go straight to the demo;
                    // everything else opens its detail dialog via ?p=.
                    project.demo?.startsWith("/")
                      ? project.demo
                      : `/projects?p=${project.id}`
                  )
                )
              }
            >
              <FolderKanban size={15} className="mr-2 shrink-0 text-muted-foreground" />
              <span className="truncate">{project.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        {posts.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Posts">
              {posts.map((post) => (
                <CommandItem
                  key={post.slug}
                  onSelect={() => run(() => navigate(`/blogs/${post.slug}`))}
                >
                  <Newspaper size={15} className="mr-2 shrink-0 text-muted-foreground" />
                  <span className="truncate">{post.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
        <CommandSeparator />

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => run(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"))}
          >
            {resolvedTheme === "dark" ? (
              <Sun size={15} className="mr-2 text-muted-foreground" />
            ) : (
              <Moon size={15} className="mr-2 text-muted-foreground" />
            )}
            Toggle theme
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() =>
                window.open(`https://github.com/${githubUsername}`, "_blank", "noopener")
              )
            }
          >
            <Github size={15} className="mr-2 text-muted-foreground" />
            Open GitHub profile
          </CommandItem>
          <CommandItem
            onSelect={() => run(() => window.open("/resume.pdf", "_blank", "noopener"))}
          >
            <Download size={15} className="mr-2 text-muted-foreground" />
            Download resume PDF
          </CommandItem>
          <CommandItem
            onSelect={() =>
              run(() => {
                window.location.href = `mailto:${personalInfo.email}`;
              })
            }
          >
            <Mail size={15} className="mr-2 text-muted-foreground" />
            Email me
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default CommandPalette;
