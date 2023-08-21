const eventBus = {
  doc: {
    on(event: string, callback: EventListener) {
      document.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: any) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    off(event: string, callback: EventListener) {
      document.removeEventListener(event, callback);
    },
  },

  win: {
    on(event: string, callback: EventListener) {
      window.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: any) {
      window.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    off(event: string, callback: EventListener) {
      window.removeEventListener(event, callback);
    },
  },
};

export default eventBus;

//https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
//https://www.bezkoder.com/react-typescript-authentication-example/
