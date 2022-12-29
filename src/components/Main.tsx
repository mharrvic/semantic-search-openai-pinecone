import { signIn, signOut, useSession } from "next-auth/react";

const Main = ({ children }: { children: React.ReactNode }) => {
  const { data: authSessionData } = useSession();

  return (
    <div className="bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <nav className="flex">
        <p className="px-10 py-3 text-xl text-white">
          Semantic <span className="text-search">Search</span> with OpenAI
          Embeddings + Pinecone
        </p>
        <div className="ml-auto">
          <button
            className="bg-gray/10 hover:bg-gray/20 rounded-full px-10 py-3 font-semibold text-white no-underline transition"
            onClick={authSessionData ? () => signOut() : () => signIn()}
          >
            {authSessionData ? "Sign out" : "Sign in"}
          </button>
        </div>
      </nav>
      <main className="min-h-screen min-w-full items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Main;
