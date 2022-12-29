import { protectedProcedure, router } from "../trpc";

export const libraryRouter = router({
  getMyLibrary: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.library.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
