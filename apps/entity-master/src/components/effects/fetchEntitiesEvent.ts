import { useEffect } from "react";
import { Events } from "../../types";

const useFetchEntitiesEvent = (eventNameForEntity: (state: string) => string, events: Events): void => {
  useEffect(() => {
    events.emit(eventNameForEntity('fetch'), {});
  }, []);
};

export default useFetchEntitiesEvent;
