export default function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-red-600 h-2 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}