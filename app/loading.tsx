export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-lg font-semibold mb-4">Loading...</h1>
      <div className="h-10 w-10 border-4 border-t-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
    </div>
  );
}
