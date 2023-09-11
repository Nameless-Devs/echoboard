package echoboard.echoboard.echo;

import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.datamodeling.PaginatedScanList;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.awt.*;
import java.util.*;
import java.util.List;

@Service
public class EchoService {

    private final EchoRepository echoRepository;

    public EchoService(EchoRepository echoRepository) {
        this.echoRepository = echoRepository;
    }

    public EchoBoard saveEcho(EchoBoard echoBoard) {
        return echoRepository.save(echoBoard);
    }

    public String addCommentToEcho(EchoBoard echoBoard, Comment comment) {

        echoBoard.getComments().add(comment);
        saveEcho(echoBoard);
        return comment.getId();
    }

    public EchoBoard getEchoById(String id) {
        return echoRepository.getEchoById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Echo not found with ID: " + id));
    }

    public List<EchoBoard> getAllEchoes(int limit, Map<String, AttributeValue> lastKey) {
        List<EchoBoard> echoes = new ArrayList<>(echoRepository.findAll(limit, lastKey));
        echoes.sort(Comparator.comparing(EchoBoard::getCreated).reversed());
        System.out.println(limit);
        System.out.println(lastKey);
        return echoes;
    }

    public void deleteEcho(String id) {
        echoRepository.deleteEcho(getEchoById(id));
    }
}
