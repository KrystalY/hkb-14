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
};

export const PageEvent = Event.PageEvent;
export const StoreEvent = Event.StoreEvent;
export const DateViewEvent = Event.DateViewEvent;
export default Event;
