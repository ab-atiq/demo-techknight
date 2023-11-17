import React, { useEffect } from "react";
import axios from "axios";
import { getToken } from "../../services/LocalStorageService";
import { Box, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import UserWallet from "./UserWallet";

const WalletAndWithdrawl = () => {
  const { access_token } = getToken();
  const [wallet, setWallet] = React.useState({});
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/dashboard/streamer-wallet-status/", {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("WalletAndWithdrawl", response.data.data);
        setWallet(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [amount, setAmount] = React.useState("");
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  console.log("amount", amount);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/dashboard/streamer-wallet-status/",
        { amount: amount },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("WalletAndWithdrawl", response.data.data);
        alert("Withdrawl money sent successfully!");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
        alert("Error updating user data!");
      });
  };

  return (
    <Box>
      <Box>
        <UserWallet />
      </Box>
      <Box
        sx={{
          backgroundColor: "gray",
          width: "500px",
          marginX: "auto",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Typography variant="h4">Wallet</Typography>
        <Typography variant="h6">
          Available amount: {wallet.available_amount}
        </Typography>
        <Typography variant="h6">
          Total Tip Received: {wallet.total_tip_received}
        </Typography>
        <Typography variant="h4">Withdrawl</Typography>
        <form action="" method="post" onSubmit={handleSubmit}>
          <TextField
            label="Amount"
            fullWidth
            type="number"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default WalletAndWithdrawl;
