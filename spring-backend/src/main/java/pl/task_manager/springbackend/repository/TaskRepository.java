package pl.task_manager.springbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import pl.task_manager.springbackend.model.Task;

public interface TaskRepository extends MongoRepository<Task, Integer> {}
