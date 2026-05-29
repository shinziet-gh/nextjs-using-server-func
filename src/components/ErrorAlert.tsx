"use client";

export function ErrorAlert({
    error,
    resotErrorBoundary,
}: {
    error: Error;
    resotErrorBoundary: () => void;
}) {
    return (
        <div role="alert">
            <h3>Something went wrong</h3>
            <p>{error.message}</p>
            <button onClick={resotErrorBoundary}>Try again</button>
        </div>
    );
}