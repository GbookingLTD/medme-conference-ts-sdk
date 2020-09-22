import {ConferenceStatusesEnum} from "./types/conference";

export type ChangeConferenceStatusCallback = (newStatus: string) => {};

export interface IConferenceSock {
    changeConferenceStatus(newStatus: ConferenceStatusesEnum);
    changeConferenceStatusCallback(cb: ChangeConferenceStatusCallback);
}

export class ConferenceSock
    implements IConferenceSock {
    private readonly wsUri: string;
    private ws_?: WebSocket;
    private at_?: string;
    private changeConferenceStatusCallback_?: ChangeConferenceStatusCallback;

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

    private onMessage_(msg) {
        this.write_("RECEIVE: " + msg.data);
        const json = JSON.parse(msg.data);
        if (json.path === 'change_status_callback')
            this.changeConferenceStatusCallback_.call(this, json.newStatus);
    }

    private doSend_(message) {
        this.write_("SENT: " + message);
        this.ws_.send(message);
    }

    constructor(wsUri: string) {
        this.wsUri = wsUri;
    }

    accessToken(at: string) {
        this.at_ = at;
        return this;
    }

    connect(at: string) {
        this.ws_ = new WebSocket(this.wsUri);
        this.at_ = at;

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