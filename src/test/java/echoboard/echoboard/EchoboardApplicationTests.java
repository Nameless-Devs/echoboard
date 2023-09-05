package echoboard.echoboard;

import com.fasterxml.jackson.databind.ObjectMapper;
import echoboard.echoboard.echo.Echo;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class EchoboardApplicationTests {

	private final MockMvc mockMvc;
	private final ObjectMapper objectMapper;

	@Autowired
	public EchoboardApplicationTests(MockMvc mockMvc, ObjectMapper objectMapper) {
		this.mockMvc = mockMvc;
		this.objectMapper = objectMapper;
	}

	@Test
	@Order(1)
	public void testSaveEcho() throws Exception {
		Echo echo = new Echo("Test Title", "Test Content", "Test Author");

		String jsonRequest = objectMapper.writeValueAsString(echo);
		System.out.println(jsonRequest);
		mockMvc.perform(post("/api/echoes")
						.contentType("application/json")
						.content(jsonRequest))
				.andExpect(status().isCreated());
	}

	@Test
	@Order(2)
	void testGetEcho() throws Exception {

		mockMvc.perform(get("/api/echoes"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$[0].title").value("Test Title"))
				.andExpect(jsonPath("$[0].content").value("Test Content"))
				.andExpect(jsonPath("$[0].author").value("Test Author"))
				.andExpect(jsonPath("$[0].upvotes").value(0))
				.andExpect(jsonPath("$[0].downvotes").value(0))
				.andExpect(jsonPath("$[0].id").value(1))
				.andExpect(jsonPath("$[0].created").isNotEmpty())
		;

	}
}