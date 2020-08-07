const Event = {
  PageEvent: {
    onAppendDone: 'Page:onAppendDone',
  },
  StoreEvent: {
    onUpdated: 'Store:onUpdated',
    paymentUpdated: 'Store:paymentUpdated',
  },
  DateViewEvent: {
    onDateChanged: 'DateView:onDateChanged',
  },
  RouterEvent: {
    changeUrl: 'Router:changeUrl',
    onStateChanged: 'Router:onStateChanged',
  },
  RecordEvent: {
    create: 'Record:create',
  },
  ModalEvent: {
    open: 'Modal:open',
    close: 'Modal:close',
  },
  PaymentMethod: {
    disable: 'PaymentMethod:disable',
    enable: 'PaymentMethod:enable',
    create: 'PaymentMethod:create',
  },
  FilterEvent: {
    onFilterChanged: 'Filter:onFilterChanged',
  },
};

export const PageEvent = Event.PageEvent;
export const StoreEvent = Event.StoreEvent;
export const DateViewEvent = Event.DateViewEvent;
export const RouterEvent = Event.RouterEvent;
export const RecordEvent = Event.RecordEvent;
export const ModalEvent = Event.ModalEvent;
export const PaymentMethodEvent = Event.PaymentMethod;
export const FilterEvent = Event.FilterEvent;

export default Event;
