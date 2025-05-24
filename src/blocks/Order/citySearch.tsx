import { TitledInput } from "@/shared/ui/TitledInput";
import { apiUrlBuilder } from "@/shared/utils/urlBuilder";
import { useDebounce } from "@/shared/utils/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";

interface IProps{
  city: string;
  cityId?: number;
  setCityOptions: any;
  setForm: any;
}

export function CitySearch({city, cityId, setCityOptions, setForm}: IProps) {
  const [error, setError] = useState<string | undefined>(undefined);

  const abortController = useRef<AbortController | null>(null);

  const fetchCities = useCallback(async (name: string) => {
    // Отменяем прошлый запрос (если есть)
    if (abortController.current) {
      abortController.current.abort();
    }
    // Создаём новый controller
    const controller = new AbortController();
    abortController.current = controller;

    try {
      const res = await fetch(
        apiUrlBuilder(`/order/city?name=${encodeURIComponent(name)}`),
        { signal: controller.signal }
      );
      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();
      setCityOptions(data);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Запрос отменён, игнорируем
        return;
      }
      console.error('City fetch error:', err);
      // Тут можно выставить ошибку в UI
    }
  }, []);

  // Обёртка с дебаунсом: будет вызываться не чаще чем раз в 300 мс
  const debouncedFetch = useDebounce(fetchCities, 100);

  const onCityChange = useCallback((str: string) => {
    setForm((f: any) => ({ ...f, city: str }));

    if (str) {
      debouncedFetch(str);
    } else {
      // При очистке поля — сбрасываем варианты и убиваем последний запрос
      if (abortController.current) {
        abortController.current.abort();
      }
      setCityOptions([]);
    }
  }, [debouncedFetch]);

  useEffect(() => {
    if (city && !cityId) {
      setError("Выберите город из списка");
    } else {
      setError(undefined);
    }
  }, [cityId])

  const handleBlur = useCallback(() => {
    // При потере фокуса проверяем, выбран ли город из списка
    if (city && !cityId) {
      setError("Выберите город из списка");
    } else {
      setError(undefined);
    }
  }, [city, cityId]);

  return(
    <TitledInput
      required
      title='Город'
      name='city'
      autoComplete='none'
      onFocus={(e) => e.target.setAttribute("autoComplete", "none")}
      value={city}
      onChange={(e: any) => onCityChange(e.target.value)}
      onBlur={handleBlur}
      error={error}
    />
  )
}