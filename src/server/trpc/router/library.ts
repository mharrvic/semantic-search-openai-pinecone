import { prisma } from "../../../server/db/client";
import { publicProcedure, router } from "../trpc";
import { myUserId } from "./_app";

export const libraryRouter = router({
  getMyLibrary: publicProcedure.query(({ ctx }) => {
    return prisma.library.findMany({
      where: {
        userId: myUserId,
      },
    });
  }),
});
