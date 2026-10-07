'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: 'red' }}>Application Error!</h1>
      <p><strong>Error Message:</strong> {error.message}</p>
      {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
      <pre style={{ background: '#eee', padding: '1rem', overflowX: 'auto', maxWidth: '100%' }}>
        {error.stack}
      </pre>
      <button onClick={() => reset()} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
        Try again
      </button>
    </div>
  );
}
