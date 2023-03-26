import React from 'react';

import { ModalArgs, ModalId, ModalsContext, ModalState } from 'src/providers';
import type { SimpleObject } from 'src/types';

export const useModal = <TArgs extends SimpleObject>(id?: ModalId) => {
  const { openModal, closeModal, state } = React.useContext(ModalsContext);
  const [isClosureAllowed, setIsClosureAllowed] = React.useState(true);

  console.log(state);

  const modalState = React.useMemo((): ModalState<TArgs> => {
    return id ? { ...defaultModalState, ...state[id] } : defaultModalState;
  }, [id, state]);

  const openCurrentModal = React.useCallback(
    (customId?: ModalId, customArgs?: ModalArgs<TArgs>) => {
      if (customId) {
        openModal(customId, customArgs);
      } else if (id) {
        openModal(id);
      }
    },
    [id, openModal],
  );

  const closeCurrentModal = React.useCallback(
    (customId?: ModalId) => {
      if (isClosureAllowed) {
        closeModal(String(customId ?? id));
      }
    },
    [closeModal, id, isClosureAllowed],
  );

  return {
    ...modalState,
    openModal: openCurrentModal,
    closeModal: closeCurrentModal,
    switchClosability: setIsClosureAllowed,
  };
};

const defaultModalState: ModalState<any> = {
  isOpen: false,
  args: null,
};
