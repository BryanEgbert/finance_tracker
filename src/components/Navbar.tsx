import { useLocation } from 'wouter';
import { H1 } from '@/components/ui/H1';

export interface NavLink {
  label: string;
  path: string;
}

export interface NavbarProps {
  title?: string;
  links: NavLink[];
}

export function Navbar({ title = 'FinTrack', links }: NavbarProps): React.ReactNode {
  const [currentPath] = useLocation();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Title */}
          <a
            href="/"
            className="flex items-center no-underline hover:opacity-80 transition-opacity"
            aria-label="FinTrack Home"
          >
            <H1 className="text-2xl mb-0">{title}</H1>
          </a>

          {/* Navigation Links */}
          <ul className="flex items-center gap-6 list-none m-0 p-0">
            {links.map(link => {
              const isActive = currentPath === link.path;
              return (
                <li key={link.path}>
                  <a
                    href={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-teal-100 text-teal-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
