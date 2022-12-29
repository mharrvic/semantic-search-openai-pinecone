import { ulid } from "ulid";
import { z } from "zod";
import { prisma } from "../../../server/db/client";
import { createEmbedding } from "../../../utils/openai";
import { pinecone } from "../../../utils/pinecone";
import { protectedProcedure, router } from "../trpc";

export const openAiPinecone = router({
  upsertEmbedding: protectedProcedure
    .input(z.object({ text: z.string(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { text, title } = input;
      const id = ulid();

      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      await pinecone.upsert({
        vectors: [
          {
            id,
            values: vectorEmbedding,
            metadata: { userId: ctx.session.user.id, text, title },
          },
        ],
      });

      await prisma.library.create({
        data: {
          title,
          description: text,
          embeddingId: id,
          userId: ctx.session.user.id,
        },
      });

      return {
        test: input.text,
        user: ctx.session.user.email,
      };
    }),
  searchEmbedding: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const text = input.text;
      const embedding = await createEmbedding(text);
      const vectorEmbedding = embedding.data[0]?.embedding ?? [];
      const pineconeSearch = await pinecone.query({
        topK: 3,
        includeMetadata: true,
        vector: vectorEmbedding,
      });

      return { test: input.text, user: ctx.session.user.email, pineconeSearch };
    }),
});
