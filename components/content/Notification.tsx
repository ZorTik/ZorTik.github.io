import {Variant} from "react-bootstrap/types";
import {Alert, Row} from "react-bootstrap";
import {useEffect, useState} from "react";

type Notification = {
    variant?: Variant,
    text: string,
    expiresAt?: number,
}

const notifications: Notification[] = [];

function pushNotification(notification: Notification) {
    notifications.push({...notification, expiresAt: Date.now() + 5000});
}

function NotificationsComponent() {
    const [now, setNow] = useState<number>(Date.now());

    useEffect(() => {
        setInterval(() => setNow(Date.now()), 1000);
    }, []);
    return <>
        {notifications
            .filter(notification => notification.expiresAt!! > now)
            .map((notification, index) => <Row key={index}><Alert variant={notification.variant ?? "info"}>
            {notification.text}
        </Alert></Row>)}
    </>
}

export {
    pushNotification,
    NotificationsComponent,
}
