import {EventEmitter} from 'events'

declare class JitsiMeetExternalAPI extends EventEmitter {
  constructor(
    domain: string,
    options: {
      /**The name of the room to join. */
      roomName: string
      /**Width of the iframe. Check parseSizeParam for format details*/
      width?: string | number
      /**Height of the iframe. Check parseSizeParam for format details.*/
      height?: string | number
      /** The node that will contain the  iframe.*/
      parentNode?: HTMLElement
      /**Object containing configuration options defined in config.js to be overridden.*/
      configOverwrite?: Object
      /**Object containing  configuration options defined in interface_config.js to be overridden.*/
      interfaceConfigOverwrite?: Object
      /**If the value is true https won't be used.*/
      noSSL?: boolean
      /**The JWT token if needed by jitsi-meet for authentication. */
      jwt?: string
      /**The onload function that will listen for iframe onload event.*/
      onload?: Function
      /**Array of objects containing information about new participants that will be invited in the call.*/
      invitees?: Array<Object>
      /**Array of objects containing information about the initial devices that will be used in the call.*/
      devices?: Array<Object>
      /**Object containing information about the participant opening the meeting.*/
      userInfo: Object
    }
  )
  /**
   * Creates the iframe element.
   *
   * @param {number|string} height - The height of the iframe. Check
   * parseSizeParam for format details.
   * @param {number|string} width - The with of the iframe. Check
   * parseSizeParam for format details.
   * @param {Function} onload - The function that will listen
   * for onload event.
   * @returns {void}
   *
   * @private
   */
  private _createIFrame (height: number | string, width: number | string, onload: Function): void

  /**
   * Returns arrays with the all resources for the always on top feature.
   *
   * @returns {Array<string>}
   */
  private _getAlwaysOnTopResources (): Array<string>

  /**
   * Returns the id of the on stage participant.
   *
   * @returns {string} - The id of the on stage participant.
   */
  private _getOnStageParticipant (): string

  /**
   * Getter for the large video element in Jitsi Meet.
   *
   * @returns {HTMLElement|undefined} - The large video.
   */
  private _getLargeVideo (): HTMLElement | undefined

  /**
   * Getter for participant specific video element in Jitsi Meet.
   *
   * @param {string|undefined} participantId - Id of participant to return the video for.
   *
   * @returns {HTMLElement|undefined} - The requested video. Will return the local video
   * by default if participantId is undefined.
   */
  private _getParticipantVideo (participantId: string | undefined): HTMLElement | undefined

  /**
     * Sets the size of the iframe element.
     *
     * @param {number|string} height - The height of the iframe.
     * @param {number|string} width - The with of the iframe.
   
     */
  private _setSize (height: number | string, width: number | string): void

  /**
     * Setups listeners that are used internally for JitsiMeetExternalAPI.
     *

     */
  private _setupListeners (): void
  /**
    * Returns the formatted display name of a participant.
    *
    * @param {string} participantId - The id of the participant.
    * @returns {string} The formatted display name.
    */
  private _getFormattedDisplayName (participantId: string): string
  /**
   * Adds event listener to Meet Jitsi.
   *
   * @param {string} event - The name of the event.
   * @param {Function} listener - The listener.
   * @returns {void}
   *
   * @deprecated
   * NOTE: This method is not removed for backward comatability purposes.
   */
  addEventListener (event: string, listener: Function): void
  /**
   * Adds event listeners to Meet Jitsi.
   *
   * @param {Object} listeners - The object key should be the name of
   * the event and value - the listener.
   * Currently we support the following
   * events:
   * {@code incomingMessage} - receives event notifications about incoming
   * messages. The listener will receive object with the following structure:
   * {{
   *  'from': from,//JID of the user that sent the message
   *  'nick': nick,//the nickname of the user that sent the message
   *  'message': txt//the text of the message
   * }}
   * {@code outgoingMessage} - receives event notifications about outgoing
   * messages. The listener will receive object with the following structure:
   * {{
   *  'message': txt//the text of the message
   * }}
   * {@code displayNameChanged} - receives event notifications about display
   * name change. The listener will receive object with the following
   * structure:
   * {{
   * jid: jid,//the JID of the participant that changed his display name
   * displayname: displayName //the new display name
   * }}
   * {@code participantJoined} - receives event notifications about new
   * participant.
   * The listener will receive object with the following structure:
   * {{
   * jid: jid //the jid of the participant
   * }}
   * {@code participantLeft} - receives event notifications about the
   * participant that left the room.
   * The listener will receive object with the following structure:
   * {{
   * jid: jid //the jid of the participant
   * }}
   * {@code videoConferenceJoined} - receives event notifications about the
   * local user has successfully joined the video conference.
   * The listener will receive object with the following structure:
   * {{
   * roomName: room //the room name of the conference
   * }}
   * {@code videoConferenceLeft} - receives event notifications about the
   * local user has left the video conference.
   * The listener will receive object with the following structure:
   * {{
   * roomName: room //the room name of the conference
   * }}
   * {@code screenSharingStatusChanged} - receives event notifications about
   * turning on/off the local user screen sharing.
   * The listener will receive object with the following structure:
   * {{
   * on: on //whether screen sharing is on
   * }}
   * {@code dominantSpeakerChanged} - receives event notifications about
   * change in the dominant speaker.
   * The listener will receive object with the following structure:
   * {{
   * id: participantId //participantId of the new dominant speaker
   * }}
   *
   * {@code suspendDetected} - receives event notifications about detecting suspend event in host computer.
   * {@code readyToClose} - all hangup operations are completed and Jitsi Meet
   * is ready to be disposed.
   * @returns {void}
   *
   * @deprecated
   * NOTE: This method is not removed for backward comatability purposes.
   */
  addEventListeners (listeners: object): void
  /**
   * Removes the listeners and removes the Jitsi Meet frame.
   *
   * @returns {void}
   */
  dispose (): void

  /**
   * Executes command. The available commands are:
   * {@code displayName} - Sets the display name of the local participant to
   * the value passed in the arguments array.
   * {@code subject} - Sets the subject of the conference, the value passed
   * in the arguments array. Note: Available only for moderator.
   *
   * {@code toggleAudio} - Mutes / unmutes audio with no arguments.
   * {@code toggleVideo} - Mutes / unmutes video with no arguments.
   * {@code toggleFilmStrip} - Hides / shows the filmstrip with no arguments.
   *
   * If the command doesn't require any arguments the parameter should be set
   * to empty array or it may be omitted.
   *
   * @param {string} name - The name of the command.
   * @returns {void}
   */
  executeCommand (name: string, ...args): void
  /**
   * Executes commands. The available commands are:
   * {@code displayName} - Sets the display name of the local participant to
   * the value passed in the arguments array.
   * {@code toggleAudio} - Mutes / unmutes audio. No arguments.
   * {@code toggleVideo} - Mutes / unmutes video. No arguments.
   * {@code toggleFilmStrip} - Hides / shows the filmstrip. No arguments.
   * {@code toggleChat} - Hides / shows chat. No arguments.
   * {@code toggleShareScreen} - Starts / stops screen sharing. No arguments.
   *
   * @param {Object} commandList - The object with commands to be executed.
   * The keys of the object are the commands that will be executed and the
   * values are the arguments for the command.
   * @returns {void}
   */
  executeCommands (commandList: object): void

  /**
   * Returns Promise that resolves with a list of available devices.
   *
   * @returns {Promise}
   */
  getAvailableDevices (): Promise<any>
  /**
   * Returns Promise that resolves with current selected devices.
   *
   * @returns {Promise}
   */
  getCurrentDevices (): Promise<any>
  /**
   * Check if the audio is available.
   *
   * @returns {Promise} - Resolves with true if the audio available, with
   * false if not and rejects on failure.
   */
  isAudioAvailable (): Promise<boolean>

  /**
   * Returns Promise that resolves with true if the device change is available
   * and with false if not.
   *
   * @param {string} [deviceType] - Values - 'output', 'input' or undefined.
   * Default - 'input'.
   * @returns {Promise}
   */
  isDeviceChangeAvailable (deviceType: 'output' | 'input' | undefined): Promise<boolean>
  /**
   * Returns Promise that resolves with true if the device list is available
   * and with false if not.
   *
   */
  isDeviceListAvailable (): Promise<boolean>
  /**
   * Returns Promise that resolves with true if multiple audio input is supported
   * and with false if not.
   */
  isMultipleAudioInputSupported (): Promise<boolean>
  /**
   * Invite people to the call.
   *
   * @param {Array<Object>} invitees - The invitees.
   * @returns {Promise} - Resolves on success and rejects on failure.
   */
  invite (invitees: Array<object>): Promise<any>

  /**
   * Returns the audio mute status.
   *
   * @returns {Promise} - Resolves with the audio mute status and rejects on
   * failure.
   */
  isAudioMuted (): Promise<any>

  /**
   * Returns the avatar URL of a participant.
   *
   * @param {string} participantId - The id of the participant.
   * @returns {string} The avatar URL.
   */
  getAvatarURL (participantId: string): string
  /**
   * Returns the display name of a participant.
   *
   * @param {string} participantId - The id of the participant.
   * @returns {string} The display name.
   */
  getDisplayName (participantId: string): string
  /**
   * Returns the email of a participant.
   *
   * @param {string} participantId - The id of the participant.
   * @returns {string} The email.
   */
  getEmail (participantId: string): string


  /**
   * Returns the iframe that loads Jitsi Meet.
   *
   * @returns {HTMLElement} The iframe.
   */
  getIFrame (): HTMLElement
  /**
   * Returns the number of participants in the conference. The local
   * participant is included.
   *
   * @returns {number} The number of participants in the conference.
   */
  getNumberOfParticipants (): number

  /**
   * Check if the video is available.
   *
   * @returns {Promise} - Resolves with true if the video available, with
   * false if not and rejects on failure.
   */
  isVideoAvailable (): Promise<any>

  /**
   * Returns the audio mute status.
   *
   * @returns {Promise} - Resolves with the audio mute status and rejects on
   * failure.
   */
  isVideoMuted (): Promise<any>

  /**
   * Removes event listener.
   *
   * @param {string} event - The name of the event.
   * @returns {void}
   *
   * @deprecated
   * NOTE: This method is not removed for backward comatability purposes.
   */
  removeEventListener (event: string): void
  /**
   * Removes event listeners.
   *
   * @param {Array<string>} eventList - Array with the names of the events.
   * @returns {void}
   *
   * @deprecated
   * NOTE: This method is not removed for backward comatability purposes.
   */
  removeEventListeners (eventList: Array<string>): void
  /**
   * Passes an event along to the local conference participant to establish
   * or update a direct peer connection. This is currently used for developing
   * wireless screensharing with room integration and it is advised against to
   * use as its api may change.
   *
   * @param {Object} event - An object with information to pass along.
   * @param {Object} event.data - The payload of the event.
   * @param {string} event.from - The jid of the sender of the event. Needed
   * when a reply is to be sent regarding the event.
   * @returns {void}
   */
  sendProxyConnectionEvent (event: { data: Object; from: string }): void

  /**
   * Sets the audio input device to the one with the label or id that is
   * passed.
   *
   * @param {string} label - The label of the new device.
   * @param {string} deviceId - The id of the new device.
   * @returns {Promise}
   */
  setAudioInputDevice (label: string, deviceId: string): Promise<any>
  /**
   * Sets the audio output device to the one with the label or id that is
   * passed.
   *
   * @param {string} label - The label of the new device.
   * @param {string} deviceId - The id of the new device.
   * @returns {Promise}
   */
  setAudioOutputDevice (label: string, deviceId: string): Promise<any>
  /**
   * Sets the video input device to the one with the label or id that is
   * passed.
   *
   * @param {string} label - The label of the new device.
   * @param {string} deviceId - The id of the new device.
   * @returns {Promise}
   */
  setVideoInputDevice (label: string, deviceId: string): Promise<any>
}