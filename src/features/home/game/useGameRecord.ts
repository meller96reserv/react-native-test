import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const RECORD_KEY = '@focus-flow/skater-cars-record';

export function useGameRecord() {
  const [record, setRecord] = useState(0);

  useEffect(() => {
    void AsyncStorage.getItem(RECORD_KEY).then((stored) => {
      const parsed = Number(stored);
      if (Number.isSafeInteger(parsed) && parsed > 0) setRecord(parsed);
    });
  }, []);

  const saveRecord = useCallback((score: number) => {
    setRecord((currentRecord) => {
      if (score <= currentRecord) return currentRecord;
      void AsyncStorage.setItem(RECORD_KEY, String(score));
      return score;
    });
  }, []);

  return { record, saveRecord };
}
