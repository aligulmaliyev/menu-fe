import { useSearchParams } from "react-router";

export const useQrId = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  return id;
};
