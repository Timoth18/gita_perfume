import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container narrow" style={{ textAlign: "center" }}>
        <h1>Page not found</h1>
        <p className="lead">The page you’re looking for doesn’t exist.</p>
        <Link href="/catalog" className="btn">Browse the catalog</Link>
      </div>
    </section>
  );
}
