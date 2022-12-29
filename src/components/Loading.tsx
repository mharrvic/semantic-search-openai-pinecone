export const LoadingResults = () => {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          className="m-5 h-16 w-96 animate-pulse bg-white shadow sm:rounded-lg"
          key={i}
        >
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900"></h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500"></p>
          </div>
        </div>
      ))}
    </div>
  );
};
