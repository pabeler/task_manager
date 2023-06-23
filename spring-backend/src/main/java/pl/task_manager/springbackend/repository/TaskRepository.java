package pl.task_manager.springbackend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.task_manager.springbackend.model.Task;

@Repository
public interface TaskRepository extends MongoRepository<Task, Integer> {
}
