import { useEffect } from "react";
import eventBus from "../api/EventBus";
interface Props {
  element: any;
  callBack: () => void;
}

const useOutsideClick = ({ element, callBack }: Props) => {
  useEffect(() => {
    const handleOutsideClick = (event: Event) => {
      if (element.current && !element.current.contains(event.target as any)) {
        callBack();
      }
    };
    eventBus.doc.on("mousedown", handleOutsideClick);
    return () => {
      eventBus.doc.off("mousedown", handleOutsideClick);
    };
  });
};

export default useOutsideClick;
