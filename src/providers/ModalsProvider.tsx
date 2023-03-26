import React from 'react';

import type { SimpleObject } from 'src/types';

export type ModalArgs<TArgs extends SimpleObject> = TArgs | null;

export type ModalState<TArgs extends SimpleObject> = {
  isOpen: boolean;
  args: ModalArgs<Partial<TArgs>>;
};

// Must be unique throughout the app
export type ModalId = string | number;

export type ModalsState<TArgs extends SimpleObject = Record<string, unknown>> = Record<
  ModalId,
  ModalState<TArgs>
>;

export type ModalsContextType = {
  state: ModalsState;
  openModal: <TArgs extends SimpleObject>(id: ModalId, args?: ModalArgs<TArgs>) => void;
  closeModal: (id: ModalId) => void;
};

export const ModalsContext = React.createContext<ModalsContextType>({
  state: {},
  openModal: () => undefined,
  closeModal: () => undefined,
});

export const ModalsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = React.useState<ModalsState<SimpleObject>>({});

  const openModal: ModalsContextType['openModal'] = React.useCallback((id, args) => {
    setState(prevState => {
      return {
        ...prevState,
        [id]: {
          isOpen: true,
          args: args || null,
        },
      };
    });
  }, []);

  const closeModal: ModalsContextType['closeModal'] = React.useCallback(id => {
    setState(prevState => {
      return {
        ...prevState,
        [id]: {
          args: { ...prevState[id]?.args },
          isOpen: false,
        },
      };
    });
  }, []);

  const contextValue: ModalsContextType = React.useMemo(() => {
    return { state, openModal, closeModal };
  }, [closeModal, openModal, state]);

  return <ModalsContext.Provider value={contextValue}>{children}</ModalsContext.Provider>;
};
