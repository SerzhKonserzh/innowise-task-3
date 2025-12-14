import { useParams } from 'react-router';

export const useNumberParams = (paramName: string): number | null => {

  const requestedParam = useParams()[paramName];

  if (!requestedParam) return null;

  const numberParam = Number(requestedParam);

  return Number.isFinite(numberParam) ? numberParam : null;
};