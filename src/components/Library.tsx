import { trpc } from "../utils/trpc";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LoadingResults } from "./Loading";

import toast from "react-hot-toast";

type Inputs = {
  title: string;
  text: string;
};

const Library = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { mutate, isLoading } = trpc.openAiPinecone.upsertEmbedding.useMutation(
    {
      onSuccess: () => {
        toast.remove();
        toast.success("Saved!");
        reset();
      },
      onError: () => {
        toast.error("Error!");
      },
    }
  );

  const {
    data: libraryData,
    isLoading: libraryLoading,
    refetch,
  } = trpc.library.getMyLibrary.useQuery();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    toast.loading("Saving...");
    mutate({ text: data.text, title: data.title });
    refetch();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <label className="mb-2 block text-xl font-medium text-white">
          Record anything
        </label>
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="title" className="sr-only">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            name="title"
            id="title"
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
            placeholder="Title"
            disabled={isLoading}
          />
          <label htmlFor="description" className="sr-only">
            Description
          </label>
          <textarea
            {...register("text")}
            rows={2}
            name="text"
            id="text"
            className="block w-full resize-none border-0 py-0 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Write a description..."
            defaultValue={""}
            disabled={isLoading}
          />

          <div aria-hidden="true">
            <div className="py-2">
              <div className="h-9" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-px bottom-0">
          <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
            <div className="ml-auto">
              <button
                type="submit"
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSubmit)}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex flex-col items-center">
        {libraryLoading ? (
          <LoadingResults />
        ) : (
          libraryData?.map((library) => {
            return (
              <div
                className="m-5 w-full bg-white shadow sm:rounded-lg"
                key={library.id}
              >
                <div className="flex flex-col items-center px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {library.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {library.description}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Library;
