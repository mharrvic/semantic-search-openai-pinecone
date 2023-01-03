const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <nav className="flex">
        <p className="px-10 py-3 text-xl text-white">
          Semantic <span className="text-search">Search</span> with OpenAI
          Embeddings + Pinecone
        </p>
      </nav>
      <div className="mx-4 px-4 py-16 text-center">{children}</div>
    </div>
  );
};

export default Main;
