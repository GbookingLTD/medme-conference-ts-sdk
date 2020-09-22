import {ConferenceStatusesEnum} from "./types/conference";

export type ChangeConferenceStatusCallback = (newStatus: string) => {};

export interface IConferenceSock {
    changeConferenceStatus(newStatus: ConferenceStatusesEnum);
    changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback);
}

export class ConferenceSock
    implements IConferenceSock {
    private ws_: WebSocket;
    private at_: string;
    private changeConferenceStatusCallback_: ChangeConferenceStatusCallback;

    private write_(msg) {
        console.info('[%s] ConferenceWS', (new Date).toISOString(), this.at_, msg)
    }

    private onOpen_() {
        this.write_("CONNECTED");
        this.doSend_(JSON.stringify({
            path: 'handshake',
            at: this.at_
        }));
    }

    private onMessage_(data) {
        this.write_("MESSAGE: " + data);
        const json = JSON.parse(data);
        if (json.path === 'change_status_callback')
            this.changeConferenceStatusCallback_(json.newStatus);
    }

    private doSend_(message) {
        this.write_("SENT: " + message);
        this.ws_.send(message);
    }

    constructor(wsUri: string, at: string, changeStatusCb: ChangeConferenceStatusCallback = null) {
        this.ws_ = new WebSocket(wsUri);
        this.at_ = at;
        this.changeConferenceStatusCallback_ = changeStatusCb;

        this.ws_.onopen = this.onOpen_.bind(this);
        this.ws_.onmessage = this.onMessage_.bind(this);
    }

    changeConferenceStatus(newStatus: ConferenceStatusesEnum) {
        this.doSend_(JSON.stringify({
            path: 'change_status',
            at: this.at_,
            newStatus: newStatus
        }))
    }

    changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback) {
        this.changeConferenceStatusCallback_ = cb;
        return this;
    }
}