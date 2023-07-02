import PushNotification from "react-native-push-notification";

const showNotification = (title , message , channelId) => {
    PushNotification.localNotification({
        title:title,
        message:message,
        channelId:channelId
        
    });
};

const handleScheduleNotification = (title, message, channelId) => {
    PushNotification.localNotification({
        title:title,
        message:message,
        channelId:channelId,
        date:new Date(Date.now() + 5 * 1000),
    });
};

const handleCancel = () => {
    PushNotification.cancelAllLocalNotifications();
}

export {showNotification , handleScheduleNotification , handleCancel};