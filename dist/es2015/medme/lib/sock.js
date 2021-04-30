var ConferenceSock = (function () {
    function ConferenceSock(wsUri) {
        this.wsUri = wsUri;
    }
    ConferenceSock.prototype.write_ = function (msg) {
        console.info('[%s] ConferenceWS', (new Date).toISOString(), this.at_, msg);
    };
    ConferenceSock.prototype.onOpen_ = function () {
        this.write_("CONNECTED");
        this.doSend_(JSON.stringify({
            path: 'handshake',
            at: this.at_
        }));
    };
    ConferenceSock.prototype.onMessage_ = function (msg) {
        this.write_("RECEIVE: " + msg.data);
        var json = JSON.parse(msg.data);
        if (json.path === 'change_status_callback')
            this.changeConferenceStatusCallback_.call(this, json.newStatus);
        if (json.path === 'change_conf_info_callback')
            this.changeConferenceInfoCallback_.call(this);
    };
    ConferenceSock.prototype.onClose_ = function (evt) {
        this.write_("CLOSED: " + evt.code + " " + evt.reason);
    };
    ConferenceSock.prototype.onError_ = function (err) {
        this.write_("ERROR: " + (err.message || err));
    };
    ConferenceSock.prototype.doSend_ = function (message) {
        this.write_("SENT: " + message);
        this.ws_.send(message);
    };
    ConferenceSock.prototype.accessToken = function (at) {
        this.at_ = at;
        return this;
    };
    ConferenceSock.prototype.connect = function (at) {
        this.ws_ = new WebSocket(this.wsUri);
        this.at_ = at;
        this.ws_.onopen = this.onOpen_.bind(this);
        this.ws_.onmessage = this.onMessage_.bind(this);
        this.ws_.onclose = this.onClose_.bind(this);
        this.ws_.onerror = this.onError_.bind(this);
    };
    ConferenceSock.prototype.changeConferenceStatus = function (newStatus) {
        this.doSend_(JSON.stringify({
            path: 'change_status',
            at: this.at_,
            newStatus: newStatus
        }));
    };
    ConferenceSock.prototype.changeConferenceStatusCallback = function (cb) {
        this.changeConferenceStatusCallback_ = cb;
        return this;
    };
    ConferenceSock.prototype.changeConferenceInfoCallback = function (cb) {
        this.changeConferenceInfoCallback_ = cb;
        return this;
    };
    return ConferenceSock;
}());
export { ConferenceSock };
//# sourceMappingURL=sock.js.map