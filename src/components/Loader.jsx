const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white/80 px-8 py-6 shadow-lg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
        <p className="text-sm text-gray-600 tracking-wide">Loading</p>
      </div>
    </div>
  );
};

export default Loader;