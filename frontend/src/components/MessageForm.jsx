function MessageForm() {
    return (
        <form action="" className="form" id="message-form">
            <input type="text" name="message" className="message__input" id="message__input" />
            <button type="submit" className="button send__message-button" id="send-message">Send</button>
        </form>
    )
}

export default MessageForm;
