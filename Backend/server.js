import { app } from "./app.js";
import express from "express";

app.listen(process.env.PORT , () => {
    console.log(`file runnning on port ${process.env.PORT}`);
})