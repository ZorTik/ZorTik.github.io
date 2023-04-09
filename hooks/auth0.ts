import {useEffect, useState} from "react";

const useUserPermissions = () => {
    const [permissions, setPermissions] = useState<string[]|null>(null);
    const [fetching, setFetching] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setFetching(true);
        fetch("/api/auth/permissions")
            .then(res => res.json())
            .then(res => setPermissions(res.permissions || []))
            .catch(() => setError(true))
            .finally(() => setFetching(false));
    }, []);

    return {permissions, fetching, error};
}

export {
    useUserPermissions
}
