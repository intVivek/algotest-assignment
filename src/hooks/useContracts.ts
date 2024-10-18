import fetchContracts, { ContractsResponse } from '@/services/contracts';
import { useQuery } from '@tanstack/react-query';

const useContracts = () => {
  return useQuery<ContractsResponse, Error>({
    queryKey: ['contracts'],
    queryFn: fetchContracts,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useContracts;