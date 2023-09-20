//
//package se.salt.echoboard;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import se.salt.echoboard.model.EchoBoard;
//import se.salt.echoboard.service.EchoBoardService;
//import se.salt.echoboard.service.EchoService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.mockito.Mockito.when;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//@ActiveProfiles("test")
//public class EchoBoardControllerTest {
//
//    private final MockMvc mockMvc;
//
//    @MockBean
//    private final EchoBoardService echoService;
//
//    private final ObjectMapper objectMapper;
//
//    @Autowired
//    public EchoBoardControllerTest(MockMvc mockMvc, EchoBoardService echoService, ObjectMapper objectMapper) {
//        this.mockMvc = mockMvc;
//        this.echoService = echoService;
//        this.objectMapper = objectMapper;
//    }
//
//    @Test
//    public void testGetStatus() throws Exception {
//        mockMvc.perform(get("/api/status"))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Server is up and running!"));
//    }
//
////    @Test
////    public void testGetEchoByEchoId() throws Exception {
////
////        EchoBoard echo = new EchoBoard("Title1", "Content1", "Author1");
////
////        String expectedJson = objectMapper.writeValueAsString(echo);
////
////        when(echoService.getEchoById("45b35e2c-d2be-4d4e-9bc7-c25147f1f4f1")).thenReturn(echo);
////
////        mockMvc.perform(get("/api/echoes/45b35e2c-d2be-4d4e-9bc7-c25147f1f4f1"))
////                .andExpect(status().isOk())
////                .andExpect(content().json(expectedJson));
////    }
//
//}
//
