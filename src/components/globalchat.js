import React, { useState, useContext, useRef, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import {
  InputGroup,
  FormControl,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

import { AuthContext } from "../context/auth";
import { GET_MESSAGE_QUERRY } from "../graphql/queries";
import { SEND_MESSAGE } from "../graphql/mutations";
import { NEW_MESSAGE_SUBSCRIPTION } from "../graphql/subscriptions";
import { Link } from "react-router-dom";

export default function Globalchat() {
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);
  const messageInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const [messages, setMessages] = useState([]);
  const { loading, data } = useQuery(GET_MESSAGE_QUERRY, {
    onError: (err) => {
      if (err.networkError) {
        setErrors({ server: "Server Offline." });
      } else {
        setErrors({ server: "Something went wrong" });
        console.log(err);
      }
    },
  });
  useEffect(() => {
    if (data) {
      setMessages(data.getMessages);
    }
  }, [data]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  });

  const [sendMessageValue, setSendMessageValue] = useState("");
  const onChange = (e) => {
    setSendMessageValue(e.target.value);
  };

  const sub = useSubscription(NEW_MESSAGE_SUBSCRIPTION);
  var newMessages = sub.data;
  useEffect(() => {
    if (newMessages) {
      setMessages((m) => [...m, newMessages.messageCreated]);
    }
  }, [newMessages]);

  const [send, { loading: msgSendingLoading }] = useMutation(SEND_MESSAGE, {
    update() {
      setSendMessageValue("")
    },
    variables: {
      postMessageBody: sendMessageValue,
    },
    onError: (err) => {
      if (err.networkError) {
        setErrors({ server: "Server Offline." });
      } else {
        setErrors({ server: "Something went wrong" });
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (msgSendingLoading) {
      messageInputRef.current.value = "";
    }
  }, [msgSendingLoading]);

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      send();
    }
  };

  return (
    <div>
      <div className="msgcon">
        {loading ? (
          <div className="loadingMessages">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : messages && Object.keys(messages).length > 0 ? (
          Object.values(messages).map((value) => (
            <>
              {user && value.username === user.username ? (
                <div className="self-back">
                  <div className="self-messages">{value.body}</div>
                </div>
              ) : (
                <>
                  <Link
                    to={`/chat/${value.username}`}
                    className="message-titles"
                  >
                    {value.username}
                  </Link>
                  <div className="back">
                    <div className="messages">{value.body}</div>
                  </div>
                </>
              )}
            </>
          ))
        ) : Object.keys(errors).length > 0 ? (
          <div className="no-message">{errors.server}</div>
        ) : (
          <div className="no-message">No messages.</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {user && (
        <div className="inputcon">
          <InputGroup className="mb-3" size="lg">
            <FormControl
              placeholder="Type your message"
              aria-label="Type your message"
              aria-describedby="basic-addon2"
              onChange={onChange}
              onKeyPress={handleKeypress}
              ref={messageInputRef}
            />
            <Button variant="outline-primary" id="button-addon2" onClick={send}>
              {msgSendingLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Send"
              )}
            </Button>
          </InputGroup>
        </div>
      )}
      {Object.keys(messages).length > 0 && Object.keys(errors).length > 0 && (
        <Alert variant="danger">
          {Object.values(errors).map((value) => (
            <li>{value}</li>
          ))}
        </Alert>
      )}
    </div>
  );
}
