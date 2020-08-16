import React from 'react';

const SideNavToggleContext = React.createContext();

const SideNavToggleProvider = SideNavToggleContext.Provider;
const SideNavToggleConsumer = SideNavToggleContext.Consumer;

export { SideNavToggleProvider, SideNavToggleConsumer };
