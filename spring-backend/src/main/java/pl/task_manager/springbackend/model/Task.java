package pl.task_manager.springbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "tasks")
public class Task {
    @Transient
    public static final String SEQUENCE_NAME = "task_sequence";

    @Id
    private long id;

    private String title;
    private String description;
    private Date addedDate;
    private Date deadlineDate;
}
