const Event = {
  PageEvent: {
    onAppendDone: 'Page:onAppendDone',
  },
  StoreEvent: {
    onUpdated: 'Store:onUpdated',
  },
  DateViewEvent: {
    onDateChanged: 'DateView:onDateChanged',
  },
  RouterEvent: {
    changeUrl: 'Router:changeUrl',
    onStateChanged: 'Router:onStateChanged',
  },
};

export const PageEvent = Event.PageEvent;
export const StoreEvent = Event.StoreEvent;
export const DateViewEvent = Event.DateViewEvent;
export const RouterEvent = Event.RouterEvent;
export default Event;
