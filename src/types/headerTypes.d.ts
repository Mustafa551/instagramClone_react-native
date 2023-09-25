import React from 'react';

export interface HeaderProp {
  title?: string;
  renderRight?: () => React.ReactNode | null;
  renderLeft?: () => React.ReactNode | null;
  backarrow?: boolean;
  marginhori?: number;
  onLeftIcon?: () => void | null;
  activeTab?: string;
}
