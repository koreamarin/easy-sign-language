import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../modules/index";

export default configureStore({ reducer: rootReducer });
