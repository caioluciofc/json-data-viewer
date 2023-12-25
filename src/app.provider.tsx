import { createContext, ReactNode, useContext } from "react";
import DevelopmentError from "./errors/DevelopmentError";
import { useDataTable } from "./states/data-table-state";
import { AppProviderType } from "./app.provider.types";

export const AppContext = createContext<AppProviderType | undefined>(undefined);

export function useAppContext() {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new DevelopmentError(
            'You are trying to useAppContext outside an App Provider'
        )
    }

    return context;
}

interface Props {
    children: ReactNode;
}

export default function AppProvider({ children } : Props) {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦   ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ║║║║║ ║ ║╠═╣║   ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝ ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
    const [dataTableState, dataTableActions] = useDataTable();

	//  ╔═╗╔╦╗╔═╗╔╦╗╔═╗╔═╗
	//  ╚═╗ ║ ╠═╣ ║ ║╣ ╚═╗
	//  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝╚═╝
    const AppStates = {
        dataTableState,
    };

    //  ╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
	//  ╠═╣║   ║ ║║ ║║║║╚═╗
	//  ╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    const AppActions = {
        ...dataTableActions
    }

    return (
        <AppContext.Provider value={{ ...AppStates, ...AppActions }}>
            {children}
        </AppContext.Provider>
    );
}