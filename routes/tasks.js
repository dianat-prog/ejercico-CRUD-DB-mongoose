const express= require('express');
const router = express.Router();
const Task =require('../models/Task.js')

//POST /create: Endpoint para crear una tarea.
router.post('/create',async(req,res)=>{
    try{
       
        const task =await Task.create(req.body);
        res.status(201).send(task);
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'There was a problem trying to create a task'})

    }

});

//- GET /: Endpoint para traer todas las tareas.
router.get('/',async(req,res)=>{
    try{
       
        const Tasks = await  Task.find();
        res.json(Tasks);
    }catch (error){
        console.error(error);
        res
            .status(500)
            .send({message:'Error getting tasks'})

    }

});

//GET /id/:_id: Endpoint para buscar tarea por id.
router.get("/id/:_id", async (req, res) => {
    try {
        const Task_id = await Task.findById(req.params._id);
        if (!Task_id) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(Task_id);
    } catch (error) {
        res.status(500).json({ error: "Error searching for task" });
    }
});

//- PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada.
router.put("/markAsCompleted/:_id", async (req, res) => {
    try {
        const Task_id = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true } 
        );

        if (!Task_id) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ mensaje: "Task marked as completed", Task_id });
    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
});



//- PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. 
// Es decir, que no me deje cambiar el campo  “completed” desde este endpoint, sino solo, el título.
router.put("/id/:_id", async (req, res) => {
    try {
        const { title } = req.body; // Solo extraer el título desde el cuerpo de la solicitud

        if (!title) {
            return res.status(400).json({ error: "The 'title' field is required" });
        }

        const tarea = await Task.findByIdAndUpdate(
            req.params._id,
            { title }, // Solo actualiza el título
            { new: true } // Devuelve la tarea actualizada
        );

        if (!tarea) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ mensaje: "Title updated successfully", tarea });
    } catch (error) {
        res.status(500).json({ error: "Error updating task" });
    }
});
//- DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete("/id/:_id", async (req, res) => {
    try {
        const taskDeleted = await Task.findByIdAndDelete(req.params._id);

        if (!taskDeleted) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ mensaje: "Task deleted successfully", taskDeleted });
    } catch (error) {
        res.status(500).json({ error: "Error deleting task" });
    }
});

module.exports = router;