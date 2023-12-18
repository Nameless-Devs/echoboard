"use client";

type  ErrorProp = {
    error: Error,
    reset: () => void
}

const ErrorComponent = ({ error, reset }: ErrorProp) => {
  return (
    <div>
        <h1>{error.message || "Something went wrong"}</h1>
        <button onClick={reset}>Try again</button>
    </div>
  );
};

export default ErrorComponent;
