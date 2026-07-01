import { useCallback, useState } from 'react';

import { calculateFreightSimulation } from '../services/freight-calculator.service';
import { type FreightCalculatorInput, type FreightCalculatorResult } from '../types/freight-calculator';

export function useFreightCalculator() {
  const [result, setResult] = useState<FreightCalculatorResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculate = useCallback(async (input: FreightCalculatorInput) => {
    try {
      setError(null);
      const nextResult = await calculateFreightSimulation(input);
      setResult(nextResult);

      return nextResult;
    } catch {
      setResult(null);
      setError('Não foi possível consultar a cotação da transportadora no momento.');
      return null;
    }
  }, []);

  const clearResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    error,
    calculate,
    clearResult,
  };
}