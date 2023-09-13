import { useEffect, useState } from "react";
import { normalizeData } from "../utils/normalize-data";
import { DomainPage } from "../../../types";

export const useGetPages = () => {
  const [data, setData] = useState<Record<string, DomainPage>>({});
  const [error, serError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch("/api/help/idea/2023.1/HelpTOC.json")
      .then((res) => res.json())
      .then((data) => {
        setData(normalizeData(data));
      })
      .catch((error) => {
        serError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { pages: data, error, loading };
};
