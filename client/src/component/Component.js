import { subscribe } from '@constant/State.js';

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
      subscribe(this.attribute, key, eventHandler.bind(this));
    });
  }

  getElement() {
    return this.element;
  }

  // call this function after render
  componentDidMount() {}
  render() {}
}
