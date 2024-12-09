import { useEffect } from "react";
import { Events } from "../../types";

const useFetchEntityEvent = (id: string, eventNameForEntity: (state: string) => string, events: Events): void => {
  useEffect(() => {
    events.emit(eventNameForEntity('fetch'), { id });
  }, [id]);
};

export default useFetchEntityEvent;
