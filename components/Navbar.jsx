import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white p-4">
      <ul className="flex space-x-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="text-glow hover:text-primary transition-all duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 