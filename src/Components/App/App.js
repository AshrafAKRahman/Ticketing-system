import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";

import Collapsible from "../Collapsible";
import Form from "../Form";
import Heading2 from "../Heading2";
import NavBar from "../NavBar";
import TicketDetails from "../TicketDetails";
import "./App.css";

const App = () => {
  //useEffect hook is called when the component is mounted to the DOM
  useEffect(() => {
    //async function to fetch data from the specified endpoint
    async function getInitialData() {
      //fetch data from the specified endpoint
      let response = await fetch(
        "https://just-the-ticket-backend.onrender.com/api/tickets"
      );
      //parse the fetched data as JSON
      let data = await response.json();
      //set the fetched data as the value of the `ticketList` state
      setTicketList(data);
    }
    //call the `getInitialData` function
    getInitialData();
  }, []);

  //initialize the ticketList state with an empty array
  const [ticketList, setTicketList] = useState([]);
  const [userTicket, setUserTicket] = useState({
    name: "",
    question: "",
    roomNumber: "",
    problem: "",
    description: "",
    code: "",
    errorLog: "",
  });

  //async function to handle a form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      userTicket.name === "" ||
      userTicket.question === "" ||
      userTicket.roomNumber === "" ||
      userTicket.problem === "" ||
      userTicket.description === "" ||
      userTicket.code === "" ||
      userTicket.errorLog === ""
    ) {
      return alert("All must be filled out");
    }
    //create a new `ticket` object with the same fields as the `userTicket` state object
    const ticket = {
      name: userTicket.name,
      question: userTicket.question,
      roomNumber: userTicket.roomNumber,
      problem: userTicket.problem,
      description: userTicket.description,
      code: userTicket.code,
      errorLog: userTicket.errorLog,
    };
    //clear the form after a successful submission

    setUserTicket({
      name: "",
      question: "",
      roomNumber: "",
      problem: "",
      description: "",
      code: "",
      errorLog: "",
    });

    const postData = async () => {
      await fetch("https://just-the-ticket-backend.onrender.com/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticket),
      }).then(() => {
        console.log("??? New ticket CREATED");
      });
    };

    await postData();

    const getData = async () => {
      let response = await fetch(
        "https://just-the-ticket-backend.onrender.com/api/tickets"
      );
      console.log("??? All tickets READ");
      let data = await response.json();
      setTicketList(data);
    };
    await getData();
    alert(
      "Thank you for your submission. You can find your new ticket in the latest tickets section."
    );
  };

  const deleteTicket = (event, ticketId) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert">
            <h1 className="alert__title">Delete Ticket</h1>
            <p className="alert__body">
              Warning: This action is irreversible. <br /> Are you sure you want
              to delete this ticket?
            </p>

            <button
              onClick={() => {
                onClose();
                handleDelete(event, ticketId);
              }}
              className="alert__btn alert__btn--yes"
            >
              Delete
            </button>
            <button onClick={onClose} className="alert__btn alert__btn--no">
              {" "}
              Cancel{" "}
            </button>
          </div>
        );
      },
    });

    const handleDelete = async (event, ticketId) => {
      event.preventDefault();

      const deleteData = async () => {
        await fetch(
          `https://just-the-ticket-backend.onrender.com/api/tickets/${ticketId}`,
          {
            method: "DELETE",
          }
        ).then(() => {
          console.log(`??? Ticket ${ticketId} DELETED`);
        });
      };
      await deleteData();

      const getData = async () => {
        let response = await fetch(
          "https://just-the-ticket-backend.onrender.com/api/tickets"
        );
        let data = await response.json();
        setTicketList(data);
      };
      await getData();
    };
  };
  return (
    <div className="App">
      <NavBar />
      <div className="main-container">
        <div className="create-ticket-container">
          <Heading2
            containerClassName="form-header-container"
            headingClassName="form-header"
            text="Create Ticket"
          />

          <Form
            setTicket={setUserTicket}
            userTicket={userTicket}
            handleSubmit={handleSubmit}
          />
        </div>
        <div className="latest-tickets-container">
          <div className="tickets-header-container">
            <h2 className="tickets-header">Latest Tickets</h2>
          </div>
          <div className="tickets-container">
            {ticketList.map((ticket) => {
              return (
                <Collapsible
                  key={ticket.id}
                  id={ticket.id}
                  name={ticket.question_author}
                  room={ticket.room_number}
                  title={ticket.question_title}
                  handleDelete={deleteTicket}
                >
                  <TicketDetails
                    containerClassName="input-container"
                    label="Problem Summary:"
                    detailsContainerClassName="ticket-details-container"
                    text={ticket.problem_summary}
                    pClassName="ticket-p"
                  />

                  <TicketDetails
                    containerClassName="input-container"
                    label="Steps Taken:"
                    detailsContainerClassName="ticket-details-container"
                    text={ticket.problem_summary}
                    pClassName="ticket-p"
                  />
                  <TicketDetails
                    containerClassName="monospace-container"
                    label="Code:"
                    detailsContainerClassName="code-details-container"
                    text={ticket.code}
                    pClassName="ticket-p"
                  />

                  <div className="monospace-container">
                    <label>Code:</label>
                    <div className="code-details-container">
                      <code className="ticket-p">{ticket.code}</code>
                    </div>
                  </div>
                  <div className="monospace-container">
                    <label>Error Logs:</label>
                    <div className="error-details-container">
                      <code className="ticket-p">{ticket.error_logs}</code>
                    </div>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
