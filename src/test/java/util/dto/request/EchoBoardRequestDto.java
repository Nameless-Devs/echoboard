package util.dto.request;

import java.io.Serializable;

public record EchoBoardRequestDto(String title, String content, boolean anonymous) implements Serializable {
}
