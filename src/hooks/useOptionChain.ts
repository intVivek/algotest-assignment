import { useQuery } from '@tanstack/react-query';
import fetchOptionChain, { OptionChainResponse } from '@/services/optionChain';

const useOptionChain = () => {
  return useQuery<OptionChainResponse, Error>({
    queryKey: ['optionChain'],
    queryFn: fetchOptionChain,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useOptionChain;