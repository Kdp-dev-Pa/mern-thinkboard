import express from "express";
import {
    getAllNotes,
    getNotebyId,
    createNotes,
    updateNotes,
    deleteNotes
} from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotebyId);
router.post("/", createNotes);         
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
