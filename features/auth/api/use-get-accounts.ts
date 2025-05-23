import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.accounts.$get();

      if (!response.ok) {
        throw new Error("Failed to get accounts");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
