// emailTemplates/WelcomeEmail.js
const React = require("react");

function WelcomeEmail({
  name,
  ticket_type,
  ticket_name,
  address,
  open_gate,
  close_gate,
  total_payment,
}) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ color: "#4CAF50" }}>Welcome to Our Service, {name}!</h1>
      <p>We're thrilled to have you join us!</p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2 style={{ color: "#333" }}>Your Ticket Details</h2>
        <p>
          <strong>Ticket Type:</strong> {ticket_type}
        </p>
        <p>
          <strong>Event:</strong> {ticket_name}
        </p>
        <p>
          <strong>Address:</strong> {address}
        </p>
        <p>
          <strong>Open Gate:</strong> {open_gate}
        </p>
        <p>
          <strong>Close Gate:</strong> {close_gate}
        </p>
        <p>
          <strong>Total Payment:</strong> ${total_payment}
        </p>
      </div>

      <p style={{ marginTop: "20px" }}>
        If you have any questions or need assistance, please don't hesitate to
        reach out to our support team.
      </p>
      <p>Looking forward to seeing you there!</p>

      <footer
        style={{
          marginTop: "30px",
          fontSize: "12px",
          color: "#777",
          textAlign: "center",
        }}
      >
        <p>Thank you for choosing us!</p>
        <p>
          &copy; {new Date().getFullYear()} Our Service. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

module.exports = WelcomeEmail;
