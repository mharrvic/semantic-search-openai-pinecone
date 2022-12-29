import { router } from "../trpc";
import { authRouter } from "./auth";
import { libraryRouter } from "./library";
import { openAiPinecone } from "./openai-pinecone";

export const appRouter = router({
  auth: authRouter,
  openAiPinecone: openAiPinecone,
  library: libraryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
