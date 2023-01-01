import {
  DocumentMagnifyingGlassIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { trpc } from "../utils/trpc";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { LoadingResults } from "./Loading";

type Inputs = {
  text: string;
};

const Search = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { mutateAsync, data, isLoading } =
    trpc.openAiPinecone.searchEmbedding.useMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await mutateAsync({ text: data.text });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-2 block text-xl font-medium text-white">
          Search anything
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <DocumentMagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              {...register("text")}
              name="text"
              id="text"
              className="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cake"
              disabled={isLoading}
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            onClick={handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>{isLoading ? "Loading" : "Submit"}</span>
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center">
        {isLoading ? (
          <LoadingResults />
        ) : (
          data?.pineconeSearch.matches?.map((item) => {
            if (item.metadata.text) {
              return (
                <div
                  className="m-5 w-full bg-white shadow sm:rounded-lg"
                  key={item.id}
                >
                  <div className="flex flex-col items-center px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {item.metadata.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {item.metadata.text}
                    </p>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
    </>
  );
};

export default Search;
