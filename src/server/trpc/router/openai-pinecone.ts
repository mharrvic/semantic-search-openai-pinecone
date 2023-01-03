import { ulid } from "ulid";
import { z } from "zod";
import { prisma } from "../../../server/db/client";
import { createEmbedding } from "../../../utils/openai";
import { pinecone } from "../../../utils/pinecone";
import { publicProcedure, router } from "../trpc";
import { myUserId } from "./_app";

export const openAiPinecone = router({
  upsertEmbedding: publicProcedure
    .input(z.object({ text: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      const { text, title } = input;
      const id = ulid();

      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      await pinecone.upsert({
        vectors: [
          {
            id,
            values: vectorEmbedding,
            metadata: { userId: myUserId, text, title },
          },
        ],
      });

      await prisma.library.create({
        data: {
          title,
          description: text,
          embeddingId: id,
          userId: myUserId,
        },
      });

      return {
        test: input.text,
      };
    }),
  searchEmbedding: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      const text = input.text;
      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      const pineconeSearch = await pinecone.query({
        topK: 3,
        includeMetadata: true,
        vector: vectorEmbedding,
        filter: {
          userId: myUserId,
        },
      });

      return { test: input.text, pineconeSearch };
    }),
});
