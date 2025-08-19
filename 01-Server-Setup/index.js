import express from "express";

const app = express();


app.get("/percentage-calculator", (req, res) => {
  const {obtMarks,totalMarks}=req.query;
  const percentage = (Number(obtMarks) / Number(totalMarks)) * 100;
  res.send(`Your percentage is ${percentage.toFixed(2)}%`);
});


app.listen(5050, () => {
  console.log("Server is running on port 5050");
});
