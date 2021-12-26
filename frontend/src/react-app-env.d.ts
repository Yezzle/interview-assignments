/// <reference types="react-scripts" />
declare module '*.less';

export declare global {
    interface Window {
      // add you custom properties and methods
      setIndex: (index: number) => void;
    }
  }