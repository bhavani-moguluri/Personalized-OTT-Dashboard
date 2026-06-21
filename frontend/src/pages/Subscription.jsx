import { useState, useEffect } from "react";

function Subscription() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [service, setService] = useState("");
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [renewalDate, setRenewalDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const loadSubscriptions = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/subscriptions/${user.id}`
      );

      const data = await res.json();
      setSubscriptions(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadSubscriptions();
    }
  }, []);

  const addSubscription = async () => {
    if (!service || !plan || !price || !renewalDate) {
      alert("Please fill all fields");
      return;
    }

    try {
      await fetch(
        "http://localhost:5000/api/subscriptions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            service,
            plan,
            price,
            renewalDate,
          }),
        }
      );

      alert("Subscription Added Successfully");

      setService("");
      setPlan("");
      setPrice("");
      setRenewalDate("");

      loadSubscriptions();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/subscriptions/${id}`,
        {
          method: "DELETE",
        }
      );

      loadSubscriptions();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#141414",
        minHeight: "100vh",
        color: "white",
        padding: "30px",
      }}
    >
      <h1>📺 My Subscriptions</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Netflix"
          value={service}
          onChange={(e) => setService(e.target.value)}
        />

        <input
          type="text"
          placeholder="Premium"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        />

        <input
          type="number"
          placeholder="649"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="date"
          value={renewalDate}
          onChange={(e) => setRenewalDate(e.target.value)}
        />

        <button onClick={addSubscription}>
          Add Subscription
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        {subscriptions.length === 0 ? (
          <h3>No subscriptions added</h3>
        ) : (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              style={{
                background: "#222",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
              }}
            >
              <h2>{sub.service}</h2>

              <p>
                <strong>Plan:</strong> {sub.plan}
              </p>

              <p>
                <strong>Price:</strong> ₹{sub.price}
              </p>

              <p>
                <strong>Renewal:</strong> {sub.renewal_date}
              </p>

              <button
                onClick={() => deleteSubscription(sub.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Subscription;