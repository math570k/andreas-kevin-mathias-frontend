import React from "react";
import { useRegisterOrg } from "../../graphql/organization.js";

const OrganizationContext = React.createContext(null);

function OrganizationProvider(props) {
    const [handleRegisterOrg] = useRegisterOrg();
    const [state, setState] = React.useState({
        status: 'idle',
        error: null,
        user: null,
    })

    const createOrg = ({name, logo}) => {

        handleRegisterOrg({
            variables: {
                name: name,
                logo: logo,
                // Get user id from user context
                user_id: 5
            }
        })
            .then(data => console.log(data))
            .catch(error => {
                setState({
                    status: 'rejected',
                    error: error,
                    user: null,
                })
            })
    }

    const OrganizationAPI = {
        createOrg
    }

    return <OrganizationContext.Provider value={OrganizationAPI} {...props} />
}

function useOrganization() {
    const context = React.useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
}

export {OrganizationProvider, useOrganization}