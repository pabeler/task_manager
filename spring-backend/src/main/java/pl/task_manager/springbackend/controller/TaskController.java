package pl.task_manager.springbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.task_manager.springbackend.model.Task;
import pl.task_manager.springbackend.repository.TaskRepository;
import pl.task_manager.springbackend.service.SequenceGenerator;

import java.time.Instant;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private SequenceGenerator sequenceGenerator;

    @GetMapping("/getTaskList")
    public ResponseEntity<List<Task>> getTaskList() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        List<Task> taskList = taskRepository.findAll();
        for (Task t : taskList) {
            if (t.getTitle().equalsIgnoreCase(task.getTitle())) {
                return ResponseEntity.badRequest().build();
            }
        }
        task.setAddedDate(Instant.now().getEpochSecond());
        task.setId(sequenceGenerator.generateSequence(Task.SEQUENCE_NAME));
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @DeleteMapping("/delete/{title}")
    public ResponseEntity<?> deleteTask(@PathVariable String title) {
        Task task = taskRepository.findByTitle(title);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        taskRepository.delete(task);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{title}")
    public ResponseEntity<Task> updateTask(@PathVariable String title, @RequestBody Task taskRequest) {
        Task task = taskRepository.findByTitle(title);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        if (taskRequest.getTitle() != null) {
            if (!taskRequest.getTitle().equalsIgnoreCase(title)) {
                List<Task> taskList = taskRepository.findAll();
                for (Task t : taskList) {
                    if (t.getTitle().equalsIgnoreCase(taskRequest.getTitle())) {
                        return ResponseEntity.badRequest().build();
                    }
                }
            }
            task.setTitle(taskRequest.getTitle());
        }
        if (taskRequest.getDescription() != null)
            task.setDescription(taskRequest.getDescription());
        if (taskRequest.getDeadlineDate() != 0)
            task.setDeadlineDate(taskRequest.getDeadlineDate());
        return ResponseEntity.ok(taskRepository.save(task));
    }
}
