import { subscribe } from '@src/constant/State';

export default class Component {
  constructor(args) {
    this.attribute = args.attribute;
    Object.setPrototypeOf(this, Component.prototype);
  }

  init() {
    this.element = this.render();
    this.applySubscribers();
    this.componentDidMount();
  }

  setSubscribers(subscribers) {
    this.subscribers = subscribers;
  }

  applySubscribers() {
    if (!this.subscribers) {
      return;
    }

    Object.entries(this.subscribers).map(([key, eventHandler]) => {
      subscribe(this.attribute, key, eventHandler);
    });
  }

  getElement() {
    return this.element;
  }

  // call this function after render
  componentDidMount() {}
  render() {}
}
