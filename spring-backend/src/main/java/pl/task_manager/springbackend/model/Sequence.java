package pl.task_manager.springbackend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "sequences")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Sequence {
    @Id
    private String id;

    private long seq;
}
