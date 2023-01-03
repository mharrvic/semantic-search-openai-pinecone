import { router } from "../trpc";
import { authRouter } from "./auth";
import { libraryRouter } from "./library";
import { openAiPinecone } from "./openai-pinecone";

export const myUserId = "clc9a89r60000pj5fsqv7v4i1";

export const appRouter = router({
  auth: authRouter,
  openAiPinecone: openAiPinecone,
  library: libraryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
