package se.salt.echoboard.controller.dto;

import java.util.Set;

public record EchoBoardSolutionVolunteers(long id,
                                          Set<EchoBoardUserResponse> volunteers,
                                          Set<EchoBoardUserResponse> pendingVolunteers
                                         ) {
}
