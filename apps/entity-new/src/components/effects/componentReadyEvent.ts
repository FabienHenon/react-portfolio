import { useEffect } from "react";
import { Events } from "../../types";

const useComponentReadyEvent = (
  eventNameForEntity: (state: string) => string,
  events: Events
): void => {
  useEffect(() => {
    events.emit(eventNameForEntity("ready"), {});
  }, [eventNameForEntity, events]);
};

export default useComponentReadyEvent;
