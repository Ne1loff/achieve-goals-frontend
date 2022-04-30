import {toast} from "@zerodevx/svelte-toast";
import NotificationComponent from "../components/NotificationComponent.svelte";
import {NotificationType} from "../data/enums/_enums";

export default class NotificationService {

    private static INSTANCE: NotificationService;

    private constructor() { }

    static getInstance = () => this.INSTANCE ?? new NotificationService();

    private static showNotification(
        notificationType: NotificationType,
        title?: string,
        subtitle?: string,
        caption?: string,
        duration?: number
    ) {
        toast.push({
            component: {
                src: NotificationComponent,
                props: {
                    notificationType: notificationType,
                    title: title,
                    subtitle: subtitle,
                    caption: caption
                },
                sendIdTo: 'toastId'
            },
            initial: 0,
            duration: duration ?? 5000,
            theme: {
                '--toastPadding': '0',
                '--toastMsgPadding': '0',
                '--toastBackground': 'var(--cds-inverse-02, #393939)'
            }
        })
    }

    info(title?: string, subtitle?: string, caption?: string, duration?: number) {
        NotificationService.showNotification(NotificationType.INFO, title, subtitle, caption, duration);
    }

    success(title?: string, subtitle?: string, caption?: string, duration?: number) {
        NotificationService.showNotification(NotificationType.SUCCESS, title, subtitle, caption, duration);
    }

    warning(title?: string, subtitle?: string, caption?: string, duration?: number) {
        NotificationService.showNotification(NotificationType.WARNING, title, subtitle, caption, duration);
    }

    error(title?: string, subtitle?: string, caption?: string, duration?: number) {
        NotificationService.showNotification(NotificationType.ERROR, title, subtitle, caption, duration);
    }

}