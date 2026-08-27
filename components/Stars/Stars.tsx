"use client";

export default function Stars({ rating }: { rating: number }) {
  return (
    <span>
      {[...Array(5)].map((_, i) => (
        <span key={i} style={{ color: i < rating ? "#FFD700" : "#ccc" }}>
          ★
        </span>
      ))}
    </span>
  );
}
