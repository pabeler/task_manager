package pl.task_manager.springbackend;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pl.task_manager.springbackend.model.Task;
import pl.task_manager.springbackend.repository.TaskRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class TaskManagerApplicationTests {
	@Autowired
	private TaskRepository taskRepository;

	@Test
	public void testSaveData() {
		Task data = new Task(1, "test", "test description", 1, 1);
		Task savedData = taskRepository.save(data);
		Assertions.assertNotNull(savedData.getTitle());
		assertEquals(data.getTitle(), savedData.getTitle());
	}

	@Test
	public void testUpdateData() {
		Task data = new Task(1, "test", "test description", 1, 1);
		Task savedData = taskRepository.save(data);
		savedData.setTitle("test2");
		Task updatedData = taskRepository.save(savedData);
		assertEquals(savedData.getTitle(), updatedData.getTitle());
	}
}
