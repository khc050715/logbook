import Link from 'next/link';

export default function Header() {
  return (
    <header style={{ padding: '20px 0', marginBottom: '40px', borderBottom: '1px solid #5D736B' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: '700', textDecoration: 'none', color: 'black' }}>
          logbook
        </Link>
        <Link href="/write" style={{ textDecoration: 'none', color: '#666' }}>
          Write
        </Link>
      </nav>
    </header>
  );
}